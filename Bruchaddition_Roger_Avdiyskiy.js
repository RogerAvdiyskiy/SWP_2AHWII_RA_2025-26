class Bruch {
    constructor(ganzeZahl = 0, zehler = 0, nenner = 1) {
        this.ganzeZahl = ganzeZahl;
        this.nenner = nenner;
        this.zehler = zehler;

    }

    static string_to_bruch(bruch) {
        //trennung mit split
        let bruchstr = bruch.split("_")
        if (bruchstr[0] == "" || isNaN(Number(bruchstr[0]))) {
            throw new Error("Eingabe muss eine Ganze zahl sein !");
        }
        if (bruchstr.length == 1) {
           let ganzeZahl = (Number(bruchstr[0]))
            return new Bruch(ganzeZahl, 0, 1)
        }
        if (bruchstr.length == 2) {
            //umwandlung in zahlen
            let ganzeZahl = Number(bruchstr[0])
            //trennung zehler und nenner
            let brücher = bruchstr[1].split("/")
            //überprüfen auf richtigkeit
            if (brücher.length != 2) {
                throw new Error("Ein Bruch kann nur ein Zähler und Nenner haben");
            }
            if (brücher[0] == "" || isNaN(Number(brücher[0])) || brücher[1] == "" || isNaN(Number(brücher[1]))) {
                throw new Error("Eingabe muss eine Ganze zahl sein !");
            }
            let zehler = Number(brücher[0])
            let nenner = Number(brücher[1])
            if (nenner == 0) {
                throw new Error("Nenner kann nicht 0 sein !");
            }
            return new Bruch(ganzeZahl, zehler, nenner);
        }
        if (bruchstr.length == 3) {
            throw new Error("Zu viele Teile");
        }
    }
    static ggt(zehler, nenner) {
        if (nenner == 0) {
            return zehler;
        }
        return Bruch.ggt(nenner, zehler % nenner);
    }
    addieren_bruch(zahlen2) {


        //ganze zahl berechnen
        let ganzeZahl = this.ganzeZahl + zahlen2.ganzeZahl;
        //gesamte zehler und nenner berechnen
        let nenner = this.nenner * zahlen2.nenner;
        let zehler = this.zehler * zahlen2.nenner + zahlen2.zehler * this.nenner

        //teiler(kürzer) mit ggt function rausrechnen
        let teiler = Bruch.ggt(zehler, nenner)

        let zehlerE = zehler / teiler;
        let nennerE = nenner / teiler;
        while (zehlerE >= nennerE) {

            ganzeZahl++
            zehlerE = zehlerE - nennerE

        }
        //ausgabe als gemischte zahl
        if (zehlerE === 0) {
            return ganzeZahl;
        }
        return ganzeZahl + " " + zehlerE + "/" + nennerE;


    }


}

try {
    const args = process.argv.slice(2);
    let zahlen1 = Bruch.string_to_bruch(args[0]);
    let zahlen2 = Bruch.string_to_bruch(args[1]);
    let ergebnis = zahlen1.addieren_bruch(zahlen2)
    console.log("Das Ergebnis ist " + ergebnis)
}
catch (e) {
    console.log(e.message);
}


