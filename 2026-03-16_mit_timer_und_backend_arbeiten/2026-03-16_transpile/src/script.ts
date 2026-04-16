import { holeEssen, loescheEssen, convertMs } from "./essen.ts";
import ms from "ms";

type EssenGlobals = typeof globalThis & {
    holeEssen: typeof holeEssen;
    loescheEssen: typeof loescheEssen;
};

const globals = globalThis as EssenGlobals;

globals.holeEssen = holeEssen;
globals.loescheEssen = loescheEssen;

document.getElementById("hole-essen")?.addEventListener("click", holeEssen);
document.getElementById("loesche-essen")?.addEventListener("click", loescheEssen);

document.getElementById("umwandeln")?.addEventListener("click", () => {
    const input = document.getElementById("ms-input") as HTMLInputElement;
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
            const input = document.getElementById("ms-input") as HTMLInputElement;
            if (input) {
                input.value = btn.getAttribute("data-wert") || "";
            }
        });
    });
}

console.log("Script geladen. ms() Version:", ms("1 second"));
