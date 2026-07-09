import { convertToMulebuy } from "./converter.js";
import { fixRedditLinks } from "./linkFixer.js";

let autoConvertEnabled = true;

chrome.storage.local.get(["autoConvert", "autoRedirect"], (result) => {
  autoConvertEnabled = result.autoConvert !== false;

  if (result.autoRedirect === true) {
    if (!window.location.href.includes("mulebuy.com")) {
      const newUrl = convertToMulebuy(window.location.href);
      if (newUrl && newUrl !== window.location.href) {
        window.location.replace(newUrl);
      }
    }
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local") {
    if (changes.autoConvert !== undefined) {
      autoConvertEnabled = changes.autoConvert.newValue !== false;
    }
    if (changes.autoRedirect !== undefined && changes.autoRedirect.newValue === true) {
      if (!window.location.href.includes("mulebuy.com")) {
        const newUrl = convertToMulebuy(window.location.href);
        if (newUrl && newUrl !== window.location.href) {
          window.location.replace(newUrl);
        }
      }
    }
  }
});

function handleLinkClick(event) {
  if (!autoConvertEnabled) return;

  let target = event.target;
  let link = null;

  while (target && target !== document) {
    if (target.tagName === "A") {
      link = target;
      break;
    }
    target = target.parentNode;
  }

  if (link && link.href) {
    const href = link.href;
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
        event.preventDefault();
        event.stopPropagation();
        window.open(newUrl, link.target || "_blank");
      }
    }
  }
}

document.addEventListener("click", handleLinkClick, true);
document.addEventListener("auxclick", handleLinkClick, true);

function processLinks() {
  chrome.storage.local.get(["autoConvert"], (result) => {
    if (result.autoConvert === false) return;

    fixRedditLinks();

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
