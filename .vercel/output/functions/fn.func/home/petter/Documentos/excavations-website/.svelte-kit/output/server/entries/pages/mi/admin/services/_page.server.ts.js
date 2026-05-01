import { d as db, s as services } from "../../../../../chunks/index3.js";
import { asc, eq } from "drizzle-orm";
import { f as fail } from "../../../../../chunks/index.js";
const load = async () => {
  const items = await db.select().from(services).orderBy(asc(services.displayOrder));
  return { items };
};
const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const slug = String(data.get("slug") || "").trim();
    const titleFr = String(data.get("titleFr") || "").trim();
    if (!slug || !titleFr)
      return fail(400, { error: "Slug et titre FR requis" });
    const exists = await db.query.services.findFirst({ where: eq(services.slug, slug) });
    if (exists)
      return fail(400, { error: "Slug déjà utilisé" });
    await db.insert(services).values({
      slug,
      titleFr,
      titleEn: String(data.get("titleEn") || "") || null,
      titleEs: String(data.get("titleEs") || "") || null,
      descriptionFr: String(data.get("descriptionFr") || "") || null,
      descriptionEn: String(data.get("descriptionEn") || "") || null,
      descriptionEs: String(data.get("descriptionEs") || "") || null,
      icon: String(data.get("icon") || "") || null,
      displayOrder: Number(data.get("displayOrder")) || 0,
      featured: data.get("featured") === "true",
      active: data.get("active") !== "false"
    });
    return { success: true };
  },
  update: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));
    if (!id)
      return fail(400, { error: "ID manquant" });
    await db.update(services).set({
      titleFr: String(data.get("titleFr") || ""),
      titleEn: String(data.get("titleEn") || "") || null,
      titleEs: String(data.get("titleEs") || "") || null,
      descriptionFr: String(data.get("descriptionFr") || "") || null,
      descriptionEn: String(data.get("descriptionEn") || "") || null,
      descriptionEs: String(data.get("descriptionEs") || "") || null,
      icon: String(data.get("icon") || "") || null,
      displayOrder: Number(data.get("displayOrder")) || 0,
      featured: data.get("featured") === "true",
      active: data.get("active") === "true",
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(services.id, id));
    return { success: true };
  },
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));
    if (!id)
      return fail(400, { error: "ID manquant" });
    await db.delete(services).where(eq(services.id, id));
    return { success: true };
  }
};
export {
  actions,
  load
};
