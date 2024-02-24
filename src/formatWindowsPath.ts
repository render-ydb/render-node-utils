import path = require('path');

/**
 * 格式化Windows平台下的文件路径
 * 当操作系统为Windows时，会将路径中的反斜杠（\\）转换为斜杠（/）。
 *
 * @param filepath 文件路径
 * @returns 格式化后的文件路径
 */
const formatWindowsPath = (filepath: string) => {
  return process.platform === 'win32'
    ? filepath.split(path.sep).join('/')
    : filepath;
};
export = formatWindowsPath;
