import { Context, Hono } from "hono";
import { serveStatic } from "hono/deno";
import { Database } from "sqlite";

const app = new Hono();
let db: Database;

try {
  db = new Database("lieblingsessen.db");
} catch (e) {
  console.error("DB-Fehler beim Verbinden:", e);
  Deno.exit(1);
}

app.get("/essen", (c: Context) => {
  try {
    const rows = db.prepare(`
      SELECT person.name, essen.essen
      FROM person
      JOIN essen ON person.lieblingsessen = essen.id
    `).all();
    return c.json(rows);
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    console.error("DB-Fehler:", error.message);
    return c.json({ error: error.message }, 500);
  }
});

app.use("/*", serveStatic({ root: "./static" }));

Deno.serve({ port: 8000 }, app.fetch);
console.log("Server läuft auf http://localhost:8000");
