/**
 * formatString 是一个将输入字符串转化为大写，并移除下划线，最后按照字母顺序排列的函数。
 *
 * @param {string} input 传入的字符串
 * @returns {string[]} 返回一个经过处理的字符串数组
 */
const formatString = (input: string): string[] => {
  const upperCase = input.toUpperCase();
  const withoutUnderscore = upperCase.replace('_', '');
  return withoutUnderscore.split('').sort();
};

/**
 * calculateSimilarity 是一个计算两个经过处理的字符串数组中相同元素的数量的函数。
 *
 * @param {string[]} formattedX 第一个经过处理的字符串数组
 * @param {string[]} formattedY 第二个经过处理的字符串数组
 * @returns {number} 返回相同元素的数量
 */
const calculateSimilarity = (
  formattedX: string[],
  formattedY: string[],
): number => {
  let matches = 0;
  let a = formattedX.shift();
  let b = formattedY.shift();

  while (a !== undefined && b != undefined) {
    if (a === b) {
      matches++;
      a = formattedX.shift();
      b = formattedY.shift();
    } else if (a < b) {
      a = formattedX.shift();
    } else if (a > b) {
      b = formattedY.shift();
    }
  }

  return matches;
};

/**
 * similarity 是一个计算两个字符串的相似度的函数。
 *
 * @param {string} x 传入的第一个字符串
 * @param {string} y 传入的第二个字符串
 * @returns {number} 返回两个字符串的相似度
 */
const similarity = (x: string, y: string): number => {
  const formattedX = formatString(x);
  const formattedY = formatString(y);

  const totalLength = x.length + y.length;
  const matches = calculateSimilarity(formattedX, formattedY);

  return (matches / totalLength) * 200;
};

export = similarity;
