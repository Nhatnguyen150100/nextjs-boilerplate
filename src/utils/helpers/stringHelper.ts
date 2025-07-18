/**
 * Transforms a string into capitalized form, meaning
 * the first letter is uppercase and the rest are lowercase.
 * @example capitalize("hello world") -> "Hello world"
 * @param {string} str The string to be transformed.
 * @returns {string} The transformed string.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string into a slug format.
 * - Transforms all letters to lowercase.
 * - Removes Vietnamese diacritics.
 * - Replaces special characters with hyphens (-).
 * - Removes leading and trailing hyphens.
 * @example slugify("Xin chào Thế giới!") -> "xin-chao-the-gioi"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Truncates a string to a maximum length. If the string is shorter
 * than maxLength, returns the original string. If it's longer,
 * cuts it to maxLength and appends '...'.
 * @example truncate("Hello world", 10) -> "Hello w..."
 * @example truncate("Hello", 10) -> "Hello"
 */
export function truncate(str?: string, maxLength = 30): string {
  if (!str) return '';
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}

/**
 * Checks whether a string is a valid email address.
 * @example isEmail("hello@example.com") -> true
 * @example isEmail("hello @example.com") -> false
 * @example isEmail("hello.example.com") -> false
 */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
