/**
 * Seed Turso DB with siteConfig.json
 *
 * Usage:
 *   TURSO_DATABASE_URL=libsql://your-db.turso.io TURSO_AUTH_TOKEN=xxx npx tsx scripts/seed-turso.ts
 *   TURSO_DATABASE_URL=file:local.db npx tsx scripts/seed-turso.ts
 */

import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { join } from "path";

const url = process.env.TURSO_DATABASE_URL;
if (!url) {
  console.error("Error: TURSO_DATABASE_URL environment variable is required");
  process.exit(1);
}

const client = createClient({
  url,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function seed() {
  // 1. Create table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS site_config (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      data TEXT NOT NULL,
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);
  console.log("Table site_config created (or already exists).");

  // 2. Read JSON
  const jsonPath = join(process.cwd(), "src", "data", "siteConfig.json");
  const raw = readFileSync(jsonPath, "utf-8");
  const parsed = JSON.parse(raw);
  const data = JSON.stringify(parsed);

  // 3. Insert or replace
  await client.execute({
    sql: "INSERT OR REPLACE INTO site_config (id, data, updated_at) VALUES (1, ?, datetime('now'))",
    args: [data],
  });

  console.log(`Seeded site_config with ${data.length} bytes of JSON.`);
  console.log("Done!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
