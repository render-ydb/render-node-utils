import chalk = require('chalk');
import url = require('url');
import address = require('address');

interface IPrepareUrls {
  lanUrlForConfig: any;
  lanUrlForTerminal: string | undefined;
  lanUrlForBrowser: string | undefined;
  localUrlForTerminal: string;
  localUrlForBrowser: string;
}

const formatUrl = (
  protocol: string,
  hostname: string,
  port: number,
  pathname: string,
): string =>
  url.format({
    protocol,
    hostname,
    port,
    pathname,
  });

const prettyPrintUrl = (
  protocol: string,
  hostname: string,
  port: number,
  pathname: string,
): string =>
  url.format({
    protocol,
    hostname,
    port: chalk.bold(port.toString()),
    pathname,
  });

const isPrivateIpv4Address = (ipAddress: string) =>
  /^10[.]|^30[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(
    ipAddress,
  ) || process.env.USE_PUBLIC_IP;

/**
 * 准备url
 * @param {string} protocol 传输协议
 * @param {string} host 主机
 * @param {number} port 端口号
 * @param {string} pathname 文件路径，默认为"/"
 * @return {IPrepareUrls} 返回lanUrlForConfig，lanUrlForTerminal，lanUrlForBrowser，localUrlForTerminal，localUrlForBrowser
 */
const prepareUrls = (
  protocol: string,
  host: string,
  port: number,
  pathname = '/',
): IPrepareUrls => {
  const isUnspecifiedHost = host === '0.0.0.0' || host === '::';
  let prettyHost = isUnspecifiedHost ? 'localhost' : host;
  let lanUrlForConfig;
  let lanUrlForTerminal;
  let lanUrlForBrowser;

  if (isUnspecifiedHost) {
    try {
      lanUrlForConfig = address.ip();
      if (lanUrlForConfig && isPrivateIpv4Address(lanUrlForConfig)) {
        lanUrlForTerminal = prettyPrintUrl(
          protocol,
          lanUrlForConfig,
          port,
          pathname,
        );
        lanUrlForBrowser = formatUrl(protocol, lanUrlForConfig, port, pathname);
      } else {
        lanUrlForConfig = undefined;
      }
    } catch (_e) {
      // ignored
    }
  }

  const localUrlForTerminal = prettyPrintUrl(
    protocol,
    prettyHost,
    port,
    pathname,
  );
  const localUrlForBrowser = formatUrl(protocol, prettyHost, port, pathname);

  return {
    lanUrlForConfig,
    lanUrlForTerminal,
    lanUrlForBrowser,
    localUrlForTerminal,
    localUrlForBrowser,
  };
};

export = prepareUrls;
