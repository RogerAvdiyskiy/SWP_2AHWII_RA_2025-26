const colsSlider = document.getElementById("cols-slider");
const rowsSlider = document.getElementById("rows-slider");
const gapSlider = document.getElementById("gap-slider");
const colsVal = document.getElementById("cols-val");
const rowsVal = document.getElementById("rows-val");
const gapVal = document.getElementById("gap-val");
const builderGrid = document.getElementById("builder-grid");

function buildGrid() {
    const cols = Number(colsSlider.value);
    const rows = Number(rowsSlider.value);
    const gap = Number(gapSlider.value);

    colsVal.textContent = cols;
    rowsVal.textContent = rows;
    gapVal.textContent = gap;

    builderGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    builderGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    builderGrid.style.gap = gap + "px";

    const total = cols * rows;
    builderGrid.innerHTML = "";

    for (let i = 0; i < total; i++) {
        const cell = document.createElement("div");
        cell.className = "builder-cell";
        cell.textContent = `Zelle ${i + 1}`;
        builderGrid.appendChild(cell);
    }
}

colsSlider.addEventListener("input", buildGrid);
rowsSlider.addEventListener("input", buildGrid);
gapSlider.addEventListener("input", buildGrid);

buildGrid();
