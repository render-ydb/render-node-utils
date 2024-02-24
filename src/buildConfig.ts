import ts from 'typescript';
import fs from 'fs';
/**
 * 构建配置函数
 * @param {string} filePath 文件路径
 * @returns {Promise<string>} 返回经过编译的代码
 */

const buildConfig = async (filePath: string) => {
  const result = ts.transpileModule(fs.readFileSync(filePath, 'utf-8'), {
    compilerOptions: {
      declaration: false,
      noEmit: true,
      module: 1,
    },
  });
  return result.outputText;
};
export = buildConfig;
