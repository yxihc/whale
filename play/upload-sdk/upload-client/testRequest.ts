import type { RequestStrategy } from './RequestStrategy';
import type { Chunk } from './split/FileChunk';
import type { EventEmitter } from '../upload-core/EventEmitter';

export class TestRequest implements RequestStrategy {
  createFile(file: File): Promise<string> {
    return Promise.resolve(`token${file.name}`);
  }

  mergeFile(token: string): Promise<string> {
    return Promise.resolve(`${token}`);
  }

  patchHash<T extends 'file' | 'chunk'>(
    token: string,
    hash: string,
    type: T
  ): Promise<
    T extends 'file'
      ? {
          hasFile: boolean;
        }
      : { hasFile: boolean; rest: number[]; url: string }
  > {
    return new Promise((resolve) => {
      console.log('testRequest:patchHash', token, hash);
      if (type == 'file') {
        resolve({
          hasFile: false,
        } as any);
      } else {
        resolve({
          hasFile: false,
          rest: [],
          url: '',
        } as any);
      }
    });
  }

  uploadChunk(
    chunk: Chunk,
    emitter: EventEmitter<'progress' | 'end'>
  ): Promise<void> {
    return new Promise((resolve) => {
      emitter.emit('progress', chunk);
      setTimeout(() => {
        emitter.emit('end', chunk);
        resolve();
      }, 2000);
    });
  }
}
