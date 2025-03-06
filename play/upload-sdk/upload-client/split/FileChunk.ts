import SparkMD5 from 'spark-md5';

export interface Chunk {
  blob: Blob; // 分片的二进制数据
  sparkResult: any;
  start: number; // 分片的起始位置
  end: number; // 分片的结束位置
  hash: string; // 分片的hash值
  index: number; // 分片在文件中的索引
}

/**
 * 创建文件块
 *
 * 该函数的目的是将一个大文件分割成多个小块，以便于分块处理，如分块上传到服务器
 * 每个文件块包含文件的一部分，以及一些元数据，如文件块的起始位置、结束位置、哈希值和索引
 *
 * @param file 要分割的文件对象
 * @param index 当前文件块的索引，用于确定文件块在原始文件中的位置
 * @param chunkSize 文件块的大小，以字节为单位
 * @returns 返回一个包含文件块信息的对象，包括文件块的Blob对象、起始位置、结束位置、哈希值和索引
 */
export function createChunk(
  file: File,
  index: number,
  chunkSize: number,
): Chunk {
  // 计算文件块的起始位置
  const start = index * chunkSize;
  // 计算文件块的结束位置，确保不超过文件的总大小
  const end = Math.min(start + chunkSize, file.size);
  // 使用File对象的slice方法截取文件的一部分，生成Blob对象
  const blob = file.slice(start, end);

  // 返回包含文件块信息的对象
  return {
    blob: blob,
    start: start,
    end: end,
    hash: '',
    index: index,
  } as Chunk;
}

/**
 * 计算文件块的MD5哈希值
 * 此函数用于生成一个文件块的MD5哈希值，它通过使用SparkMD5库和FileReader API来实现
 * 选择使用Promise来处理异步文件读取操作，确保在文件读取完成后才计算哈希值
 *
 * @param chunk 文件块对象，包含需要计算哈希值的文件信息
 * @returns 返回一个Promise，解析为文件块的MD5哈希值字符串
 */
export function calcChunkHash(chunk: Chunk): Promise<string> {
  return new Promise((resolve) => {
    // 初始化SparkMD5实例，用于计算ArrayBuffer类型的MD5哈希值
    const spark = new SparkMD5.ArrayBuffer();
    // 创建FileReader实例，用于读取文件内容
    const fileReader = new FileReader();
    // 当文件读取完成时，处理读取结果
    fileReader.onload = (e) => {
      // 将读取到的文件内容追加到SparkMD5实例中
      spark.append(e.target?.result as ArrayBuffer);
      // 计算最终的MD5哈希值，并通过Promise解析
      resolve(spark.end());
    };
    // 将文件块作为ArrayBuffer类型读取
    fileReader.readAsArrayBuffer(chunk.blob);
  });
}

export function calcChunkHashAndSparkResult(chunk: Chunk): Promise<{}> {
  return new Promise((resolve) => {
    // 初始化SparkMD5实例，用于计算ArrayBuffer类型的MD5哈希值
    const spark = new SparkMD5.ArrayBuffer();
    // 创建FileReader实例，用于读取文件内容
    const fileReader = new FileReader();
    // 当文件读取完成时，处理读取结果
    fileReader.onload = (e) => {
      // 将读取到的文件内容追加到SparkMD5实例中
      spark.append(e.target?.result as ArrayBuffer);
      // 计算最终的MD5哈希值，并通过Promise解析
      resolve({
        sparkResult: e.target?.result,
        hash: spark.end(),
      });
    };
    // 将文件块作为ArrayBuffer类型读取
    fileReader.readAsArrayBuffer(chunk.blob);
  });
}
