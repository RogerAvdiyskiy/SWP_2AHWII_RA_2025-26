const audio = document.getElementById("BGmusik1");
const selectTier = document.getElementById('Tier-aussuchen');
const anzeige = document.getElementById('anzeige');
const tierBild = document.getElementById('tier_bild');

// Lautstärke auf 0.3 setzen, sobald der Benutzer Play klickt
audio.addEventListener("play", () => {
    audio.volume = 0.5;
});


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

document.getElementById("toggleMusik").addEventListener("click", function () {
    const audioPlayer = document.getElementById("BGmusik1");
    if (audioPlayer.style.display === "none") {
        audioPlayer.style.display = "block"; // Player einblenden
    } else {
        audioPlayer.style.display = "none"; // Player ausblenden
    }
});

