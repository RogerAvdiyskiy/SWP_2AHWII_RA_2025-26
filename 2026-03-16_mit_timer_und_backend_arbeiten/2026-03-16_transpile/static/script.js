import ms from "https://cdn.jsdelivr.net/npm/ms@2.1.3/+esm";

let lastLoadTime = 0;
let loadCount = 0;

function createTabellenMarkup(daten) {
    return daten.map(eintrag =>
        `<tr><td>${escapeHtml(eintrag.name)}</td><td>${escapeHtml(eintrag.essen)}</td></tr>`
    ).join("");
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function updateTimeDisplay() {
    const timeDisplay = document.getElementById("last-load-time");
    const loadCountDisplay = document.getElementById("load-count");
    
    if (timeDisplay && lastLoadTime > 0) {
        const elapsed = Date.now() - lastLoadTime;
        timeDisplay.textContent = `vor ${ms(elapsed)} geladen`;
    }
    
    if (loadCountDisplay) {
        loadCountDisplay.textContent = `${loadCount} mal geladen`;
    }
}

async function holeEssen() {
    const tabelle = document.getElementById("tabelle");
    const loadingStatus = document.getElementById("loading-status");
    
    if (!tabelle) {
        throw new Error("Element with id 'tabelle' not found");
    }

    try {
        if (loadingStatus) {
            loadingStatus.textContent = "Lädt...";
            loadingStatus.className = "status loading";
        }
        
        tabelle.innerHTML = '<tr><td colspan="2">Lade Daten...</td></tr>';

        const response = await fetch("/essen");
        const daten = await response.json();
        
        lastLoadTime = Date.now();
        loadCount++;
        
        tabelle.innerHTML = createTabellenMarkup(daten);
        
        if (loadingStatus) {
            loadingStatus.textContent = `${daten.length} Einträge geladen`;
            loadingStatus.className = "status success";
        }
        
        updateTimeDisplay();
        
        const elapsed = Date.now() - lastLoadTime;
        console.log(`Daten geladen in ${ms(elapsed)}`);
        
    } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        console.info("Fehler beim Laden der Daten", err);
        
        if (loadingStatus) {
            loadingStatus.textContent = `Fehler: ${err.message}`;
            loadingStatus.className = "status error";
        }
        
        tabelle.innerHTML = `<tr><td colspan="2">Fehler: ${err.message}</td></tr>`;
    }
}

function loescheEssen() {
    const tabelle = document.getElementById("tabelle");
    const loadingStatus = document.getElementById("loading-status");
    const timeDisplay = document.getElementById("last-load-time");
    
    if (!tabelle) {
        throw new Error("Element with id 'tabelle' not found");
    }

    tabelle.innerHTML = "";
    
    if (loadingStatus) {
        loadingStatus.textContent = "Liste gelöscht";
        loadingStatus.className = "status";
    }
    
    if (timeDisplay) {
        timeDisplay.textContent = "";
    }
}

function convertMs(input) {
    try {
        const milliseconds = ms(input);
        return `${input} = ${ms(milliseconds)}`;
    } catch {
        return `Ungültige Eingabe: ${input}`;
    }
}

document.getElementById("hole-essen")?.addEventListener("click", holeEssen);
document.getElementById("loesche-essen")?.addEventListener("click", loescheEssen);

document.getElementById("umwandeln")?.addEventListener("click", () => {
    const input = document.getElementById("ms-input");
    const ergebnis = document.getElementById("ergebnis");
    if (input && ergebnis) {
        ergebnis.textContent = convertMs(input.value);
    }
});

const msBeispiele = [
    "2 days",
    "1d",
    "24h",
    "1 year",
    "30 seconds",
    "5m",
    "1h 30m"
];

const beispieleContainer = document.getElementById("ms-beispiele");
if (beispieleContainer) {
    beispieleContainer.innerHTML = "<strong>Beispiele:</strong> " + 
        msBeispiele.map(b => `<button class="beispiel-btn" data-wert="${b}">${b}</button>`).join(" ");
    
    beispieleContainer.querySelectorAll(".beispiel-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const input = document.getElementById("ms-input");
            if (input) {
                input.value = btn.getAttribute("data-wert") || "";
            }
        });
    });
}

console.log("Script geladen. ms() Version:", ms("1 second"));

window.holeEssen = holeEssen;
