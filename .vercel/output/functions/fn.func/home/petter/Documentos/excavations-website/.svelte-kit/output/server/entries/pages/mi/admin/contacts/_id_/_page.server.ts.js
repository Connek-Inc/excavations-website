import { e as error, r as redirect } from "../../../../../../chunks/index.js";
import { d as db, c as contacts } from "../../../../../../chunks/index3.js";
import { eq } from "drizzle-orm";
const load = async ({ params }) => {
  const id = Number(params.id);
  if (!id)
    throw error(400, "Invalid id");
  const contact = await db.query.contacts.findFirst({
    where: eq(contacts.id, id)
  });
  if (!contact)
    throw error(404, "Contact not found");
  return { contact };
};
const actions = {
  update: async ({ request, params }) => {
    const id = Number(params.id);
    const data = await request.formData();
    const status = String(data.get("status") || "new");
    const notes = String(data.get("notes") || "");
    await db.update(contacts).set({ status, notes, updatedAt: /* @__PURE__ */ new Date() }).where(eq(contacts.id, id));
    return { success: true };
  },
  delete: async ({ params }) => {
    const id = Number(params.id);
    await db.delete(contacts).where(eq(contacts.id, id));
    throw redirect(303, "/mi/admin/contacts");
  }
};
export {
  actions,
  load
};
