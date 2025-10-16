import { assertEquals } from "https://deno.land/std@0.203.0/assert/assert_equals.ts";
import { isprim } from "./isprim.ts";

const zahlen = [
    [2,"3",5,7,11,13,17,19,23,29],
    [4,6,8,9,10,12,14,"15",16,18]
]

for(let i = 0; i < 10; i++){
    Deno.test("Nummer " + (i + 1) + "   Ist Prim: JA", () => {
    assertEquals(isprim(zahlen[0][i]), true);
    });
}
for(let i = 0; i < 10; i++){
    Deno.test("Nummer " + (i + 1) + "   Ist Prim: NEIN", () => {
    assertEquals(isprim(zahlen[1][i]), false);
    });
}
