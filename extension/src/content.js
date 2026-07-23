import { convertToMulebuy, isSupportedUrl } from "./converter.js";
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

  const link = event.target.closest("a");

  if (link && link.href) {
    const href = link.href;
    if (href.includes("mulebuy.com")) return;

    if (isSupportedUrl(href)) {
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

let pendingNodes = [];
let processLinksTimeout = null;

function processLinks() {
  if (!autoConvertEnabled) return;

  const nodesToProcess = pendingNodes.length > 0 ? pendingNodes : [document.body];
  pendingNodes = []; // Reset for next batch

  fixRedditLinks(nodesToProcess);

  const links = [];
  
  if (nodesToProcess[0] === document.body) {
    const docLinks = document.querySelectorAll("a:not([data-converted='true'])");
    links.push(...docLinks);
  } else {
    for (const node of nodesToProcess) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'A' && !node.dataset.converted) {
          links.push(node);
        }
        const innerLinks = node.querySelectorAll("a:not([data-converted='true'])");
        links.push(...innerLinks);
      }
    }
  }

  links.forEach((link) => {
    const href = link.href;
    if (!href) return;

    if (href.includes("mulebuy.com")) return;

    if (isSupportedUrl(href)) {
      const newUrl = convertToMulebuy(href);
      if (newUrl) {
        link.href = newUrl;
        link.dataset.converted = "true";
      }
    }
  });
}

function debouncedProcessLinks(nodes) {
  if (nodes) {
    for (const node of nodes) {
      pendingNodes.push(node);
    }
  }
  if (processLinksTimeout) {
    clearTimeout(processLinksTimeout);
  }
  processLinksTimeout = setTimeout(processLinks, 100);
}

debouncedProcessLinks();

const observer = new MutationObserver((mutations) => {
  if (!autoConvertEnabled) return;

  const addedNodes = [];
  for (let mutation of mutations) {
    if (mutation.addedNodes.length > 0) {
      for (let node of mutation.addedNodes) {
        addedNodes.push(node);
      }
    }
  }

  if (addedNodes.length > 0) {
    debouncedProcessLinks(addedNodes);
  }
});

if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
} else {
  document.addEventListener("DOMContentLoaded", () => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
