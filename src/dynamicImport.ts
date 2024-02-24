import formatWindowsPath = require('./formatWindowsPath');

/**
 * 动态导入模块
 *
 * @param {string} filePath 文件路径
 * @return {Promise} 返回一个promise，该promise在模块加载完成后解析，返回模块的namespace对象
 */
const dynamicImport = async (filePath: string) => {
  return import(formatWindowsPath(filePath));
};

export = dynamicImport;
