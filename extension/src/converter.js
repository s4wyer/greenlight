import { getWeidianId } from "./handlers/weidian";
import { getTaobaoId } from "./handlers/taobao";
import { get1688Id } from "./handlers/1688";
import { getOriginalFromMulebuy } from "./handlers/mulebuy";
import { getOriginalFromFishgoo } from "./handlers/fishgoo.js";

function constructMulebuyUrl(platform, id) {
  const mulebuyUrl = new URL("https://mulebuy.com/product");
  mulebuyUrl.searchParams.set("id", id);
  mulebuyUrl.searchParams.set("platform", platform);
  return mulebuyUrl.toString();
}

function getMarketplaceAndId(url) {
  if (url.includes("mulebuy.com")) {
    const mulebuyData = getOriginalFromMulebuy(url);
    if (mulebuyData) {
      if (mulebuyData.searchUrl) {
        return getMarketplaceAndId(mulebuyData.searchUrl);
      }
      return mulebuyData;
    }
  }

  if (url.includes("fishgoo.com")) {
    const fishgooData = getOriginalFromFishgoo(url);
    if (fishgooData && fishgooData.searchUrl) {
      return getMarketplaceAndId(fishgooData.searchUrl);
    }
  }

  if (url.includes("weidian.com") || url.includes("k.youshop10.com")) {
    const id = getWeidianId(url);
    if (id) return { marketplace: "weidian", mulebuyPlatform: "WEIDIAN", id };
  }

  if (url.includes("taobao.com") || url.includes("tmall.com")) {
    const id = getTaobaoId(url);
    if (id) return { marketplace: "taobao", mulebuyPlatform: "TAOBAO", id };
  }

  if (url.includes("1688.com")) {
    const id = get1688Id(url);
    if (id) return { marketplace: "1688", mulebuyPlatform: "ALI_1688", id };
  }

  return { marketplace: null, mulebuyPlatform: null, id: null };
}

export function convertToMulebuy(url) {
  try {
    // Taobao short links have to be handled differently because they can't be easily converted to a URL
    // We just let Mulebuy handle it with their scraper
    if (url.includes("m.tb.cn") || url.includes("e.tb.cn")) {
      return `https://mulebuy.com/?searchUrl=${encodeURIComponent(url)}&ref=201172299`;
    }

    const { mulebuyPlatform, id } = getMarketplaceAndId(url);

    if (!mulebuyPlatform || !id) {
      return null;
    }

    const mulebuyUrl = constructMulebuyUrl(mulebuyPlatform, id);

    // Add my referal code :)
    const finalUrl = new URL(mulebuyUrl);
    finalUrl.searchParams.set("ref", "201172299");

    return finalUrl.href;
  } catch (error) {
    return null;
  }
}

export function convertToDoppelFit(url) {
  try {
    const { marketplace, id } = getMarketplaceAndId(url);

    if (!marketplace || !id) return null;

    return `https://doppel.fit/item/${marketplace}/${id}`;
  } catch (error) {
    return null;
  }
}
