import { Database } from "@db/sqlite";
export const db = new Database("lieblingsessen.db");

const lieblinge_stmt = db.prepare(
    "select person.name, essen.essen from person join essen on person.lieblingsessen = essen.id order by essen;",
);

export function getLieblinge() {
    return lieblinge_stmt.all() as { name: string; essen: string }[];
}
