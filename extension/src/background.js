import { convertToMulebuy, convertToDoppelFit } from "./converter.js";

function updateContextMenus(enabled) {
  chrome.contextMenus.removeAll(() => {
    if (enabled) {
      chrome.contextMenus.create({
        id: "searchDoppelFit",
        title: "Search QC on Doppel.fit",
        contexts: ["link", "selection"],
      });
    }
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["rightClick"], (result) => {
    updateContextMenus(result.rightClick !== false);
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateContextMenus") {
    updateContextMenus(request.enabled);
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  let urlToConvert = info.linkUrl || info.selectionText;
  if (!urlToConvert) return;

  if (!urlToConvert.startsWith("http")) {
    urlToConvert = "https://" + urlToConvert;
  }

  if (info.menuItemId === "searchDoppelFit") {
    const doppelLink = convertToDoppelFit(urlToConvert);
    if (doppelLink) {
      chrome.tabs.create({ url: doppelLink });
    } else {
      console.error("Could not convert to Doppel.fit URL:", urlToConvert);
    }
  }
});
