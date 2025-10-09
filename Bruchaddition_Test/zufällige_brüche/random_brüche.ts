import {Bruch} from "../Bruchaddition_Roger_Avdiyskiy.ts";
import { assertEquals,  } from "@std/assert";
for(let i = 0; i < 15; i++){
    let zehler1 = Math.ceil(Math.random() * 100);
    let nenner1 = Math.ceil(Math.random() * 100);
    let nenner2 = nenner1;

    //let subtraktion = 0;
    /*if (zehler1 === 1){
        subtraktion = 0;
    }
    else{
        while(subtraktion === 0 || subtraktion > zehler1){
        subtraktion = zehler1 -Math.ceil(Math.random() * 15)
        }
    }*/
    let zehler2 = Math.ceil(Math.random() * (15))
    let zehler3 = zehler1 - zehler2;
    let erweiterer = 0;
    erweiterer = Math.ceil(Math.random() * 20);
    zehler3 *= erweiterer;
    nenner1 *= erweiterer;
    erweiterer = Math.ceil(Math.random() * 20);
    zehler2 *= erweiterer;
    nenner2 *= erweiterer;
    //console.log("Bruch 1 und 2 " + zehler3 + "/" + nenner1 + "  " + zehler2 + "/" + nenner2);

    const b1 = new Bruch(0 , zehler3 , nenner1);
    const b2 = new Bruch(0 , zehler2 , nenner2);
    const zwischen_variabel = b1.addieren_bruch(b2);
    //console.log("Das Ergebnis ist " + zwischen_variabel); 
    const ergebnis = String(zwischen_variabel);
    const bruch_ergebnis = Bruch.string_to_bruch(ergebnis);
    const vergleich = bruch_ergebnis.ganzeZahl + "_" + bruch_ergebnis.zehler + "/" + bruch_ergebnis.nenner;



    Deno.test("Addieren von zufälligen Brüchen", () => {
        
    assertEquals(zwischen_variabel, vergleich);
    });
}

    

