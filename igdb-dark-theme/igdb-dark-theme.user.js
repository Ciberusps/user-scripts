// ==UserScript==
// @name        IGDB Dark Theme
// @version     2
// @namespace   https://github.com/Ciberusps/user-scripts
// @updateURL   https://github.com/Ciberusps/user-scripts/raw/main/igdb-dark-theme/igdb-dark-theme.user.js
// @downloadURL https://github.com/Ciberusps/user-scripts/raw/main/igdb-dark-theme/igdb-dark-theme.user.js
// @description IGDB Dark Theme
// @author      CiberusPS
// @match       *://*.igdb.com*
// @match       *://igdb.com/*
// @grant       none
// @require     file://S:\user-scripts\igdb-dark-theme\igdb-dark-theme.user.js
// ==/UserScript==

(function () {
  console.log("SCRIPT LOADED");
  // const whiteTheme = {
  //   // black: "#0F0F0F"
  // };

  const blackTheme = {
    black: "#000000",
    blackWhiter: "#0F0F0F",
    darkGrey: "#1B1B1B",
    lighterGrey: "#E3E3E3",
    lightGrey: "#3F3F3F",
    grey: "#595959", // from web
    darkerGrey: "#1F1F1F",
    white: "#FFFFFF",
    link: "#70B1E3",
    blue: "#4683d9",
  };

  const naviTheme = {
    black: "#000000",
    blackWhiter: "#0F0F0F",
    darkGrey: "#1B1B1B",
    lighterGrey: "#E3E3E3",
    lightGrey: "#3F3F3F",
    grey: "#595959", // from web
    darkerGrey: "#1F1F1F",
    white: "#FFFFFF",
    link: "",
    blue: "#4683d9",
  };

  const theme = blackTheme;

  const defaultStyles = `
    // html, body {
    //   background: ${theme.black} !important;
    //   color: ${theme.white};
    // }

    // h4 {
    //   color: ${theme.white};
    // }

    // .panel {
    //   background: ${theme.darkerGrey} !important;
    // }
  `;

  const stylesheetElement = document.createElement("style");
  stylesheetElement.id = "my-dtf-styles";
  stylesheetElement.innerHTML = defaultStyles;

  function appendStyles() {
    if (stylesheetElement !== document.head.lastElementChild) {
      if (stylesheetElement.parentNode === document.head) {
        document.head.removeChild(stylesheetElement);
      }
      document.head.appendChild(stylesheetElement);
    }
  }

  const interval = setInterval(() => {
    appendStyles();
  }, 500);

  // insurance that interval will be stopped sometime
  setTimeout(() => {
    clearInterval(interval);
    console.log("Interval ended");
  }, 15000);

  window.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
    appendStyles();
    clearInterval(interval);
  });
})();
