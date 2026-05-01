import { r as redirect } from "../../../../../chunks/index.js";
import { d as deleteSession, b as clearSessionCookie } from "../../../../../chunks/session.js";
const load = async () => {
  throw redirect(303, "/mi/admin/login");
};
const actions = {
  default: async ({ cookies, locals }) => {
    if (locals.admin) {
      await deleteSession(locals.admin.sessionId);
    }
    clearSessionCookie(cookies);
    throw redirect(303, "/mi/admin/login");
  }
};
export {
  actions,
  load
};
