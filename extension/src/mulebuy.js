// Injected into mulebuy.com to handle auto-searching for short links
function autoSearch() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchUrl = urlParams.get("searchUrl");

  if (searchUrl) {
    const populate = () => {
      const input = document.querySelector(".n-input__input-el");
      const searchBtn = document.querySelector(".search-btn");

      if (input && searchBtn) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value",
        ).set;
        nativeInputValueSetter.call(input, searchUrl);

        const event = new Event("input", { bubbles: true });
        input.dispatchEvent(event);

        setTimeout(() => {
          searchBtn.click();
        }, 100);
        return true;
      }
      return false;
    };

    if (!populate()) {
      const observer = new MutationObserver((mutations, obs) => {
        if (populate()) {
          obs.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });

      setTimeout(() => {
        observer.disconnect();
      }, 10000);
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", autoSearch);
} else {
  autoSearch();
}
