// ==UserScript==
// @name        UnrealSales add to wishlist
// @version     9
// @namespace   https://github.com/Ciberusps/user-scripts
// @updateURL   https://github.com/Ciberusps/user-scripts/raw/main/unrealsales-add-to-wishlist/unrealsales-add-to-wishlist.user.js
// @downloadURL https://github.com/Ciberusps/user-scripts/raw/main/unrealsales-add-to-wishlist/unrealsales-add-to-wishlist.user.js
// @description Adds item to UnrealSales.io wishlist
// @author      CiberusPS
// @include     *://*.unrealengine.com/marketplace*
// @include     *://*.epicgames.com/ue/marketplace*
// @grant       none
// @require     file://F:\user-scripts\unrealsales-add-to-wishlist\unrealsales-add-to-wishlist.user.js
// ==/UserScript==

(function () {
  const DEBUG = true;
  const MAX_INJECT_TIME_SECONDS = 15;
  const NAME = "unreal-sales-add-to-wishlist";

  let addButtonsTimer;
  let addButtonsTimerClearTimeout;
  let currentUrl = "";

  async function addButtons() {
    const isInjected = Boolean(document.getElementById(NAME));
    if (isInjected) {
      clearInterval(addButtonsTimer);
      clearTimeout(addButtonsTimerClearTimeout);
      return DEBUG && console.log("Already injected", isInjected);
    }

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

    addToWishlistButton.onclick = () => {
      let marketplaceLink = window.location.href;

      if (window.location.href.indexOf("unrealsales.io") !== -1) return;
      if (window.location.hostname.includes(["epicgames.com"])) {
        marketplaceLink = `https://www.unrealengine.com${window.location.pathname.replace(
          "/ue",
          ""
        )}`;
      }

      location.href = "https://www.unrealsales.io/tracker/add?product=" + marketplaceLink;
    };

    const buttonsContainer = document.createElement("div");
    buttonsContainer.id = NAME;
    buttonsContainer.style.display = "flex";
    buttonsContainer.style.alignItems = "center";
    buttonsContainer.style.flexWrap = "wrap";
    buttonsContainer.style.marginTop = "20px";

    buttonsContainer.appendChild(addToWishlistButton);
    buttonsContainer.appendChild(linkToUnrealSales);

    const rootEl = document.querySelector(
      ".asset-details-container .asset-details__content"
    );
    if (!rootEl) return;
    rootEl.appendChild(buttonsContainer);
    clearInterval(addButtonsTimer);
    clearTimeout(addButtonsTimerClearTimeout);

    DEBUG && console.log("INJECTED");
  }

  const runAddButtonsTimer = () => {
    clearInterval(addButtonsTimer);
    clearTimeout(addButtonsTimerClearTimeout);

    addButtonsTimer = setInterval(() => {
      DEBUG && console.log("try add buttons");
      addButtons();
    }, 500);

    // insurance that interval will be stopped sometime
    addButtonsTimerClearTimeout = setTimeout(() => {
      clearInterval(addButtonsTimer);
      DEBUG && console.log("addButtonsTimerClearTimeout ended");
    }, MAX_INJECT_TIME_SECONDS * 1000);
  };

  // popstate/hashchange events dont work, check on every click for
  window.addEventListener("click", () => {
    // small delay to ensure that url changed
    setTimeout(() => {
      DEBUG && console.log("check");
      if (currentUrl != window.location.pathname) {
        currentUrl = window.location.pathname;
        DEBUG && console.log("Run add buttons");
        runAddButtonsTimer();
      }
    }, 100);
  });

  window.addEventListener("load", () => {
    currentUrl = window.location.pathname;
    runAddButtonsTimer();
  });
})();
