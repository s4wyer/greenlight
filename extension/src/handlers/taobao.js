export function convertTaobaoUrl(url) {
  try {
    // Taobao short links have to be handled differently because they can't be easily converted to a URL
    // We just let Mulebuy handle it with their scraper
    if (url.includes("m.tb.cn") || url.includes("e.tb.cn")) {
      return `https://mulebuy.com/?searchUrl=${encodeURIComponent(url)}&ref=201172299`;
    }

    if (url.includes("taobao.com")) {
      const parsedUrl = new URL(url);
      const itemId = parsedUrl.searchParams.get("id");

      if (!itemId) {
        console.error("No itemID found in the URL");
        return null;
      }

      const mulebuyUrl = new URL(`https://mulebuy.com/product`);

      mulebuyUrl.searchParams.set("id", itemId);
      mulebuyUrl.searchParams.set("platform", "TAOBAO");

      return mulebuyUrl.toString();
    } else {
      console.error("Not a Taobao URL:", url);
    }
  } catch (error) {
    console.error("Error converting URL:", url, error);
    return null;
  }
}
