import { d as db, f as settings } from "../../../../../chunks/index3.js";
import { eq } from "drizzle-orm";
const load = async () => {
  const all = await db.select().from(settings);
  const map = {};
  for (const s of all)
    map[s.key] = s.value;
  return { settings: map };
};
async function upsert(key, value) {
  const existing = await db.query.settings.findFirst({ where: eq(settings.key, key) });
  if (existing) {
    await db.update(settings).set({ value, updatedAt: /* @__PURE__ */ new Date() }).where(eq(settings.key, key));
  } else {
    await db.insert(settings).values({ key, value });
  }
}
const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    await upsert("site_name", { value: String(data.get("site_name") || "") });
    await upsert("phone", { value: String(data.get("phone") || "") });
    await upsert("email", { value: String(data.get("email") || "") });
    await upsert("address", { value: String(data.get("address") || "") });
    await upsert("social", {
      facebook: String(data.get("facebook") || ""),
      instagram: String(data.get("instagram") || ""),
      linkedin: String(data.get("linkedin") || "")
    });
    await upsert("seo", {
      titleFr: String(data.get("seo_titleFr") || ""),
      titleEn: String(data.get("seo_titleEn") || ""),
      titleEs: String(data.get("seo_titleEs") || ""),
      descriptionFr: String(data.get("seo_descriptionFr") || ""),
      descriptionEn: String(data.get("seo_descriptionEn") || ""),
      descriptionEs: String(data.get("seo_descriptionEs") || ""),
      keywords: String(data.get("seo_keywords") || "")
    });
    return { success: true };
  }
};
export {
  actions,
  load
};
