export function getOriginalFromFishgoo(url) {
  try {
    const parsedUrl = new URL(url);

    const searchUrl = parsedUrl.searchParams.get("productLink");
    if (searchUrl) {
      return { searchUrl };
    }
  } catch (error) {
    return null;
  }
  return null;
}
