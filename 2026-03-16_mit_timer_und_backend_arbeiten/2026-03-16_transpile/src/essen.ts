import ms from "ms";

export type EssenEintrag = {
    name: string;
    essen: string;
};

let lastLoadTime: number = 0;
let loadCount: number = 0;
let autoRefreshInterval: number | null = null;

function escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function createTabellenMarkup(daten: EssenEintrag[]): string {
    return daten.map(eintrag =>
        `<tr><td>${escapeHtml(eintrag.name)}</td><td>${escapeHtml(eintrag.essen)}</td></tr>`
    ).join("");
}

function updateTimeDisplay(): void {
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

export async function holeEssen(): Promise<void> {
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

        const fetchStart = Date.now();
        const response = await fetch("/essen");

        if (!response.ok) {
            throw new Error(`HTTP-Fehler: ${response.status}`);
        }

        const daten = await response.json() as EssenEintrag[];

        const fetchDuration = Date.now() - fetchStart;
        lastLoadTime = Date.now();
        loadCount++;

        tabelle.innerHTML = createTabellenMarkup(daten);

        if (loadingStatus) {
            loadingStatus.textContent = `${daten.length} Einträge geladen`;
            loadingStatus.className = "status success";
        }

        updateTimeDisplay();
        console.log(`Daten geladen in ${ms(fetchDuration)}`);

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

export function loescheEssen(): void {
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

export function toggleAutoRefresh(): void {
    const btn = document.getElementById("auto-refresh");
    if (autoRefreshInterval !== null) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
        if (btn) btn.textContent = "Auto-Refresh: AUS";
    } else {
        holeEssen();
        autoRefreshInterval = setInterval(holeEssen, 30000);
        if (btn) btn.textContent = "Auto-Refresh: AN (30s)";
    }
}

export function convertMs(input: string): string {
    try {
        const milliseconds = ms(input);
        return `${input} = ${ms(milliseconds)}`;
    } catch {
        return `Ungültige Eingabe: ${input}`;
    }
}

setInterval(updateTimeDisplay, 1000);
