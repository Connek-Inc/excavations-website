import { d as db, b as blogs } from "../../../../../chunks/index3.js";
import { desc, eq } from "drizzle-orm";
import { f as fail } from "../../../../../chunks/index.js";
const load = async () => {
  const items = await db.select().from(blogs).orderBy(desc(blogs.createdAt));
  return { items };
};
const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));
    if (!id)
      return fail(400, { error: "ID manquant" });
    await db.delete(blogs).where(eq(blogs.id, id));
    return { success: true };
  },
  togglePublish: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));
    const published = data.get("published") === "true";
    await db.update(blogs).set({
      published: !published,
      publishedAt: !published ? /* @__PURE__ */ new Date() : null,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(blogs.id, id));
    return { success: true };
  }
};
export {
  actions,
  load
};
