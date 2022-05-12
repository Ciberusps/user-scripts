// ==UserScript==
// @name        Steam revenue calculator
// @version     7
// @namespace   https://github.com/Ciberusps/user-scripts
// @updateURL   https://github.com/Ciberusps/user-scripts/raw/main/steam-revenue-calculator/steam-revenue-calculator.user.js
// @downloadURL https://github.com/Ciberusps/user-scripts/raw/main/steam-revenue-calculator/steam-revenue-calculator.user.js
// @description Calculate approximate revenue of steam game via Slava Gris formula
// @author      CiberusPS
// @include     *://*store.steampowered.com/*
// @grant       none
// @require     file://F:\user-scripts\steam-revenue-calculator\steam-revenue-calculator.user.js
// ==/UserScript==

(function () {
  const AVG_PRICE_MODIFIER = 0.75;
  const STEAM_CUT = 0.3;
  const debug = false;

  async function request(url, init) {
    try {
      const response = await fetch(url, init);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch price");
      return null;
    }
  }

  function getPrice(data) {
    try {
      const firstKey = Object.keys(data)[0];
      return (data[firstKey].data.price.initial / 100) * AVG_PRICE_MODIFIER;
    } catch (err) {
      return null;
    }
  }

  async function onLoaded() {
    debug && console.log("LOADED EVENT", window.location.href);
    const pathname = window.location.pathname;
    const parts = pathname.split("/").filter((s) => s.length > 0);
    const gameId = Number(parts[1]);
    debug && console.log(parts, parts.length);

    const isValidGamePath = parts.length === 3 && !Number.isNaN(gameId);
    if (!isValidGamePath) return null;

    debug && console.log(document.querySelector("div.game_area_purchase_game[id]"));
    const packageIdStringSplitted = document
      .querySelector("div.game_area_purchase_game[id]")
      .getAttribute("id")
      .split("_");
    const packageId = Number(packageIdStringSplitted[packageIdStringSplitted.length - 1]);

    const pricesRes = await request(
      `https://store.steampowered.com/api/packagedetails/?cc=us&packageids=${packageId}`,
      {
        method: "GET",
      }
    );
    debug && console.log(pricesRes);
    if (!pricesRes) return null;

    const price = getPrice(pricesRes);
    if (!price) return null;
    debug && console.log("PRICE", price);

    const reviewsCount = Number(
      document.querySelector('meta[itemprop="reviewCount"]').getAttribute("content")
    );
    debug && console.log("REVIEW COUNT", reviewsCount);

    const profit = { gross: reviewsCount * 60 * price };
    profit.net = profit.gross * (1 - STEAM_CUT);
    profit.cut = profit.gross * STEAM_CUT;
    debug && console.log(profit);

    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

    const imgContainerEl = document.querySelector("div.game_header_image_ctn");
    const netProfitEl = document.createElement("div");
    netProfitEl.style.background = "#000B";
    netProfitEl.style.padding = "5px 10px";
    netProfitEl.style.position = "absolute";
    netProfitEl.style.bottom = "0px";
    netProfitEl.style.right = "0px";
    netProfitEl.innerText =
      "Net: " +
      formatter.format(profit.net) +
      " | Gross: " +
      formatter.format(profit.gross) +
      " | Steam Cut: " +
      formatter.format(profit.cut);

    imgContainerEl.style.position = "relative";
    imgContainerEl.appendChild(netProfitEl);
    debug && console.log("INJECTED");
  }

  if (!window.__STEAM_REVENUE_CALC_LOADED) {
    window.__STEAM_REVENUE_CALC_LOADED = true;
    window.addEventListener("load", onLoaded);
  }
})();
