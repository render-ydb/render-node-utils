import npmlog = require('npmlog');
import emoji = require('node-emoji');
import chalk = require('chalk');

const logSymbols = require('log-symbols');

let globalPrefix = 'render-builder';

npmlog.addLevel(
  'debug',
  1000,
  { fg: 'blue' },
  `${emoji.emojify(':hammer_and_wrench:')} debug`,
);
npmlog.addLevel(
  'info',
  2000,
  { fg: 'cyan' },
  `${logSymbols.info} ${chalk.cyan('info')}`,
);

npmlog.addLevel(
  'warn',
  4000,
  { fg: 'yellow' },
  `${logSymbols.warning} ${chalk.yellow('warn')}`,
);
npmlog.addLevel(
  'error',
  5000,
  { fg: 'red' },
  `${logSymbols.error} ${chalk.red('ERR!')}`,
);
npmlog.addLevel(
  'success',
  6000,
  { fg: 'green' },
  `${logSymbols.success} ${chalk.green('success')}`,
);

// 定义一系列的log函数，用于输出不同级别的日志
const debug = (msg: any, prefix = globalPrefix) => {
  npmlog.debug(prefix, msg);
};
const info = (msg: any, prefix = globalPrefix) => {
  npmlog.info(prefix, msg);
};

const warn = (msg: any, prefix = globalPrefix) => {
  npmlog.warn(prefix, msg);
};

const error = (msg: any, prefix = globalPrefix) => {
  npmlog.error(prefix, msg);
};

const success = (msg: any, prefix = globalPrefix) => {
  npmlog.success(prefix, msg);
};

const setLogLevel = (level: string) => {
  npmlog.level = level;
};

const setGlobalPrefix = (prefix: string) => {
  globalPrefix = prefix;
};

export = {
  debug,
  info,
  warn,
  error,
  success,
  setLogLevel,
  setGlobalPrefix,
};
