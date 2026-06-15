import { convertToMulebuy } from "./converter.js";

function processLinks() {
  chrome.storage.local.get(["autoConvert"], (result) => {
    if (result.autoConvert === false) return;

    const links = document.querySelectorAll("a");

    links.forEach((link) => {
      const href = link.href;
      if (!href) return;

      if (href.includes("mulebuy.com")) return;

      if (
        href.includes("taobao.com") ||
        href.includes("weidian.com") ||
        href.includes("1688.com") ||
        href.includes("tmall.com") ||
        href.includes("m.tb.cn") ||
        href.includes("e.tb.cn") ||
        href.includes("fishgoo.com")
      ) {
        const newUrl = convertToMulebuy(href);
        if (newUrl) {
          link.href = newUrl;
          link.dataset.converted = "true";
        }
      }
    });
  });
}

processLinks();

const observer = new MutationObserver((mutations) => {
  chrome.storage.local.get(["autoConvert"], (result) => {
    if (result.autoConvert === false) return;

    let shouldProcess = false;
    for (let mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        shouldProcess = true;
        break;
      }
    }

    if (shouldProcess) {
      processLinks();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
