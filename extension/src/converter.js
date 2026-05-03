import { CnLink } from "cn-links";

export function convertToMulebuy(url) {
  try {
    // Taobao short links have to be handled differently because they can't be easily converted to a URL
    // We just let Mulebuy handle it with their scraper
    if (url.includes("m.tb.cn") || url.includes("e.tb.cn")) {
      return `https://mulebuy.com/?searchUrl=${encodeURIComponent(url)}&ref=201172299`;
    }

    const link = new CnLink(url);
    const mulebuyUrl = link.as("mulebuy");

    // Add my referal code :)
    const finalUrl = new URL(mulebuyUrl.href || mulebuyUrl);
    finalUrl.searchParams.set("ref", "201172299");

    return finalUrl.href;
  } catch (error) {
    console.error("Error converting URL:", url, error);
    return null;
  }
}

export function convertToDoppelFit(url) {
  try {
    const link = new CnLink(url);
    let marketplace = link.marketplace;
    const id = link.id;

    if (!marketplace || !id) return null;
    if (marketplace === "tmall") marketplace = "taobao";

    return `https://doppel.fit/item/${marketplace}/${id}`;
  } catch (error) {
    console.error("Error converting to Doppel.fit URL:", url, error);
    return null;
  }
}
