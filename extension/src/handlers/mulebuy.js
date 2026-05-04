export function getOriginalFromMulebuy(url) {
  try {
    const parsedUrl = new URL(url);
    
    const searchUrl = parsedUrl.searchParams.get("searchUrl");
    if (searchUrl) {
      return { searchUrl };
    }

    const id = parsedUrl.searchParams.get("id");
    const platform = parsedUrl.searchParams.get("platform");
    
    if (id && platform) {
      let marketplace = null;
      if (platform === "WEIDIAN") marketplace = "weidian";
      else if (platform === "TAOBAO") marketplace = "taobao";
      else if (platform === "ALI_1688") marketplace = "1688";

      if (marketplace) {
        return { marketplace, mulebuyPlatform: platform, id };
      }
    }
  } catch (error) {
    return null;
  }
  return null;
}
