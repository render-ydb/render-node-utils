import fg = require('fast-glob');

const getPathsOfFilesMatchingPattern = (
  pattern: string | string[],
  cwd: string = process.cwd(),
  absolute = true,
) => {
  return fg.sync(pattern, {
    cwd,
    absolute,
  });
};
export = getPathsOfFilesMatchingPattern;
