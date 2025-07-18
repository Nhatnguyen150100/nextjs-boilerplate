/**
 * Check if a child URL is a child of a given parent URL.
 *
 * If the parent URL is '/', this function will return false.
 *
 * @param {string} parentUrl The parent URL to check against.
 * @param {string} childUrl The child URL to check.
 * @returns {boolean} true if the child URL is a child of the parent URL, false otherwise.
 */
const isChildUrl = (parentUrl: string, childUrl: string): boolean => {
  if (parentUrl === '/') return false;
  let compareParentUrl: string = parentUrl;
  let compareChildUrl: string = childUrl;

  if (!compareParentUrl.endsWith('/')) {
    compareParentUrl += '/';
  }
  if (!compareChildUrl.endsWith('/')) {
    compareChildUrl += '/';
  }
  return compareChildUrl.startsWith(compareParentUrl);
};

export default isChildUrl;
