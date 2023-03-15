// ==UserScript==
// @name        UnrealSales add to wishlist
// @version     1
// @namespace   https://github.com/Ciberusps/user-scripts
// @updateURL   https://github.com/Ciberusps/user-scripts/raw/main/unrealsales-add-to-wishlist/unrealsales-add-to-wishlist.user.js
// @downloadURL https://github.com/Ciberusps/user-scripts/raw/main/unrealsales-add-to-wishlist/unrealsales-add-to-wishlist.user.js
// @description Adds item to UnrealSales.io wishlist
// @author      CiberusPS
// @include     *://*.unrealengine.com/marketplace*
// @grant       none
// @require     file://F:\user-scripts\unrealsales-add-to-wishlist\unrealsales-add-to-wishlist.user.js
// ==/UserScript==

const debug = false;

(function () {
  async function onLoaded() {
    debug && console.log("LOADED EVENT", window.location.href);

    const addToWishlistButton = document.createElement("div");
    addToWishlistButton.innerText = "Add to UnrealSales.io wishlist";
    addToWishlistButton.style.display = "flex";
    addToWishlistButton.style.alignItems = "center";
    addToWishlistButton.style.background = "#6678FA";
    addToWishlistButton.style.borderRadius = "4px";
    addToWishlistButton.style.width = "100%";
    addToWishlistButton.style.padding = "10px 15px";
    addToWishlistButton.style.marginTop = "10px";
    addToWishlistButton.style.cursor = "pointer";
    addToWishlistButton.style.fontWeight = "700";
    addToWishlistButton.style.fontSize = "1.1rem";

    addToWishlistButton.onclick = () =>
      (function () {
        if (window.location.href.indexOf("unrealsales.io") !== -1) return;
        f = "https://www.unrealsales.io/tracker/add?product=" + window.location.href;
        location.href = f;
      })();

    const rootEl = document.querySelector(
      ".asset-details-container .asset-details__content"
    );
    rootEl.appendChild(addToWishlistButton);

    debug && console.log("INJECTED");
  }

  window.addEventListener("load", onLoaded);
})();
