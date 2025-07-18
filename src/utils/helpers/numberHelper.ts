/**
 * Format a number or string as a currency with commas
 * @param {number|string} value
 * @returns {string}
 * @example
 * formatCurrency(10000) // "10,000"
 * formatCurrency('10000') // "10,000"
 */
export function formatCurrency(
  value?: number | string,
  locale: string = 'vi-VN',
): string {
  if (!value) return '';
  const number = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat(locale).format(number);
}

/**
 * Rounds a number to the specified number of decimal places
 * @param {number} num
 * @param {number} [digits=2]
 * @returns {number}
 * @example
 * roundDecimal(1.2345) // 1.23
 * roundDecimal(1.2345, 3) // 1.235
 */
export function roundDecimal(num: number, digits: number = 2): number {
  return parseFloat(num.toFixed(digits));
}

/**
 * Calculates a percentage given a part and a total
 * @param {number} part
 * @param {number} total
 * @returns {number} percentage
 * @example
 * calculatePercentage(50, 100) // 50
 */
export function calculatePercentage(part: number, total: number): number {
  if (total === 0) return 0;
  return (part / total) * 100;
}

/**
 * Abbreviates a number by appending a single character:
 *   'K' for thousands,
 *   'M' for millions,
 *   'B' for billions
 * @param {number} num
 * @returns {string}
 * @example
 * abbreviateNumber(1000) // "1K"
 * abbreviateNumber(10000) // "10K"
 * abbreviateNumber(1000000) // "1M"
 * abbreviateNumber(1000000000) // "1B"
 */
export function abbreviateNumber(num: number): string {
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  return num.toString();
}
