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
    addToWishlistButton.style.background = "#007bff";
    addToWishlistButton.style.borderRadius = "4px";
    addToWishlistButton.style.padding = "10px 15px";
    addToWishlistButton.style.cursor = "pointer";
    addToWishlistButton.style.fontSize = "1.1rem";

    const linkToUnrealSales = document.createElement("a");
    linkToUnrealSales.href = "https://www.unrealsales.io/tracker/";
    linkToUnrealSales.target = "_blank";
    linkToUnrealSales.innerText = "🌐";
    linkToUnrealSales.style.display = "flex";
    linkToUnrealSales.style.alignItems = "center";
    linkToUnrealSales.style.background = "#007bff";
    linkToUnrealSales.style.borderRadius = "4px";
    linkToUnrealSales.style.marginLeft = "10px";
    linkToUnrealSales.style.padding = "10px 15px";
    linkToUnrealSales.style.cursor = "pointer";
    linkToUnrealSales.style.fontSize = "1.1rem";

    addToWishlistButton.onclick = () =>
      (function () {
        if (window.location.href.indexOf("unrealsales.io") !== -1) return;
        f = "https://www.unrealsales.io/tracker/add?product=" + window.location.href;
        location.href = f;
      })();

    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.display = "flex";
    buttonsContainer.style.alignItems = "center";
    buttonsContainer.style.flexWrap = "wrap";
    buttonsContainer.style.marginTop = "20px";

    buttonsContainer.appendChild(addToWishlistButton);
    buttonsContainer.appendChild(linkToUnrealSales);

    const rootEl = document.querySelector(
      ".asset-details-container .asset-details__content"
    );
    rootEl.appendChild(buttonsContainer);

    debug && console.log("INJECTED");
  }

  window.addEventListener("load", onLoaded);
})();
