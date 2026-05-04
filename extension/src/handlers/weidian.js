export function getWeidianId(url) {
  try {
    if (url.includes("weidian.com")) {
      const parsedUrl = new URL(url);
      return parsedUrl.searchParams.get("itemID") || parsedUrl.searchParams.get("itemId") || parsedUrl.searchParams.get("id");
    }
  } catch (error) {
    return null;
  }
  return null;
}

// TODO: support shortened Weidian URLs
// Example Weidian share URL: https://k.youshop10.com/HfLqC0l4
