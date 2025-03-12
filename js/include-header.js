// js/include-header.js

document.addEventListener("DOMContentLoaded", function() {
  // 1) Stabilim calea pentru header.html în funcție de folderul curent
  let pathName = window.location.pathname; 
  let headerPath = "header.html"; // implicit, dacă ești la același nivel (ex: /html/index.html)
  let i18nPath   = "../js/i18n.js"; // implicit, ca să mergi din /html/ spre /js/
  
  // Dacă URL-ul conține "/windows/" sau "/office/", înseamnă că ești în subfolder
  if (pathName.includes("/windows/") || pathName.includes("/office/")) {
    headerPath = "../header.html";       // un nivel mai sus
    i18nPath   = "../../js/i18n.js";     // două niveluri mai sus până la rădăcină, apoi /js/
  }

  // 2) Facem fetch pentru header.html
  fetch(headerPath)
    .then(response => response.text())
    .then(html => {
      // 3) Injectăm conținutul headerului în <div id="header-include">
      document.getElementById("header-include").innerHTML = html;

      // 4) După ce am inserat header-ul, încărcăm scriptul i18n.js dinamic
      const script = document.createElement("script");
      script.src = i18nPath;

      // Când scriptul e gata, apelăm setLanguage
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

      // Adăugăm scriptul în <body>, astfel se execută
      document.body.appendChild(script);
    })
    .catch(err => console.error("Eroare la încărcarea header-ului:", err));
});
