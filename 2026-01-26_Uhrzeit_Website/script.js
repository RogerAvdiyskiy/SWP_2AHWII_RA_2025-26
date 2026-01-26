const timeDiv = document.getElementById("zeit");
const zeitknopf = document.getElementById("zeitknopf");
let intervalId; 



function updateTime() {
    const now = new Date();
    timeDiv.textContent = now.toLocaleTimeString();
}

function startClock() {
    if (!intervalId) { 
        intervalId = setInterval(updateTime, 100);
        zeitknopf.textContent = "Zeit anhalten"; 
    }
}

function stopClock() {
    clearInterval(intervalId);
    intervalId = null; 
    zeitknopf.textContent = "Zeit fortsetzen";
}

zeitknopf.addEventListener("click", () => {
    if (intervalId) {
        stopClock();
    } else {
        startClock();
    }
});

startClock();