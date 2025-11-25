const audio = document.getElementById("BGmusik1");
const selectTier = document.getElementById('Tier-aussuchen');
const anzeige = document.getElementById('anzeige');
const tierBild = document.getElementById('tier_bild');
const audioPlayer = document.getElementById("BGmusik1");
const melone = document.getElementById('melonen-bild');



audio.addEventListener("play", () => {
    audio.volume = 0.5;
});


selectTier.addEventListener('change', () => {
    const wert = selectTier.value;
    if (wert) {
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
    if (audioPlayer.style.display === "none") {
        audioPlayer.style.display = "block";
    } else {
        audioPlayer.style.display = "none";
    }
});


/**
 * @param {string} position
*/
function melonePositionieren(position) {
    if (!melone) {
        console.error('Melonen-Bild-Element nicht gefunden.');
        return;
    }

    let transformValue = 'translateX(0)';

    switch (position) {
        case 'start':
            
            transformValue = 'translateX(0)';
            break;
        case 'center':
            
            transformValue = 'translateX(calc(50vw - 100px))';
            break;
        case 'end':
            
            transformValue = 'translateX(calc(90vw - 200px))';
            break;
    }

    melone.style.transform = transformValue;
}


document.getElementById("knopf1").addEventListener("click", function() {
    melonePositionieren('start');
});

document.getElementById("knopf2").addEventListener("click", function() {
    melonePositionieren('center');
});

document.getElementById("knopf3").addEventListener("click", function() {
    melonePositionieren('end');
});