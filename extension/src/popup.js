import { convertToMulebuy } from "./converter.js";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("linkInput");
  const btn = document.getElementById("convertBtn");
  const resultDiv = document.getElementById("result");
  const autoConvertToggle = document.getElementById("toggleAutoConvert");
  const rightClickToggle = document.getElementById("toggleRightClick");

  chrome.storage.local.get(["autoConvert", "rightClick"], (result) => {
    autoConvertToggle.checked = result.autoConvert !== false;
    rightClickToggle.checked = result.rightClick !== false;
  });

  autoConvertToggle.addEventListener("change", () => {
    chrome.storage.local.set({ autoConvert: autoConvertToggle.checked });
  });

  rightClickToggle.addEventListener("change", () => {
    chrome.storage.local.set({ rightClick: rightClickToggle.checked });
    chrome.runtime.sendMessage({
      action: "updateContextMenus",
      enabled: rightClickToggle.checked,
    });
  });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs[0] && tabs[0].url) {
      const url = tabs[0].url;
      if (
        url.includes("taobao.com") ||
        url.includes("weidian.com") ||
        url.includes("1688.com") ||
        url.includes("tmall.com") ||
        url.includes("fishgoo.com")
      ) {
        input.value = url;
      }
    }
  });

  btn.addEventListener("click", () => {
    let url = input.value.trim();
    if (!url) return;

    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    const newUrl = convertToMulebuy(url);

    if (newUrl) {
      resultDiv.innerHTML = `<a href="${newUrl}" target="_blank">${newUrl}</a>`;
      chrome.tabs.create({ url: newUrl });
    } else {
      resultDiv.innerHTML = `<span class="error">Could not convert link. Ensure it's a valid Taobao, Weidian, 1688, or Fishgoo URL.</span>`;
    }
  });
});
