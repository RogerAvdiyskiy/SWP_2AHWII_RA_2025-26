import { Bruch } from "./Bruchaddition_Roger_Avdiyskiy.ts";
import { assertEquals, assertThrows } from "@std/assert";

Deno.test("Addition von zwei ganzen Zahlen", () => {
  const a = Bruch.string_to_bruch("2");
  const b = Bruch.string_to_bruch("3");
  assertEquals(a.addieren_bruch(b), 5);
});

Deno.test("Addition von zwei Brüchen", () => {
  const a = Bruch.string_to_bruch("0_1/2");
  const b = Bruch.string_to_bruch("0_1/3");
  assertEquals(a.addieren_bruch(b), "0 5/6");
});

Deno.test("Addition von gemischten Zahlen", () => {
  const a = Bruch.string_to_bruch("1_1/2");
  const b = Bruch.string_to_bruch("2_2/3");
  assertEquals(a.addieren_bruch(b), "4 1/6");
});

Deno.test("Fehler bei ungültiger Eingabe", () => {
  assertThrows(() => Bruch.string_to_bruch("abc"), Error, "Eingabe muss eine Ganze zahl sein !");
});

Deno.test("Fehler bei Nenner = 0", () => {
  assertThrows(() => Bruch.string_to_bruch("1_2/0"), Error, "Nenner kann nicht 0 sein !");
});
