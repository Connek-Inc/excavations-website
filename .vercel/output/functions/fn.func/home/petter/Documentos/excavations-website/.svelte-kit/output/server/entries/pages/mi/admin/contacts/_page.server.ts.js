import { c as contacts, d as db } from "../../../../../chunks/index3.js";
import { or, like, sql, eq, and, desc } from "drizzle-orm";
import { f as fail } from "../../../../../chunks/index.js";
const load = async ({ url }) => {
  const search = url.searchParams.get("q")?.trim() || "";
  const status = url.searchParams.get("status") || "";
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
  const pageSize = 25;
  const conditions = [];
  if (search) {
    const q = `%${search.toLowerCase()}%`;
    conditions.push(
      or(
        like(sql`lower(${contacts.name})`, q),
        like(sql`lower(${contacts.email})`, q),
        like(sql`lower(${contacts.message})`, q),
        like(sql`lower(${contacts.phone})`, q)
      )
    );
  }
  if (status) {
    conditions.push(eq(contacts.status, status));
  }
  const whereClause = conditions.length > 0 ? and(...conditions) : void 0;
  const [items, totalRow] = await Promise.all([
    db.select().from(contacts).where(whereClause).orderBy(desc(contacts.createdAt)).limit(pageSize).offset((page - 1) * pageSize),
    db.select({ c: sql`count(*)` }).from(contacts).where(whereClause)
  ]);
  const total = totalRow[0]?.c ?? 0;
  return {
    items,
    total,
    page,
    pageSize,
    filters: { search, status }
  };
};
const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));
    if (!id)
      return fail(400, { error: "ID manquant" });
    await db.delete(contacts).where(eq(contacts.id, id));
    return { success: true };
  }
};
export {
  actions,
  load
};
