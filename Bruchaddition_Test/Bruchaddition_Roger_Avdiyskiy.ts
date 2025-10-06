class Bruch {
  ganzeZahl: number;
  zehler: number;
  nenner: number;

  constructor(ganzeZahl = 0, zehler = 0, nenner = 1) {
    this.ganzeZahl = ganzeZahl;
    this.zehler = zehler;
    this.nenner = nenner;
  }

  static string_to_bruch(bruch: string): Bruch {
    const bruchstr = bruch.split("_");

    if (bruchstr[0] === "" || isNaN(Number(bruchstr[0]))) {
      throw new Error("Eingabe muss eine Ganze zahl sein !");
    }

    if (bruchstr.length === 1) {
      const ganzeZahl = Number(bruchstr[0]);
      return new Bruch(ganzeZahl, 0, 1);
    }

    if (bruchstr.length === 2) {
      const ganzeZahl = Number(bruchstr[0]);
      const bruecher = bruchstr[1].split("/");

      if (bruecher.length !== 2) {
        throw new Error("Ein Bruch kann nur ein Zähler und Nenner haben");
      }

      if (
        bruecher[0] === "" || isNaN(Number(bruecher[0])) ||
        bruecher[1] === "" || isNaN(Number(bruecher[1]))
      ) {
        throw new Error("Eingabe muss eine Ganze zahl sein !");
      }

      const zehler = Number(bruecher[0]);
      const nenner = Number(bruecher[1]);

      if (nenner === 0) {
        throw new Error("Nenner kann nicht 0 sein !");
      }

      return new Bruch(ganzeZahl, zehler, nenner);
    }

    if (bruchstr.length === 3) {
      throw new Error("Zu viele Teile");
    }

    throw new Error("Ungültiges Format");
  }

  static ggt(zehler: number, nenner: number): number {
    if (nenner === 0) {
      return zehler;
    }
    return Bruch.ggt(nenner, zehler % nenner);
  }

  addieren_bruch(zahlen2: Bruch): string | number {
    let ganzeZahl = this.ganzeZahl + zahlen2.ganzeZahl;
    const nenner = this.nenner * zahlen2.nenner;
    const zehler = this.zehler * zahlen2.nenner + zahlen2.zehler * this.nenner;

    const teiler = Bruch.ggt(zehler, nenner);

    let zehlerE = zehler / teiler;
    const nennerE = nenner / teiler;

    while (zehlerE >= nennerE) {
      ganzeZahl++;
      zehlerE -= nennerE;
    }

    if (zehlerE === 0) {
      return ganzeZahl;
    }

    return ganzeZahl + "_" + zehlerE + "/" + nennerE;
  }
}

export { Bruch };
