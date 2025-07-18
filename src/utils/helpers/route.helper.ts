export function matchRoute(pathname: string, routePattern: string): boolean {
  const pattern = routePattern
    .replace(/:[^/]+/g, '[^/]+') // chuyển :userId thành [^/]+
    .replace(/\//g, '\\/'); // escape dấu /
  const regex = new RegExp(`^${pattern}$`);
  return regex.test(pathname);
}
