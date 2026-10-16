function setLanguage(lang) {
  // 1. Salvăm limba selectată
  localStorage.setItem('language', lang);

  // Marcam limba activa in meniu si in documentul paginii
  document.documentElement.lang = lang === 'gr' ? 'el' : lang;
  document.querySelectorAll('.language-nav a').forEach(a => {
    a.setAttribute('aria-current', a.getAttribute('href') === '?lang=' + lang ? 'true' : 'false');
  });

  // 2. Determinăm calea corectă pentru fișierul JSON
  const pathName = window.location.pathname; 
  let jsonPath = "../lang";

  // Paginile din subfolderele lui /html/ stau cu doua niveluri mai jos
  if (/\/html\/[^/]+\/[^/]*$/.test(pathName)) {
    jsonPath = "../../lang";
  }

  // 3. Facem fetch la fișierul JSON
  fetch(`${jsonPath}/${lang}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Nu am găsit fișierul de limbă: " + response.status);
      }
      return response.json();
    })
    .then(translation => {
      // 4. Aplicăm traducerile
      document.querySelectorAll("[data-i18n]").forEach(elem => {
        const key = elem.getAttribute("data-i18n");
        if (translation[key]) {
          elem.innerHTML = translation[key]; // Folosim innerHTML pentru a păstra formatarea HTML
        }
      });
    })
    .catch(error => {
      console.error("Eroare la încărcarea traducerilor:", error);
    });
}
