// ==UserScript==
// @name        Balaboba generator
// @version     3
// @namespace   https://github.com/Ciberus/user-scripts
// @updateURL   https://github.com/Ciberusps/user-scripts/raw/main/dtf-balaboba-generator/dtf-balaboba-generator.user.js
// @downloadURL https://github.com/Ciberusps/user-scripts/raw/main/dtf-balaboba-generator/dtf-balaboba-generator.user.js
// @description Balaboba > ABOBA - генерирует тексты с помощью нейросети от Яндекса "Балабоба" https://yandex.ru/lab/yalm
// @author      CiberusPS
// @include     *://*.dtf.ru*
// @include     *://dtf.ru/*
// @include     *://*.tjournal.ru*
// @include     *://tjournal.ru/*
// @include     *://*.vc.ru*
// @include     *://vc.ru/*
// @grant       none
// @require     file://G:\user-scripts\dtf-balaboba-generator\dtf-balaboba-generator.user.js
// ==/UserScript==

(function () {
  const defaultStyles = `
@keyframes balaboba-loader {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.balaboba-loader  {
  width: 18px;
  height: 18px;
  border: 3px solid #1d0e0b;
  border-top-color: transparent;
  border-radius: 50%;
  animation: balaboba-loader 0.66s linear infinite;
}
      `;
  const icon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA1IDc5LjE2NDU5MCwgMjAyMC8xMi8wOS0xMTo1Nzo0NCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNWVmY2M3My00ZTE0LTRmMDYtYWQwNS0zOGVkYzkyMWM3NGIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUUwQ0Q4QzRDMTcxMTFFQkEwM0ZFQUNEODhCNDRDRTkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUUwQ0Q4QzNDMTcxMTFFQkEwM0ZFQUNEODhCNDRDRTkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjEgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpmYThkNmQ1OS1jMDBiLTQxNWUtYTE0OC0wMDdiNzhlMDk3NTciIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpmMmI4ZTJjNC0wNGViLTEwNDktYjMzYi0wMTAwZGE5Nzc5MzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6EaYtWAAACWElEQVR42sRXv0scQRT+Zo0XjhA4kdTegWARIWuV0giJrQauCIKkS2eIf4GkSqenKQI2BizSqGhro9eZKhc469vehBXUaBSdfDO3PzzP3M66u96DB7M/Zr43773vzRsBQ5EuCujBJHWUjzYkihB8pz/ikGOHoxrHVVxgU/TxXRpC4KL8gwV5DFeeQMbQFTU3CXBBA8cDbVe1hut56hYR/9s1ctjhsIh0xME5xhgW5+YH6xZwO2Vw6LW4JsNod/RABjuP9IRoyfIcfmQIft2IkTaWdEq4+neSC+Y6/yk6MVtyQLte4gPuS4jlU7SZhDnM4b6lt7lh4cXe7fTvfh0Yfh4+b28Br14mNuGQuVCyaMkkuiMFhW2RB6PolhDbYkLY6J7YygOxeT8+QeMfterUW2B9A/h9ELNCmhwocevA2qr5YWVl4dfyNLC3Z/avpekQUxQNaX2gv1jZWf1aZOmLGRVVEjpJd9z/BJh9D8y8C999WzM7F5QHfqbl+lIp9pSahSvspmVAoxGOhwaNzoSqhUts3iUProui3sIS8Hk5fPembDDxQmPTkCNU0qShUqce3bSGp+EDVNKkIQ3GQCmSfx8DA0SeTLjCYhJQxQAWIJwxHE+HI2O/qDHbWrKHbMlkxi2ZusDk2ZKJZt4FlVD3aAJj3g0nO3Bi+OBtbbkXiteZGCGaa/uu73wxOdU94k5q4fB3nje4mASe+IuRpInpJ5yOef6OXlXe4I3ma8w7ocs5Fe3JSOeYGiLJkhPdP76gPvMamULQYErt5horaxWPeT0XZtX1nwADAO+P64xw6+uMAAAAAElFTkSuQmCC";

  let balabobasResults = {};
  let introsReq;
  let intros = [];

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

  const showLoader = (commentForm) => {
    const submitBtn = commentForm.querySelector("div.balaboba-submit");
    const loader = commentForm.querySelector("div.balaboba-loader");
    submitBtn.style.display = "none";
    loader.style.display = "block";
  };

  const hideLoader = (commentForm) => {
    const submitBtn = commentForm.querySelector("div.balaboba-submit");
    const loader = commentForm.querySelector("div.balaboba-loader");
    submitBtn.style.display = "block";
    loader.style.display = "none";
  };

  const onClickBalaboba = (commentForm) => async () => {
    const comment = commentForm.querySelector("p.content_editable");
    if (!comment.innerText.length) return null;

    if (!balabobasResults[commentForm]) balabobasResults[commentForm] = {};

    showLoader(commentForm);

    let sendLastQuery = false;
    let query = comment.innerText;
    if (balabobasResults[commentForm]?.next === comment.innerText) {
      sendLastQuery = true;
      query = balabobasResults[commentForm]?.last;
    }

    const selectedIntro = Number(commentForm.querySelector("select").value);

    const result = await request(
      "https://zeapi.yandex.net/lab/api/yalm/text3",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          intro: selectedIntro,
          filter: 1,
        }),
      }
    );
    if (!sendLastQuery) balabobasResults[commentForm].last = comment.innerText;
    let newText = "Ошибка";
    if (result?.query && result?.text) {
      newText = result.query + result.text?.replaceAll("\n", "\n> ");
    }

    comment.innerText =
      "> " +
      newText +
      "\n\n(c) Балабоба, нейросеть подражает текстам в интернете, не относитесь к написанному серьёзно";
    balabobasResults[commentForm].next = comment.innerText;

    hideLoader(commentForm);
  };

  const createSelectOptions = (selectInput) => {
    intros.forEach((intro) => {
      const option = document.createElement("option");
      option.value = intro[0];
      option.innerText = intro[1];
      selectInput.appendChild(option);
    });
  };

  const createBalabobaButton = (commentForm) => {
    const container = document.createElement("div");
    container.className = "thesis__attach_balaboba";
    container.style.width = "auto";
    container.style.display = "flex";
    container.style.background = "#FFF500";
    container.style.borderRadius = "34px";
    container.style.paddingLeft = "5px";

    // button
    const buttonContainer = document.createElement("div");
    buttonContainer.style.width = "34px";
    buttonContainer.style.height = "34px";
    buttonContainer.style.display = "flex";
    buttonContainer.style.alignItems = "center";
    buttonContainer.style.justifyContent = "center";
    container.appendChild(buttonContainer);

    const button = document.createElement("div");
    button.className = "balaboba-submit";
    button.style.background = `url(${icon}`;
    button.style.width = "34px";
    button.style.height = "34px";
    button.style.cursor = "pointer";
    button.onclick = onClickBalaboba(commentForm);
    buttonContainer.appendChild(button);

    // loader
    const loader = document.createElement("div");
    loader.className = "balaboba-loader";
    loader.style.display = "none";
    buttonContainer.appendChild(loader);

    // select
    const selectInput = document.createElement("select");
    selectInput.name = "intro";
    selectInput.value = 0;
    selectInput.style.marginLeft = 5;
    selectInput.style.border = 0;
    selectInput.style.background = "#f4f7f9";
    selectInput.style.background = "#EDE400";
    selectInput.style.width = "auto";
    selectInput.style.borderTopRightRadius = "34px";
    selectInput.style.borderBottomRightRadius = "34px";
    selectInput.style.padding = "5px";
    createSelectOptions(selectInput);
    container.appendChild(selectInput);

    return container;
  };

  const addUiElements = async (newNode) => {
    if (newNode.target.className !== "comments_form") return null;
    console.log("ADD ELEMENTS");
    await introsReq;
    const commentForm = newNode.target;

    const attachEl = commentForm.querySelector("div.thesis__attaches");
    const balabobaAttachedEl = attachEl.querySelector(
      `div.thesis__attach_balaboba`
    );
    if (balabobaAttachedEl) return null;

    attachEl.appendChild(createBalabobaButton(commentForm));
  };

  const onLoaded = async () => {
    introsReq = request("https://zeapi.yandex.net/lab/api/yalm/intros", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    intros = (await introsReq).intros;
    console.log(intros);

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerHTML = defaultStyles;
    document.head.appendChild(styleSheet);

    const defaultCommentForms = document.querySelectorAll("div.comments_form");
    console.log("fads", defaultCommentForms);
    defaultCommentForms.forEach((el) => {
      addUiElements({ target: el });
    });
  };

  window.addEventListener("load", onLoaded);
  window.addEventListener("DOMNodeInserted", addUiElements);
})();
