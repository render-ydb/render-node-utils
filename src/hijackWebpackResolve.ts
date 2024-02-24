import Module = require('module');

interface IOptions {
  paths: string[];
}

const hijackWebpackResolve = (webpack: any, rootDir: string): void => {
  const webpackRegex = /^webpack\//;
  const originalResolver = (Module as any)._resolveFilename;
  (Module as any)._resolveFilename = function (
    request: string,
    parent: string,
    isMain: boolean,
    options: IOptions,
  ): void {
    if (request.match(webpackRegex)) {
      const newOptions: IOptions = { paths: [] };
      if (options?.paths) {
        newOptions.paths = options.paths?.includes(rootDir)
          ? options.paths
          : options.paths?.concat(rootDir);
      } else {
        newOptions.paths.push(rootDir);
      }
      return originalResolver.apply(this, [
        request,
        parent,
        isMain,
        newOptions,
      ]);
    }
    return originalResolver.apply(this, [request, parent, isMain, options]);
  };
  // require(id)
  const originalLoader = (Module as any)._load;
  (Module as any)._load = function (request: string, parent: object) {
    let moduleRequest = request;
    if (!parent) {
      if (request === 'webpack') {
        return webpack;
      } else if (request.match(webpack)) {
        try {
          moduleRequest = require.resolve(request, { paths: [rootDir] });
        } catch (e) {
          console.log(e);
        }
      }
    }
    return originalLoader.apply(this, [moduleRequest, parent]);
  };
};

export = hijackWebpackResolve;
