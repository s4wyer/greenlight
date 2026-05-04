export function get1688Id(url) {
  try {
    if (url.includes("1688.com")) {
      const match = url.match(/\/offer\/(\d+)/);
      if (match) {
        return match[1];
      }
    }
  } catch (error) {
    return null;
  }
  return null;
}
