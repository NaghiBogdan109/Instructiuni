function setLanguage(lang) {
  // 1. Salvăm limba selectată
  localStorage.setItem('language', lang);

  // 2. Determinăm calea corectă pentru fișierul JSON
  const pathName = window.location.pathname; 
  let jsonPath = "../lang";

  // Dacă URL-ul conține "/windows/" sau "/office/", ajustăm calea
  if (pathName.includes("/windows/") || pathName.includes("/office/")) {
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
