import { r as redirect } from "../../../../chunks/index.js";
const load = async ({ locals, url }) => {
  if (!locals.admin && url.pathname !== "/mi/admin/login") {
    throw redirect(303, "/mi/admin/login");
  }
  return {
    admin: locals.admin
  };
};
export {
  load
};
