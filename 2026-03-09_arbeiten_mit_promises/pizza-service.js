let isOvenHot = true;
const orderHistory = [];

function log(message, type = "info") {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    orderHistory.push({ timestamp, message, type });
    switch (type) {
        case "error": console.error(logEntry); break;
        case "success": console.log(`✅ ${logEntry}`); break;
        case "warning": console.warn(`⚠️ ${logEntry}`); break;
        default: console.log(logEntry);
    }
}

function checkOven() {
    return new Promise((resolve, reject) => {
        log("Prüfe Ofenstatus...");
        setTimeout(() => {
            if (isOvenHot) {
                resolve({ success: true, message: "Ofen ist bereit!" });
            } else {
                reject({ success: false, message: "Ofen ist defekt." });
            }
        }, 500);
    });
}

function bakePizza(pizzaName) {
    return new Promise((resolve, reject) => {
        log(`Bestelle Pizza: ${pizzaName}...`);
        if (!pizzaName || pizzaName.trim() === "") {
            reject({ success: false, message: "Fehler: Keine Pizza ausgewählt." });
            return;
        }
        const bakingTime = Math.floor(Math.random() * 2000) + 1000;
        setTimeout(() => {
            resolve(`Pizza ${pizzaName} ist fertig gebacken!`);
        }, bakingTime);
    });
}

function deliverPizza(pizzaMsg) {
    return new Promise((resolve) => {
        log("Lieferung wird vorbereitet...", "info");
        const deliveryTime = Math.floor(Math.random() * 3000) + 2000;
        setTimeout(() => {
            resolve(`${pizzaMsg} | Lieferung abgeschlossen!`);
        }, deliveryTime);
    });
}

function updateOrderDisplay() {
    console.log("\n=== Bestellhistorie ===");
    orderHistory.forEach((entry, i) => {
        console.log(`${i + 1}. [${entry.type}] ${entry.message}`);
    });
    console.log(`\nGesamt: ${orderHistory.length} Einträge`);
}

function main() {
    log("=== Pizza-Service gestartet ===", "info");

    checkOven()
        .then((result) => {
            log(result.message, "success");
            return bakePizza("Margherita");
        })
        .then((msg) => {
            log(msg, "success");
            return deliverPizza(msg);
        })
        .then((finalMsg) => {
            log(finalMsg, "success");
            log("=== Bestellung erfolgreich! ===", "success");
            updateOrderDisplay();
        })
        .catch((err) => {
            if (typeof err === "object" && err.message) {
                log(`Fehler: ${err.message}`, "error");
            } else {
                log(`Pizza-Bestellung gescheitert: ${err}`, "error");
            }
            log("=== Service nicht verfügbar ===", "error");
            updateOrderDisplay();
        });
}

function testeSzenarien() {
    console.log("\n" + "=".repeat(50));
    console.log("TESTE ALLE SZENARIEN");
    console.log("=".repeat(50) + "\n");

    console.log("--- Szenario 1: Ofen kalt ---");
    isOvenHot = false;

    checkOven()
        .then(() => {
            console.log("Unerwartet: Ofen ist heiss");
        })
        .catch((err) => {
            console.log("Erwartet fehlgeschlagen:", err.message);
        })
        .finally(() => {
            isOvenHot = true;
        });
}

main();
