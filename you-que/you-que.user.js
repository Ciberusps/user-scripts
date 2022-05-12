// ==UserScript==
// @name        YouQue
// @version     3
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
  const IS_DEV = true;

  let sidebarRootEl = null;
  let sidebarEl = null;

  function createSidebarEl() {
    sidebarEl = document.createElement("div");
    // sidebarEl.id = "you-que-sidebar";
    sidebarEl.style.display = "flex";
    sidebarEl.style.flexDirection = "column";
    sidebarEl.style.alignItems = "center";
    sidebarEl.style.width = "400px";
    sidebarEl.style.color = "white";
    sidebarEl.style.fontSize = "16px";
    sidebarEl.style.backgroundColor = "rgba(0, 0, 0, 0.25)";

    for (let i = 0; i < 10; i++) {
      const testVideo = document.createElement("div");
      testVideo.style.display = "flex";
      // testVideo.style.flexDirection = "column";
      testVideo.style.alignItems = "center";
      testVideo.style.width = "100%";
      testVideo.style.height = "50px";
      testVideo.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
      testVideo.style.marginBottom = "5px";
      testVideo.textContent = "Video " + i;
      sidebarEl.appendChild(testVideo);
    }
  }

  function insertSidebar() {
    // Select the node that will be observed for mutations
    sidebarRootEl = document.getElementById("page-manager");
    debugLog("sidebarRootEl");
    debugLog(sidebarRootEl);
    if (!sidebarRootEl) throw new Error("Failed to insert sidebar");

    // Callback function to execute when mutations are observed
    const callback = function (mutationsList, observer) {
      // Use traditional 'for loops' for IE 11
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          debugLog("A child node has been added or removed.");

          createSidebarEl();
          sidebarRootEl.appendChild(sidebarEl);

          observer.disconnect();
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(sidebarRootEl, { childList: true });
  }

  async function onLoaded() {
    debugLog("YouQue loaded");
    // style-scope ytd-playlist-video-list-renderer

    insertSidebar();

    // const pathname = window.location.pathname;
    // const parts = pathname.split("/").filter((s) => s.length > 0);
    // const gameId = Number(parts[1]);
    // debug && console.log(parts, parts.length);
    // debug && console.log({ gameId });

    // const isValidGamePath = parts.length === 3 && !Number.isNaN(gameId);
    // if (!isValidGamePath) return null;

    // const steamSpyData = await request({
    //   method: "GET",
    //   url: `https://steamspy.com/api.php?request=appdetails&appid=${gameId}`,
    // });

    // debug && console.log(steamSpyData);
    // // console.log({ response2: res2.response    });
    // // const json = await res2.json();
    // // console.log({ json })
    // if (!pricesRes) return null;

    // const price = getPrice(pricesRes);
    // if (!price) return null;
    // debug && console.log("PRICE", price);

    // const reviewsCount = Number(
    //   document.querySelector('meta[itemprop="reviewCount"]').getAttribute("content")
    // );
    // debug && console.log("REVIEW COUNT", reviewsCount);

    // const profit = { gross: reviewsCount * 60 * price };
    // profit.net = profit.gross * (1 - STEAM_CUT);
    // profit.cut = profit.gross * STEAM_CUT;
    // debug && console.log(profit);

    // var formatter = new Intl.NumberFormat("en-US", {
    //   style: "currency",
    //   currency: "USD",
    //   maximumFractionDigits: 0,
    // });

    // const imgContainerEl = document.querySelector("div.game_header_image_ctn");
    // const netProfitEl = document.createElement("div");
    // netProfitEl.style.background = "#000B";
    // netProfitEl.style.padding = "5px 10px";
    // netProfitEl.style.position = "absolute";
    // netProfitEl.style.bottom = "0px";
    // netProfitEl.style.right = "0px";
    // netProfitEl.innerText =
    //   "Net: " +
    //   formatter.format(profit.net) +
    //   " | Gross: " +
    //   formatter.format(profit.gross) +
    //   " | Steam Cut: " +
    //   formatter.format(profit.cut);

    // imgContainerEl.style.position = "relative";
    // imgContainerEl.appendChild(netProfitEl);
    debugLog("INJECTED");
  }

  if (!window.__YOU_QUE_LOADED) {
    window.__YOU_QUE_LOADED = true;
    window.addEventListener("load", onLoaded);
  }

  debugLog = function (...args) {
    IS_DEV && console.log(...args);
  };
})();
