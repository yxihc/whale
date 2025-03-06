import { ChunkSplitor } from '../ChunkSplitor';
import type { EventEmitter } from '../../../upload-core/EventEmitter';
import type { Chunk } from '../FileChunk';

export class MultiThreadSplitor extends ChunkSplitor {
  private workers: Worker[] = new Array(navigator.hardwareConcurrency || 4)
    .fill(0)
    .map(
      () =>
        new Worker(new URL('./SplitWorker.ts', import.meta.url), {
          type: 'module',
        })
    );

  calcHash(chunks: Chunk[], emitter: EventEmitter<'chunks'>): void {
    //计算出每个worker需要处理的分片数量
    const workerSize = Math.ceil(chunks.length / this.workers.length);
    this.workers.forEach((worker, index) => {
      const start = index * workerSize;
      const end = Math.min((index + 1) * workerSize, chunks.length);
      const workerChunks = chunks.slice(start, end);
      worker.postMessage(workerChunks);
      worker.onmessage = (e) => {
        emitter.emit('chunks', e.data);
      };
    });
  }

  dispose(): void {
    this.workers.forEach((worker) => worker.terminate());
  }
}
