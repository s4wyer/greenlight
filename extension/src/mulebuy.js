// Injected into mulebuy.com to handle auto-searching for short links
function autoSearch() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchUrl = urlParams.get("searchUrl");

  if (searchUrl) {
    const tryPopulate = setInterval(() => {
      const input = document.querySelector(".n-input__input-el");
      const searchBtn = document.querySelector(".search-btn");

      if (input && searchBtn) {
        clearInterval(tryPopulate);

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
      }
    }, 500);

    setTimeout(() => {
      clearInterval(tryPopulate);
    }, 10000);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", autoSearch);
} else {
  autoSearch();
}
