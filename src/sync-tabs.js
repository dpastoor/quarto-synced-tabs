
function toggleTab(tabId, active) {
  let tab = document.getElementById(tabId);
  let tabPanelId = tab.getAttribute("aria-controls");
  let tabPanel = document.getElementById(tabPanelId);
  if (active) {
    tab.classList.add("active");
    tabPanel.classList.add("active");
  } else {
    tab.classList.remove("active");
    tabPanel.classList.remove("active");
  }
}
function toggleAll(language, selectorsToSync) {
  Object.keys(selectorsToSync).forEach((lang) => {
    selectorsToSync[lang].forEach((selector) => {
      toggleTab(selector, lang === language);
    });
  });
}

function findSelectorsToSyncByLanguage() {
  let selectorsToSync = {};
  document.querySelectorAll("[id^='tabset-']").forEach((item) => {
    if ((item.innerHTML !== "R") & (item.innerHTML !== "Python")) {
      return;
    }
    let lang = item.innerHTML;
    if (!selectorsToSync[lang]) {
      selectorsToSync[lang] = [];
    }
    selectorsToSync[lang].push(item.id);
  });
  return selectorsToSync;
}

function setupSelectorSync(lang) {
  const selectorsToSync = findSelectorsToSyncByLanguage();
  Object.keys(selectorsToSync).forEach((lang) => {
    selectorsToSync[lang].forEach((selector) => {
    const item = document.getElementById(selector);
    item.addEventListener("click", (event) => {
      localStorage.setItem("quartoLangTabSync", lang);
      toggleAll(lang, selectorsToSync);
    });
    });
  });
  // for initial state
  if (lang) {
    toggleAll(lang, selectorsToSync);
  }
}

window.document.addEventListener("DOMContentLoaded", (event) => {
    setupSelectorSync(localStorage.getItem("quartoLangTabSync"));
});
