export function getOriginalFromFishgoo(url) {
  try {
    const parsedUrl = new URL(url);

    // Try normal search params first
    let searchUrl = parsedUrl.searchParams.get("productLink");
    if (searchUrl) {
      return { searchUrl };
    }

    // Try hash search params if fishgoo uses hash routing
    if (parsedUrl.hash) {
      const hashQueryIndex = parsedUrl.hash.indexOf("?");
      if (hashQueryIndex !== -1) {
        const hashQueryString = parsedUrl.hash.substring(hashQueryIndex + 1);
        const hashSearchParams = new URLSearchParams(hashQueryString);
        searchUrl = hashSearchParams.get("productLink");
        if (searchUrl) {
          return { searchUrl };
        }
      }
    }
  } catch (error) {
    return null;
  }
  return null;
}

