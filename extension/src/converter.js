import { CnLink } from "cn-links";
import { convertWeidianUrl } from "./handlers/weidian";
import { convertTaobaoUrl } from "./handlers/taobao";
import { convert1688Url } from "./handlers/1688";

export function convertToMulebuy(url) {
  try {
    if (url.includes("weidian.com") || url.includes("k.youshop10.com")) {
      return convertWeidianUrl(url);
    }

    if (
      url.includes("taobao.com") ||
      url.includes("e.tb.cn") ||
      url.includes("m.tb.cn")
    ) {
      return convertTaobaoUrl(url);
    }

    if (url.includes("detail.1688.com")) {
      return convert1688Url(url);
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
