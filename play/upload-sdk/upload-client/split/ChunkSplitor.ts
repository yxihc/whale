// 分片的相关事件
// chunks: 一部分分片产生了
// wholeHash: 整个文件的hash计算完成
// drain: 所有分片处理完成
import SparkMD5 from 'spark-md5';
import { EventEmitter } from '../../upload-core/EventEmitter';
import { createChunk } from './FileChunk';
import type { Chunk } from './FileChunk';

export type ChunkSplitorEvents = 'chunks' | 'wholeHash' | 'drain';

export abstract class ChunkSplitor extends EventEmitter<ChunkSplitorEvents> {
  protected chunkSize: number; // 分片大小（单位字节）
  protected file: File; // 待分片的文件
  protected hash?: string; // 整个文件的hash
  protected chunks: Chunk[]; // 分片列表
  private handleChunkCount = 0; // 已计算hash的分片数量
  private hasSplited = false; // 是否已经分片

  constructor(file: File, chunkSize: number = 1024 * 1024 * 5) {
    super();
    this.file = file;
    this.chunkSize = chunkSize;
    // 获取分片数组
    const chunkCount = Math.ceil(this.file.size / this.chunkSize);
    this.chunks = new Array(chunkCount)
      .fill(0)
      .map((_, index) => createChunk(this.file, index, this.chunkSize));
  }

  split() {
    if (this.hasSplited) {
      return;
    }
    this.hasSplited = true;
    const emitter = new EventEmitter<'chunks'>();
    const list = [] as any[];
    const chunksHanlder = (chunks: Chunk[]) => {
      this.emit('chunks', chunks);
      chunks.forEach((chunk) => {
        // this.spark.append(chunk.hash);
        list.push({
          index: chunk.index,
          sparkResult: chunk.sparkResult,
        });
      });
      this.handleChunkCount += chunks.length;
      if (this.handleChunkCount === this.chunks.length) {
        // 计算完成
        emitter.off('chunks', chunksHanlder);
        const spark2 = new SparkMD5.ArrayBuffer();
        list.sort((a, b) => a.index - b.index);
        list.forEach((item) => {
          spark2.append(item.sparkResult);
        });
        //读取整个文件hash
        this.emit('wholeHash', spark2.end());
        spark2.destroy();
        this.emit('drain');
      }
    };
    emitter.on('chunks', chunksHanlder);
    this.calcHash(this.chunks, emitter);
  }

  // 计算每一个分片的hash
  abstract calcHash(chunks: Chunk[], emitter: EventEmitter<'chunks'>): void;

  // 分片完成后一些需要销毁的工作
  abstract dispose(): void;
}
