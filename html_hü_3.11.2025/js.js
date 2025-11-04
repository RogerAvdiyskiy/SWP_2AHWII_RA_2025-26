const audio = document.getElementById("BGmusik1");

// Lautstärke auf 0.3 setzen, sobald der Benutzer Play klickt
audio.addEventListener("play", () => {
    audio.volume = 0.5;
});
