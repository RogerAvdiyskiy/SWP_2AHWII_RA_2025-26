// ============================================
// Hausübung: Der Pizza-Service (Promise-Kette)
// ============================================

function checkOven() {
    return new Promise((resolve, reject) => {
        const isOvenHot = true;
        if (isOvenHot) {
            resolve({ success: true, message: "Ofen ist bereit!" });
        } else {
            reject({ success: false, message: "Ofen ist defekt." });
        }
    });
}

function bakePizza(pizzaName) {
    return new Promise((resolve, reject) => {
        if (!pizzaName || pizzaName.trim() === "") {
            reject("Fehler: Keine Pizza ausgewählt.");
        } else {
            resolve("Pizza " + pizzaName + " ist fertig gebacken!");
        }
    });
}

checkOven()
    .then((result) => {
        console.log(result.message);
        return bakePizza("Margherita");
    })
    .then((msg) => {
        console.log(msg);
    })
    .catch((err) => {
        if (typeof err === "object" && err.message) {
            console.error("Pizza-Bestellung gescheitert:", err.message);
        } else {
            console.error("Pizza-Bestellung gescheitert:", err);
        }
    });
