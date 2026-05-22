"use strict";

const hamburgerIcon = document.querySelector(".hamburger-icon");
const hamburgerPanel = document.querySelector(".hamburger-panel");
const closeBtn = document.querySelector(".close-btn");

function toggleHide(item) {
  item.classList.toggle("hide");
}

function removeHide(item) {
  item.classList.remove("hide");
}

function addHide(item) {
  item.classList.add("hide");
}

// === hamburger menu control ===

hamburgerIcon.addEventListener("click", () => {
  hamburgerPanel.classList.toggle("slidein");
});

// === feature tabs control ===

const tabMenus = document.querySelectorAll(".features__tab-item");
const featuresContainer = document.querySelectorAll(".features__container");

function activeClass(item) {
  item.classList.add("features__tab-item--active");
}

function inactiveClass(item) {
  item.classList.add("features__tab-item--inactive");
}

tabMenus.forEach((item) => {
  item.addEventListener("click", (e) => {
    tabMenus.forEach((tab) => {
      tab.classList.remove(
        "features__tab-item--active",
        "features__tab-item--inactive"
      );
    });

    tabMenus.forEach((tab) => {
      if (tab === e.target) {
        activeClass(e.target);
      } else if (tab !== e.target) {
        inactiveClass(tab);
      }
    });

    const tabs = Array.from(tabMenus);
    const eIndex = tabs.indexOf(e.target);

    featuresContainer.forEach((page, index) => {
      if (index === eIndex) {
        removeHide(page);
      } else if (index !== eIndex) {
        addHide(page);
      }
    });
  });
});

// === accordion menus ===

const accordionItems = document.querySelectorAll(".faq__accordion-item");
const accordionAnswers = document.querySelectorAll(".faq__accordion-answer");

accordionItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    const items = Array.from(accordionItems);
    const targetIndex = items.indexOf(e.target);

    accordionAnswers.forEach((answer, index) => {
      if (index === targetIndex) {
        toggleHide(answer);
      }
    });
  });
});

// === input field validation ===

const form = document.querySelector("form");
const input = document.querySelector("input");

function initialize() {
  form.firstElementChild.classList.remove("input-container--error");
  input.classList.remove("error-input");
}

function displayError() {
  removeHide(input.nextElementSibling);
  form.firstElementChild.classList.add("input-container--error");
  input.classList.add("error-input");
}

function displaySuccess() {
  addHide(input.nextElementSibling);
  form.firstElementChild.classList.remove("input-container--error");
  input.classList.remove("error-input");
  input.classList.add("success-input");
}

let isValid = false;
function emailValidation() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (input.value.trim() == "") {
    displayError();
    isValid = false;
  } else if (!regex.test(input.value.trim())) {
    displayError();
    isValid = false;
  } else {
    isValid = true;
    displaySuccess();
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  initialize();
  emailValidation();
  setTimeout(() => {
    input.classList.remove("success-input");
  }, 2000);
});
