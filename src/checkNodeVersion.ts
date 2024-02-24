import semver = require('semver');
import log = require('./log');

/**
 * 检查当前Node.js版本是否符合所需版本。
 * 如果版本不符合要求，程序将退出并输出错误日志。
 *
 * @param {string} requireNodeVersion 期望的Node.js版本，semver版本格式
 * @param {string} cliName 默认值为'render-builder'，用于标识当前检查动作是由哪个CLI命令发起的
 */
const checkNodeVersion = (
  requireNodeVersion: string,
  cliName = 'render-builder',
) => {
  // 使用semver库的satisfies函数对当前Node.js版本进行符合性检查
  if (!semver.satisfies(process.version, requireNodeVersion)) {
    // 如果版本不符合，输出错误日志并退出应用
    log.error(
      `You are using Node ${process.version},${cliName} requires Node ${requireNodeVersion}, please update Node.`,
    );
    process.exit(1);
  }
};
export = checkNodeVersion;
