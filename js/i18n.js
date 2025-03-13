function setLanguage(lang) {
  // 1. Salvăm limba
  localStorage.setItem('language', lang);

  // 2. Vedem unde ne aflăm (windows/office sau nu)
  const pathName = window.location.pathname; 
  let jsonPath = "../lang";

  // Dacă URL-ul conține /windows/ sau /office/, atunci mai adăugăm un nivel
  if (pathName.includes("/windows/") || pathName.includes("/office/")) {
    // trebuie să urcăm 2 niveluri ca să ajungem la /lang
    jsonPath = "../../lang";
  }

  // 3. Facem fetch cu calea corectă
  fetch(`${jsonPath}/${lang}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Nu am găsit fișierul de limbă: " + response.status);
      }
      return response.json();
    })
    .then(translation => {
      // 4. Atribuim textul tradus
      document.querySelectorAll("[data-i18n]").forEach(elem => {
        const key = elem.getAttribute("data-i18n");
        if (translation[key]) {
          elem.textContent = translation[key];
        }
      });
    })
    .catch(error => {
      console.error("Eroare la încărcarea traducerilor:", error);
    });
}
