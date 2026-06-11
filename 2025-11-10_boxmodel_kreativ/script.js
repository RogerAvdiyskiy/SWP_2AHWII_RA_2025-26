const ebMargin = document.querySelector(".eb-margin");
const ebBorder = document.querySelector(".eb-border");
const ebPadding = document.querySelector(".eb-padding");
const ebContent = document.querySelector(".eb-content");

const padSlider = document.getElementById("pad-slider");
const borSlider = document.getElementById("bor-slider");
const marSlider = document.getElementById("mar-slider");
const radSlider = document.getElementById("rad-slider");

const padVal = document.getElementById("pad-val");
const borVal = document.getElementById("bor-val");
const marVal = document.getElementById("mar-val");
const radVal = document.getElementById("rad-val");

function updateBoxmodel() {
    const pad = padSlider.value;
    const bor = borSlider.value;
    const mar = marSlider.value;
    const rad = radSlider.value;

    padVal.textContent = pad;
    borVal.textContent = bor;
    marVal.textContent = mar;
    radVal.textContent = rad;

    ebMargin.style.padding = mar + "px";
    ebBorder.style.padding = bor + "px";
    ebPadding.style.padding = pad + "px";

    const explorerBox = document.getElementById("explorer-box");
    explorerBox.querySelector(".eb-margin").style.borderRadius = rad + "px";
    explorerBox.querySelector(".eb-border").style.borderRadius = Math.max(0, rad - Number(bor)) + "px";
}

padSlider.addEventListener("input", updateBoxmodel);
borSlider.addEventListener("input", updateBoxmodel);
marSlider.addEventListener("input", updateBoxmodel);
radSlider.addEventListener("input", updateBoxmodel);

document.getElementById("reset-btn").addEventListener("click", () => {
    padSlider.value = 20;
    borSlider.value = 4;
    marSlider.value = 20;
    radSlider.value = 12;
    updateBoxmodel();
});

updateBoxmodel();
