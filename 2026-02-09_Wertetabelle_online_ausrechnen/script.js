const startInput = document.getElementById("start");
const endInput = document.getElementById("end");
const stepInput = document.getElementById("step");
const tableBody = document.getElementById("table-body");
const startButton = document.getElementById("starten");
const themeToggle = document.getElementById("theme-toggle");
const toggleChartBtn = document.getElementById("toggle-chart");
const chartContainer = document.getElementById("chart-container");
const canvas = document.getElementById("function-chart");

let chart = null;

function f(x) {
    return x * x;
}
function g(x) {
    return x * x / 4;
}
function h(x) {
    return x * x - 4;
}
function i(x) {
    return (x * x) / 4 - 4;
}

function berechnen() {
    tableBody.innerHTML = "";
    
    const start = parseFloat(startInput.value);
    const end = parseFloat(endInput.value);
    const step = parseFloat(stepInput.value);
    
    if (isNaN(start) || isNaN(end) || isNaN(step) || step <= 0) {
        alert("Bitte geben Sie gültige Zahlen ein. Die Schrittweite muss größer als 0 sein.");
        return;
    }

    // Generate table data
    const tableData = [];
    for (let x = start; x <= end + 0.0001; x += step) {
        const row = document.createElement("tr");
        
        const xCell = document.createElement("td");
        const fCell = document.createElement("td");
        const gCell = document.createElement("td");
        const hCell = document.createElement("td");
        const iCell = document.createElement("td");

        xCell.textContent = x.toFixed(2);
        fCell.textContent = f(x).toFixed(2);
        gCell.textContent = g(x).toFixed(2);
        hCell.textContent = h(x).toFixed(2);
        iCell.textContent = i(x).toFixed(2);

        row.appendChild(xCell);
        row.appendChild(fCell);
        row.appendChild(gCell);
        row.appendChild(hCell);
        row.appendChild(iCell);
    
        tableBody.appendChild(row);
        
        // Collect data for chart
        tableData.push({
            x: x,
            f: f(x),
            g: g(x),
            h: h(x),
            i: i(x)
        });
    }
    
    // Update chart
    updateChart(tableData);
}

// Chart Update Function
function updateChart(data) {
    const isDarkMode = document.documentElement.getAttribute("data-theme") === "dark";
    
    const labels = data.map(point => point.x.toFixed(2));
    
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'f(x) = x²',
                data: data.map(point => point.f),
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 2,
                tension: 0.1
            },
            {
                label: 'g(x) = x² ÷ 4',
                data: data.map(point => point.g),
                borderColor: '#f093fb',
                backgroundColor: 'rgba(240, 147, 251, 0.1)',
                borderWidth: 2,
                tension: 0.1
            },
            {
                label: 'h(x) = x² - 4',
                data: data.map(point => point.h),
                borderColor: '#764ba2',
                backgroundColor: 'rgba(118, 75, 162, 0.1)',
                borderWidth: 2,
                tension: 0.1
            },
            {
                label: 'i(x) = x² ÷ 4 - 4',
                data: data.map(point => point.i),
                borderColor: '#fbbf24',
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
                borderWidth: 2,
                tension: 0.1
            }
        ]
    };
    
    const config = {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: isDarkMode ? '#f7fafc' : '#2d3748',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: isDarkMode ? '#2d3748' : '#ffffff',
                    titleColor: isDarkMode ? '#f7fafc' : '#2d3748',
                    bodyColor: isDarkMode ? '#cbd5e0' : '#4a5568',
                    borderColor: isDarkMode ? '#4a5568' : '#e2e8f0',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'x-Werte',
                        color: isDarkMode ? '#f7fafc' : '#2d3748',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: isDarkMode ? '#cbd5e0' : '#4a5568'
                    },
                    grid: {
                        color: isDarkMode ? '#4a5568' : '#e2e8f0'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'f(x)-Werte',
                        color: isDarkMode ? '#f7fafc' : '#2d3748',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: isDarkMode ? '#cbd5e0' : '#4a5568'
                    },
                    grid: {
                        color: isDarkMode ? '#4a5568' : '#e2e8f0'
                    }
                }
            }
        }
    };
    
    if (chart) {
        chart.destroy();
    }
    
    chart = new Chart(canvas, config);
}

startButton.addEventListener("click", berechnen);

// Dark Mode Toggle
themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    
    // Update chart theme if it exists
    if (chart && tableBody.children.length > 1) {
        const start = parseFloat(startInput.value);
        const end = parseFloat(endInput.value);
        const step = parseFloat(stepInput.value);
        
        const tableData = [];
        for (let x = start; x <= end + 0.0001; x += step) {
            tableData.push({
                x: x,
                f: f(x),
                g: g(x),
                h: h(x),
                i: i(x)
            });
        }
        updateChart(tableData);
    }
});

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

// Chart Toggle
toggleChartBtn.addEventListener("click", () => {
    if (chartContainer.style.display === "none") {
        chartContainer.style.display = "block";
        toggleChartBtn.textContent = "Graphen ausblenden";
        if (chart) {
            chart.resize();
        }
    } else {
        chartContainer.style.display = "none";
        toggleChartBtn.textContent = "Graphen einblenden";
    }
});

