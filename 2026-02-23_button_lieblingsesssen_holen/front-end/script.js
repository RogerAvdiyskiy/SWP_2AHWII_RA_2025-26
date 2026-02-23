const API_URL = "http://localhost:8000/lieblinge";

async function createLieblingsessenTable() {
    const response = await fetch(API_URL);
    const data = await response.json();

    const tabelle_container = document.getElementById("tabelle-container");

    data.forEach(personenDaten => {
        const zeile = document.createElement("tr");
        const datenFeldName = document.createElement("td");
        const datenFeldLieblingsessen = document.createElement("td");

        datenFeldName.textContent = personenDaten.name;
        datenFeldLieblingsessen.textContent = personenDaten.essen;
        
        zeile.appendChild(datenFeldName);
        zeile.appendChild(datenFeldLieblingsessen);

        tabelle_container.appendChild(zeile);

    });


}