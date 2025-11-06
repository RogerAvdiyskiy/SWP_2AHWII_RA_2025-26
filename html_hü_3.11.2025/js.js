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
        anzeige.textContent = `Du hast "${wert}" ausgewählt!`;
        if (wert === "Affe") {
            tierBild.src = "affe.jpeg";
            tierBild.alt = "Bild eines Affen";
        } else if (wert === "Chameleon") {
            tierBild.src = "chameleon.jpeg";
            tierBild.alt = "Bild eines Chamäleons";
        } else if (wert === "Stinkekäfer") {
            tierBild.src = "stinkekäfer.jpeg";
            tierBild.alt = "Bild eines Stinkekäfers";
        }
    } else {
        anzeige.textContent = '';
        tierBild.alt = '';
        tierBild.src = '';
    }
});

