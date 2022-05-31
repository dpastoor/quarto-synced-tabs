function syncSelectors(lang) {
    let targets = [];
    function toggleIfMatches(item, lang) {
      if (item.innerHTML === lang) {
        item.classList.add("active");
        targets.push(item.getAttribute("aria-controls"));
      } else if (targets.includes(item.getAttribute("id"))) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    }
    document.querySelectorAll("[id^='tabset-']").forEach((item) => {
      // given nested tabsets such as a code dropdown inside of a tab,
      // inside the tab content may have different role/toggle.toggle
      // one other target we could try is the attribute role==="tab"
      // vs role==="tabpanel" which julia's example for vetiver showed
      if (item.getAttribute("data-bs-toggle") === "tab") {
        toggleIfMatches(item, lang);
      }
    });
  }

  document.querySelectorAll("[id^='tabset-']").forEach((item) => {
    item.addEventListener("click", (event) => {
      // this will target the tab itself, also need to expose the content
      if ((item.innerHTML !== "R") & (item.innerHTML !== "Python")) {
        console.log("bad query selector with innerHTML", item.innerHTML);
        return;
      }
      localStorage.setItem("lang", item.innerHTML);
      syncSelectors(item.innerHTML); // this should log R or Python
    });
  });

  window.document.addEventListener("DOMContentLoaded", (event) => {
    if (localStorage.getItem("lang")) {
      syncSelectors(localStorage.getItem("lang"));
    }
  });