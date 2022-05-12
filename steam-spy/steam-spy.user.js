// ==UserScript==
// @name        Steam spy
// @version     8
// @namespace   https://github.com/Ciberusps/user-scripts
// @updateURL   https://github.com/Ciberusps/user-scripts/raw/main/steam-spy/steam-spy.user.js
// @downloadURL https://github.com/Ciberusps/user-scripts/raw/main/steam-spy/steam-spy.user.js
// @description Dispaly owners count from steamspy.com
// @author      CiberusPS
// @match       *://*store.steampowered.com/*
// @grant       GM.xmlHttpRequest
// @connect     steamspy.com
// @require     file://F:\user-scripts\steam-spy\steam-spy.user.js
// ==/UserScript==

(function () {
  const debug = true;

  function getPrice(data) {
    try {
      const firstKey = Object.keys(data)[0];
      return (data[firstKey].data.price.initial / 100) * AVG_PRICE_MODIFIER;
    } catch (err) {
      return null;
    }
  }

  async function request(options) {
    try {
      const res2 = await GM.xmlHttpRequest(options);
      return res2.json();
    } catch (err) {
      console.error(err);
    }
  }

  async function onLoaded() {
    console.log("KOJPOIJPOJPNOIJ 322");
    if (window.__STEAM_SPY_LOADED) return;
    window.__STEAM_SPY_LOADED = true;

    debug && console.log("LOADED EVENT v7", window.location.href);
    const pathname = window.location.pathname;
    const parts = pathname.split("/").filter((s) => s.length > 0);
    const gameId = Number(parts[1]);
    debug && console.log(parts, parts.length);
    debug && console.log({ gameId });

    const isValidGamePath = parts.length === 3 && !Number.isNaN(gameId);
    if (!isValidGamePath) return null;

    const res = await request({
      method: "GET",
      url: `https://steamspy.com/api.php?request=appdetails&appid=${gameId}`,
    });

    debug && console.log({ response: res });
    // console.log({ response2: res2.response    });
    // const json = await res2.json();
    // console.log({ json })
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

  window.addEventListener("load", onLoaded);
})();
