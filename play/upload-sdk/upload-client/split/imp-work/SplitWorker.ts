import { calcChunkHashAndSparkResult } from '../FileChunk';
import type { Chunk } from '../FileChunk';

onmessage = function (e) {
  const chunks = e.data as Chunk[];
  for (const chunk of chunks) {
    calcChunkHashAndSparkResult(chunk).then((data: any) => {
      chunk.hash = data.hash;
      chunk.sparkResult = data.sparkResult;
      postMessage([chunk]);
    });
  }
};
