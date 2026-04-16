import { Context, Hono } from "hono";
import { serveStatic } from "hono/deno";
import { Database } from "sqlite";

const app = new Hono();

const dbPath = new URL("./lieblingsessen.db", import.meta.url).pathname;
console.log("DB-Pfad:", dbPath);
const db = new Database(dbPath);

const isDev = true;

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

const server = Deno.serve({ port: 0 }, app.fetch);
console.log(`Server läuft auf Port ${server.addr.port}`);
console.log(`Öffne http://localhost:${server.addr.port}`);
