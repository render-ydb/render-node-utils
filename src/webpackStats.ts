import chalk = require('chalk');
import { MultiStats, Stats } from 'webpack';
import formatWebpackMessages = require('./formatWebpackMessages');
import log = require('./log');

interface Urls {
  lanUrlForTerminal: string;
  lanUrlForBrowser: string;
  localUrlForTerminal: string;
  localUrlForBrowser: string;
}

interface WebpackStatsParams {
  stats: Stats | MultiStats;
  statsOptions?: Record<string, string>;
  urls?: Urls;
  isFirstCompile?: boolean;
}

interface WebpackStats {
  (options: WebpackStatsParams): boolean;
}

const defaultOptions = {
  errors: false,
  warnings: false,
  colors: true,
  assets: true,
  chunks: false,
  entrypoints: false,
  modules: false,
};

const getStatsJson = (stats: Stats | MultiStats) => {
  return stats.toJson({
    all: false,
    errors: true,
    warnings: true,
    timings: true,
  });
};

const logSuccess = (statsJson: any, isFirstCompile?: boolean, urls?: Urls) => {
  if (statsJson.time) {
    log.success(
      `Compiled successfully in ${(statsJson.time / 1000).toFixed(1)}s!`,
    );
  }
  if (isFirstCompile && urls) {
    console.log();
    log.info('Starting the development server at:');
    log.info(`   - Local  : ${chalk.underline.white(urls.localUrlForBrowser)}`);
    log.info(`   - Network: ${chalk.underline.white(urls.lanUrlForTerminal)}`);
    console.log();
  }
};

const logErrors = (messages: any) => {
  log.error(messages.errors.join('\n\n'));
};

const logWarnings = (messages: any) => {
  log.warn(messages.warnings.join('\n\n'));
};

/**
 * webpackStats函数，处理webpack编译结果的主要逻辑。
 *
 * @param {WebpackStatsParams} options - 包含相关配置的参数对象
 * @return {boolean} 如果没有错误，则返回true，否则返回false
 */
const webpackStats: WebpackStats = ({
  urls,
  stats,
  statsOptions = defaultOptions,
  isFirstCompile,
}) => {
  const statsJson = getStatsJson(stats);
  const messages = formatWebpackMessages(statsJson);

  const isSuccessful = !messages.errors.length;
  if (isSuccessful) {
    logSuccess(statsJson, isFirstCompile, urls);
  } else if (messages.errors.length) {
    logErrors(messages);
  }

  if (messages.warnings.length) {
    logWarnings(messages);
  }

  return isSuccessful;
};

export = webpackStats;
