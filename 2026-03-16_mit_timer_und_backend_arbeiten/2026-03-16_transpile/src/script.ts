import { holeEssen, loescheEssen } from "./essen.ts"; // so ists ideal
import ms from "ms";
// import * as essensfunctions from "./essen.ts";  -> neues Objekt mit essensfunctions.holeEssen
// import "./essen.ts"; --> es wird nur das Modul ausgeführt, aber keine Funktionen importiert

type EssenGlobals = typeof globalThis & {
    holeEssen: typeof holeEssen;
    loescheEssen: typeof loescheEssen;
};

const globals = globalThis as EssenGlobals;

globals.holeEssen = holeEssen;
globals.loescheEssen = loescheEssen;

document.getElementById("hole-essen")?.addEventListener("click", holeEssen);
document.getElementById("loesche-essen")?.addEventListener(
    "click",
    loescheEssen,
);

document.getElementById("umwandeln")?.addEventListener("click", () => {
    const input = document.querySelector("input") as HTMLInputElement;
    const ergebnis = document.getElementById("ergebnis");
    if (input && ergebnis) {
        ergebnis.textContent = ms(input.value).toString();
    }
});
