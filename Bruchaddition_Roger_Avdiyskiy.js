x = "5_85/3";
y = "28_7/23"

function string_to_bruch(bruch){
    //trennung mit split
    let bruchstr = bruch.split("_")
    if(bruchstr[0] == "" || isNaN(Number(bruchstr[0]))){
        console.log("Eingabe muss eine Ganze zahl sein !");
        return;
    }
    if(bruchstr.length == 2){
        //umwandlung in zahlen
        let ganzeZahl = Number(bruchstr[0])
        //trennung zehler und nenner
        let brücher = bruchstr[1].split("/")
        //überprüfen auf richtigkeit
        if(brücher.length != 2){
            console.log("Ein Bruch kann nur ein Zähler und Nenner haben");
            return;
        }
        if(brücher[0] == "" || isNaN(Number(brücher[0])) || brücher[1] == "" || isNaN(Number(brücher[1]))){
            console.log("Eingabe muss eine Ganze zahl sein !");
            return;
        }
        let zehler = Number(brücher[0])
        let nenner = Number(brücher[1])
        if(nenner == 0){
            console.log("Nenner kann nicht 0 sein !");
            return;
        }
        return ganzeZahl + "," + zehler + "," + nenner;
    }
    if(bruchstr.length == 3){
        console.log("Zu viele Teile");
        return;
    }
}



function ggt(zaehler, nenner) {
    if (nenner == 0) return zaehler;
    return ggt(nenner, zaehler % nenner);
}

function addieren_bruch(zahlen1,zahlen2){
    //eingabe spliten und in zahlen umwandeln
    let split1 = zahlen1.split(",")
    let split2 = zahlen2.split(",")
    let zehler1 = Number(split1[1])
    let nenner1 = Number(split1[2])
    let zehler2 = Number(split2[1])
    let nenner2 = Number(split2[2])
    //ganze zahl berechnen
    let ganzeZahl = Number(split1[0]) + Number(split2[0])
    //gesamte zehler und nenner berechnen
    let nenner = nenner1 * nenner2
    let zehler = zehler1 * nenner2 + zehler2 * nenner1

    //teiler(kürzer) mit ggt function rausrechnen
    let teiler = ggt(zehler,nenner)

    let zehlerE = zehler/teiler;
    let nennerE = nenner/teiler;
    while(zehlerE >= nennerE){
        
        ganzeZahl++
        zehlerE = zehlerE - nennerE 
        
    }
    //ausgabe als gemischte zahl
    console.log("Die Rechnung ergibt " + ganzeZahl + " Ganze und " + zehlerE + "/" +  nennerE)
    

}

if(string_to_bruch(x)&&string_to_bruch(y)){
    //überprüfen ob ausgaben gültig sind
    addieren_bruch(string_to_bruch(x),string_to_bruch(y))
}


