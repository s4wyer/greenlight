export function convertWeidianUrl(url) {
  try {
    if (url.includes("weidian.com")) {
      const parsedUrl = new URL(url);
      const itemId = parsedUrl.searchParams.get("itemID");

      if (!itemId) {
        console.error("No itemID found in the URL");
        return null;
      }

      const mulebuyUrl = new URL(`https://mulebuy.com/product`);

      mulebuyUrl.searchParams.set("id", itemId);
      mulebuyUrl.searchParams.set("platform", "WEIDIAN");

      return mulebuyUrl.toString();
    } else {
      console.error("Not a Weidian URL:", url);
    }
  } catch (error) {
    console.error("Error converting URL:", url, error);
    return null;
  }
}

// TODO: support shortened Weidian URLs
// Example Weidian share URL: https://k.youshop10.com/HfLqC0l4
