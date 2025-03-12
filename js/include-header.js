// include-header.js
document.addEventListener("DOMContentLoaded", function() {
  fetch("header.html")
    .then(response => response.text())
    .then(html => {
      // Injectăm conținutul header.html
      document.getElementById("header-include").innerHTML = html;

      // După ce header-ul este inserat, încărcăm i18n.js
      const script = document.createElement("script");
      script.src = "../js/i18n.js"; 
      // ↑ Ajustează calea la fișier în funcție de poziția reală a `js/i18n.js`

      // Când i18n.js a fost încărcat, apelăm setLanguage
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

      // Adăugăm scriptul în <body>
      document.body.appendChild(script);
    })
    .catch(err => console.error("Eroare la încărcarea header-ului:", err));
});
