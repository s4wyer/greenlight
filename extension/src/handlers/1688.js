export function get1688Id(url) {
  try {
    const match = url.match(/\/offer\/(\d+)/);
    if (match) {
      return match[1];
    }
  } catch (error) {
    return null;
  }
  return null;
}
