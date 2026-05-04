export function convert1688Url(url) {
  try {
    if (url.includes("detail.1688.com")) {
      const parsedUrl = new URL(url);

      const match = url.match(/\/offer\/(\d+)/);

      if (!match) {
        console.error("No item ID found in:", url);
        return null;
      }

      const itemId = match[1];

      const mulebuyUrl = new URL(`https://mulebuy.com/product`);

      mulebuyUrl.searchParams.set("id", itemId);
      mulebuyUrl.searchParams.set("platform", "ALI_1688");

      return mulebuyUrl.toString();
    } else {
      console.error("Not a 1688 URL:", url);
    }
  } catch (error) {
    console.error("Error converting URL:", url, error);
    return null;
  }
}
