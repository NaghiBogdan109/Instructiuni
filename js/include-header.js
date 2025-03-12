// include-header.js
document.addEventListener("DOMContentLoaded", function() {
  fetch("html/header.html")   // dacă header.html e în aceeași rădăcină cu index.html
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-include").innerHTML = data;
    })
    .catch(err => console.error("Eroare la încărcarea header-ului:", err));
});

