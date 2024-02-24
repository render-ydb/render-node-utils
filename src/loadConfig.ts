import fse = require('fs-extra');
import buildConfig = require('./buildConfig');
import log = require('./log');

const loadJsonConfig = <T>(filePath: string): T | undefined => {
  return fse.readJSONSync(filePath, { encoding: 'utf8' });
};

const loadJsConfig = <T>(filePath: string): T | undefined => {
  return require(filePath);
};

const loadTsConfig = async <T>(filePath: string): Promise<T | undefined> => {
  let code = await buildConfig(filePath);
  const tempFile = `${filePath}.js`;
  fse.writeFileSync(tempFile, code);

  delete require.cache[require.resolve(tempFile)];
  let config: T | undefined;
  try {
    const baseConfig = require(tempFile);
    config = baseConfig.default ?? baseConfig;
  } catch (err: any) {
    fse.unlinkSync(tempFile);
    err.stack = err.stack.replace(tempFile, filePath);
    log.error(err.stack);
  }
  fse.unlinkSync(tempFile);
  return config;
};

const loadConfig = async <T>(filePath: string): Promise<T | undefined> => {
  if (filePath.endsWith('.json')) return loadJsonConfig<T>(filePath);
  if (filePath.endsWith('.js')) return loadJsConfig<T>(filePath);
  if (filePath.endsWith('.ts')) return await loadTsConfig<T>(filePath);
};

export = loadConfig;
