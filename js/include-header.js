document.addEventListener("DOMContentLoaded", function() {
  let pathName = window.location.pathname; 
  // 1) Dacă ești la root (index.html), calea implicită e "header.html".
  let headerPath = "header.html";
  let i18nPath   = "js/i18n.js";

  // 2) Dacă ești în /html/windows/ sau /html/office/, mergi două niveluri în sus
  if (pathName.includes("/html/windows/") || pathName.includes("/html/office/") || pathName.includes("/html/adobe/")) {
    headerPath = "../../header.html";
    i18nPath   = "../../js/i18n.js";
  }
  // 3) Dacă ești în /html/ direct (ex. /html/windows.html, /html/office.html),
  // mergi un nivel în sus
  else if (pathName.includes("/html/")) {
    headerPath = "../header.html";
    i18nPath   = "../js/i18n.js";
  }

  // 4) Facem fetch pentru header.html
  fetch(headerPath)
    .then(response => response.text())
    .then(html => {
      document.getElementById("header-include").innerHTML = html;

      // 5) Încarc scriptul i18n.js
      const script = document.createElement("script");
      script.src = i18nPath;
      script.onload = function() {
        const urlParams = new URLSearchParams(window.location.search);
        const paramLang = urlParams.get('lang');
        if (paramLang) {
          setLanguage(paramLang);
        } else {
          const savedLang = localStorage.getItem('language') || 'ro';
          setLanguage(savedLang);
        }
      };
      document.body.appendChild(script);
    })
    .catch(err => console.error("Eroare la încărcarea header-ului:", err));
});
