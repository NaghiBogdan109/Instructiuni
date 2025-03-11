function setLanguage(lang) {
  // 1. Salvăm limba în localStorage (ca să fie persistentă)
  localStorage.setItem('language', lang);

  // 2. Încărcăm fișierul JSON cu traduceri
  fetch(`lang/${lang}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Nu am găsit fișierul de limbă: " + response.status);
      }
      return response.json();
    })
    .then(translation => {
      // 3. Căutăm toate elementele care au data-i18n
      document.querySelectorAll("[data-i18n]").forEach(elem => {
        // Luăm cheie (ex: "headerTitle", "mainText", etc)
        const key = elem.getAttribute("data-i18n");
        // Verificăm dacă există acea cheie în obiectul translation
        if (translation[key]) {
          elem.textContent = translation[key];
        }
      });
    })
    .catch(error => {
      console.error("Eroare la încărcarea traducerilor:", error);
    });
}

