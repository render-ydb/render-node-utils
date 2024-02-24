import fs = require('fs');
import path = require('path');
import chalk = require('chalk');
import { filesize } from 'filesize';
import recursive = require('recursive-readdir');
import { MultiStats } from 'webpack';
import gzipSize = require('gzip-size');
import stripAnsi = require('strip-ansi');
import log = require('./log');

interface Memo {
  [key: string]: number;
}

interface PreviousSizeMap {
  root: string;
  sizes: Memo;
}

const canReadAsset = (asset: string) => {
  return (
    /\.(js|css)$/.test(asset) &&
    !/service-worker\.js/.test(asset) &&
    !/precache-manifest\.[0-9a-f]+\.js/.test(asset)
  );
};

const printFileSizesAfterBuild = (
  webpackStats: MultiStats,
  previousSizeMap: PreviousSizeMap,
  buildFolder: string,
  maxBundleGzipSize: number,
  maxChunkGzipSize: number,
) => {
  const { root } = previousSizeMap;
  const { sizes } = previousSizeMap;
  const assets = (webpackStats.stats || [webpackStats])
    .map((stats) =>
      // @ts-ignore
      stats
        .toJson({ all: false, assets: true })
        .assets.filter((asset) => canReadAsset(asset.name))
        .map((asset) => {
          const fileContents = fs.readFileSync(path.join(root, asset.name));
          const size = gzipSize.sync(fileContents);
          const previousSize =
            sizes[removeFileNameHash(root, asset.name) as string];
          const difference = getDifferenceLabel(size, previousSize);
          const rightPadding = difference ? ` (${difference}) ` : '';
          return {
            folder: path.join(
              path.basename(buildFolder),
              path.dirname(asset.name),
            ),
            name: path.basename(asset.name),
            size,
            sizeLabel: `${filesize(size)}${rightPadding}`,
          };
        }))
    .reduce((single, all) => all.concat(single), []);
  assets.sort((a, b) => b.size - a.size);
  const longestSizeLabelLength = Math.max.apply(
    null,
    assets.map((a) => stripAnsi(a.sizeLabel).length),
  );

  let suggestBundleSplitting = false;
  assets.forEach((asset) => {
    let { sizeLabel } = asset;
    const sizeLength = stripAnsi(sizeLabel).length;
    if (sizeLength < longestSizeLabelLength) {
      const rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength);
      sizeLabel += rightPadding;
    }
    const isMainBundle = asset.name.indexOf('main.') === 0;
    const maxRecommendedSize = isMainBundle
      ? maxBundleGzipSize
      : maxChunkGzipSize;
    const isLarge = maxRecommendedSize && asset.size > maxRecommendedSize;
    if (isLarge && path.extname(asset.name) === '.js') {
      suggestBundleSplitting = true;
    }
    console.log(
      `  ${isLarge ? chalk.yellow(sizeLabel) : sizeLabel}  ${chalk.dim(
        asset.folder + path.sep,
      )}${chalk.cyan(asset.name)}`,
    );
  });
  if (suggestBundleSplitting) {
    console.log();
    log.warn('The bundle size is significantly larger than recommended.');
    log.warn(
      'Consider reducing it with code splitting: https://webpack.docschina.org/guides/code-splitting/',
    );
    log.warn(
      'You can also analyze the project dependencies: https://goo.gl/LeUzfb',
    );
  }
};

const removeFileNameHash = (buildFolder: string, fileName: string) => {
  return fileName
    .replace(buildFolder, '')
    .replace(/\\/g, '/')
    .replace(/\//g, '')
    .replace(
      /\/?(.*)(\.[0-9a-f]+)(\.chunk)?(\.js|\.css)/,
      (match, p1, p2, p3, p4) => `${p1}${p4}`,
    );
};

const getDifferenceLabel = (currentSize: number, previousSize: number) => {
  const FIFTY_KILOBYTES = 1024 * 50;
  const difference = currentSize - previousSize;
  const fileSize = !Number.isNaN(difference) ? filesize(difference) : 0;
  if (difference >= FIFTY_KILOBYTES) {
    return chalk.red(`+${fileSize}`);
  } else if (difference < FIFTY_KILOBYTES && difference > 0) {
    return chalk.yellow(`+${fileSize}`);
  } else if (difference < 0) {
    return chalk.green(fileSize);
  } else {
    return '';
  }
};

const measureFileSizesBeforeBuild = async (buildFolder: string) => {
  return new Promise((resolve) => {
    recursive(buildFolder, (err, fileNames) => {
      let sizes: Memo = {};
      if (!err && fileNames) {
        sizes = fileNames
          .filter(canReadAsset)
          .reduce((memo: Memo, fileName) => {
            const contents = fs.readFileSync(fileName);
            const key = removeFileNameHash(buildFolder, fileName);
            memo[key] = gzipSize.sync(contents);
            return memo;
          }, {});
      }

      resolve({
        root: buildFolder,
        sizes: sizes || {},
      });
    });
  });
};

export = {
  measureFileSizesBeforeBuild,
  printFileSizesAfterBuild,
};
