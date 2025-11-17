const audio = document.getElementById("BGmusik1");

// Lautstärke auf 0.3 setzen, sobald der Benutzer Play klickt
audio.addEventListener("play", () => {
    audio.volume = 0.5;
});

const selectTier = document.getElementById('Tier-aussuchen');
const anzeige = document.getElementById('anzeige');
const tierBild = document.getElementById('tier_bild');

selectTier.addEventListener('change', () => {
    const wert = selectTier.value;
    if (wert) {
        //anzeige.textContent = `Du hast "${wert}" ausgewählt!`;
        if (wert === "Affe") {
            tierBild.src = "affe.jpeg";
            tierBild.alt = "Bild eines Affen";
            anzeige.textContent = "Affenstark!"
            anzeige.style.border = "3px solid rgb(132, 64, 64)";
            anzeige.style.backgroundColor = "rgb(132, 64, 64)";
        } else if (wert === "Chameleon") {
            tierBild.src = "chameleon.jpeg";
            tierBild.alt = "Bild eines Chamäleons";
            anzeige.textContent = "Abwechslungsreich!"
            anzeige.style.border = "3px solid lightgreen"
            anzeige.style.backgroundColor = "lightgreen";
        } else if (wert === "Stinkekäfer") {
            tierBild.src = "stinkekäfer.jpeg";
            tierBild.alt = "Bild eines Stinkekäfers";
            anzeige.textContent = "Das würd mir stinken!"
            anzeige.style.border = "3px solid lightyellow";
            anzeige.style.backgroundColor = "lightyellow";
        }
    } else {
        anzeige.textContent = '';
        tierBild.alt = '';
        tierBild.src = '';
    }
});

