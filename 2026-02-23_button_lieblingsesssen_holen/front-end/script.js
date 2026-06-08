async function createLieblingsessenTable() {
    const btn = document.getElementById("loadBtn");
    const tabelle_container = document.getElementById("tabelle-container");

    try {
        btn.disabled = true;
        btn.textContent = "Lädt...";

        const response = await fetch("/lieblinge");
        if (!response.ok) {
            throw new Error(`HTTP-Fehler: ${response.status}`);
        }

        const data = await response.json();

        tabelle_container.innerHTML = "";

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
    } catch (error) {
        console.error("Fehler:", error);
        tabelle_container.innerHTML = `<tr><td colspan="2">Fehler: ${error.message}</td></tr>`;
    } finally {
        btn.disabled = false;
        btn.textContent = "Get Lieblinge";
    }
}

document.getElementById("loadBtn").addEventListener("click", createLieblingsessenTable);
