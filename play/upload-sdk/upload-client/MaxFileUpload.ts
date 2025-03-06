import { RequestStrategy } from './RequestStrategy.ts';
import { ChunkSplitor } from './split/ChunkSplitor.ts';
import { Task, TaskQueue } from '../upload-core/TaskQueue.ts';
import { EventEmitter } from '../upload-core/EventEmitter.ts';
import { MultiThreadSplitor } from './split/imp-work/MultiThreadSplitor.ts';
import { Chunk } from './split/FileChunk.ts';
import { TestRequest } from './testRequest.ts';

export interface FileListener {
  uploadSuccessListener(chunk: Chunk): void;

  chunkListener(chunks: Chunk[]): void;

  chunkEndListener(hash: string): void;
}

export class MaxFileUpload {
  private requestStrategy: RequestStrategy; // 请求策略，没有传递则使用默认策略
  private splitStrategy: ChunkSplitor; // 分片策略，没有传递则默认多线程分片
  private taskQueue: TaskQueue; // 任务队列
  private file: File;
  private token: string = '';
  private uploadEmitter = new EventEmitter<'progress' | 'end'>();
  private chunkSize: number = 5 * 1024 * 1024;

  private fileListener: FileListener | null = null;

  setFileListener(listener: FileListener) {
    this.fileListener = listener;
    return this;
  }

  // 设置请求策略
  setRequestStrategy(requestStrategy: RequestStrategy) {
    this.requestStrategy = requestStrategy;
    return this;
  }

  // 设置分片策略
  setSplitStrategy(splitStrategy: ChunkSplitor) {
    this.splitStrategy = splitStrategy;
    return this;
  }

  // 设置任务队列
  setTaskQueue(taskQueue: TaskQueue) {
    this.taskQueue = taskQueue;
    return this;
  }

  // 设置文件
  setFile(file: File) {
    this.file = file;
    return this;
  }

  // 设置token
  setToken(token: string) {
    this.token = token;
    return this;
  }

  // 设置分片大小
  setChunkSize(chunkSize: number) {
    this.chunkSize = chunkSize;
    return this;
  }

  static with(file: File) {
    return new MaxFileUpload(file);
  }

  private constructor(file: File) {
    // 私有构造函数，禁止直接实例化
    this.file = file;
    this.requestStrategy = new TestRequest();
    this.taskQueue = new TaskQueue(4);
    this.splitStrategy = new MultiThreadSplitor(this.file, this.chunkSize);
  }

  // 初始化
  async start() {
    // 获取文件token
    this.token = await this.requestStrategy.createFile(this.file);
    // 开始分片
    this.splitStrategy.split();
    // 分片事件监听
    this.splitStrategy.on('chunks', this.handleChunks.bind(this));
    this.splitStrategy.on('wholeHash', this.handleWholeHash.bind(this));

    // this.uploadEmitter.on('progress', (chunk: Chunk) => {
    //   // 上传进度事件
    //   // ...
    // });
    this.uploadEmitter.on('end', (chunk: Chunk) => {
      // 上传结束事件
      // ...
      // console.log('上传结束事件----', chunk.index);
      if (this.fileListener?.uploadSuccessListener) {
        this.fileListener.uploadSuccessListener(chunk);
      }
    });
  }

  // 分片事件处理
  private handleChunks(chunks: Chunk[]) {
    if (this.fileListener?.chunkListener) {
      this.fileListener.chunkListener(chunks);
    }
    // 分片上传任务加入队列
    chunks.forEach((chunk) => {
      this.taskQueue.addAndStart(new Task(this.uploadChunk.bind(this), chunk));
    });
  }

  async uploadChunk(chunk: Chunk) {
    // hash校验
    const resp = await this.requestStrategy.patchHash(
      this.token,
      chunk.hash,
      'chunk',
    );
    if (resp.hasFile) {
      // 文件已存在
      return;
    }
    // 分片上传
    await this.requestStrategy.uploadChunk(chunk, this.uploadEmitter);
  }

  // 整体hash事件处理
  private async handleWholeHash(hash: string) {
    // console.log('整个文件hash', hash);
    if (this.fileListener?.chunkEndListener) {
      this.fileListener.chunkEndListener(hash);
    }
    // hash校验
    const resp = await this.requestStrategy.patchHash(this.token, hash, 'file');
    if (resp.hasFile) {
      // 文件已存在
      // this.emit('end', resp.url);
      return;
    }
    // 根据resp.rest重新编排后续任务
    // ...
  }
}
