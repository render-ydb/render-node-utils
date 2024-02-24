import axios from 'axios';

/**
 * 通过npm registry API获取指定npm包的最新版版本号
 * @param {string} packageName - 需要查询的npm包名称
 * @param {string} npmRegistry - npm仓库地址，默认为"https://registry.npmjs.org"
 * @returns {Promise<string>} 返回Promise，resolve的值为最新版版本号
 * @throws {AxiosError} 如果请求失败或者网络出现问题，将抛出AxiosError异常
 */
const getNpmPkgLatestVersion = async (
  packageName: string,
  npmRegistry = 'https://registry.npmjs.org',
): Promise<string> => {
  try {
    const response = await axios.get(
      `${npmRegistry}/-/package/${packageName}/dist-tags`,
    );
    if (response.status === 200) {
      return response.data.latest;
    } else {
      throw new Error('Unexpected response status: ' + response.status);
    }
  } catch (error) {
    throw error;
  }
};

export = getNpmPkgLatestVersion;
