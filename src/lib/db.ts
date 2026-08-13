import { Pool } from "pg";

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL;

const pool = new Pool({
  connectionString,
  ssl: connectionString?.includes("localhost") ? false : { rejectUnauthorized: false },
});

let initialized = false;

export async function getPool() {
  if (!initialized) {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL,
        body TEXT NOT NULL,
        parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      ALTER TABLE comments ADD COLUMN IF NOT EXISTS parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE;
      CREATE INDEX IF NOT EXISTS comments_slug_idx ON comments (slug);
    `);
    initialized = true;
  }
  return pool;
}

export type Comment = {
  id: number;
  body: string;
  parent_id: number | null;
  created_at: string;
};
