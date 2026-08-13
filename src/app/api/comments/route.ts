import { getPool } from "@/lib/db";

const MAX_LENGTH = 2000;

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) {
    return Response.json({ error: "missing slug" }, { status: 400 });
  }

  const pool = await getPool();
  const result = await pool.query(
    "SELECT id, body, parent_id, created_at FROM comments WHERE slug = $1 ORDER BY created_at ASC",
    [slug]
  );

  return Response.json({ comments: result.rows });
}

export async function POST(request: Request) {
  const { slug, body, parentId } = await request.json();

  if (typeof slug !== "string" || !slug.trim()) {
    return Response.json({ error: "missing slug" }, { status: 400 });
  }
  if (typeof body !== "string" || !body.trim()) {
    return Response.json({ error: "comment can't be empty" }, { status: 400 });
  }
  if (body.length > MAX_LENGTH) {
    return Response.json({ error: "comment too long" }, { status: 400 });
  }
  if (parentId !== undefined && parentId !== null && !Number.isInteger(parentId)) {
    return Response.json({ error: "invalid parent" }, { status: 400 });
  }

  const pool = await getPool();
  const result = await pool.query(
    "INSERT INTO comments (slug, body, parent_id) VALUES ($1, $2, $3) RETURNING id, body, parent_id, created_at",
    [slug, body.trim(), parentId ?? null]
  );

  return Response.json({ comment: result.rows[0] }, { status: 201 });
}
