// ==UserScript==
// @name        YouQue
// @version     2
// @namespace   https://github.com/Ciberusps/user-scripts
// @updateURL   https://github.com/Ciberusps/user-scripts/raw/main/you-que/you-que.user.js
// @downloadURL https://github.com/Ciberusps/user-scripts/raw/main/you-que/you-que.user.js
// @description YouTube videos queue
// @author      CiberusPS
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @exclude     http://www.youtube.com/embed/*
// @exclude     https://www.youtube.com/embed/*
// @match       http://www.youtube.com/*
// @match       https://www.youtube.com/*
// @match       http://s.ytimg.com/yts/jsbin/*
// @match       https://s.ytimg.com/yts/jsbin/*
// @match       http://manifest.googlevideo.com/*
// @match       https://manifest.googlevideo.com/*
// @match       http://*.googlevideo.com/videoplayback*
// @match       https://*.googlevideo.com/videoplayback*
// @match       http://*.youtube.com/videoplayback*
// @match       https://*.youtube.com/videoplayback*
// @require     file://F:\user-scripts\you-que\you-que.user.js
// ==/UserScript==

(function () {
  const debug = true;

  async function onLoaded() {
    debug && console.log("YouQue loaded");
    const pathname = window.location.pathname;
    const parts = pathname.split("/").filter((s) => s.length > 0);
    const gameId = Number(parts[1]);
    debug && console.log(parts, parts.length);
    debug && console.log({ gameId });

    const isValidGamePath = parts.length === 3 && !Number.isNaN(gameId);
    if (!isValidGamePath) return null;

    const steamSpyData = await request({
      method: "GET",
      url: `https://steamspy.com/api.php?request=appdetails&appid=${gameId}`,
    });

    debug && console.log(steamSpyData);
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

  if (!window.__YOU_QUE_LOADED) {
    window.__YOU_QUE_LOADED = true;
    window.addEventListener("load", onLoaded);
  }
})();
