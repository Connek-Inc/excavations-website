import { r as redirect } from "./index.js";
import { g as getAdminFromCookies } from "./session.js";
const ADMIN_PATH_PREFIX = "/mi/admin";
const LOGIN_PATH = "/mi/admin/login";
const handle = async ({ event, resolve }) => {
  const { url, cookies } = event;
  if (url.pathname.startsWith(ADMIN_PATH_PREFIX)) {
    const admin = await getAdminFromCookies(cookies);
    event.locals.admin = admin;
    const isLoginPage = url.pathname === LOGIN_PATH;
    if (!admin && !isLoginPage) {
      throw redirect(303, `${LOGIN_PATH}?from=${encodeURIComponent(url.pathname)}`);
    }
    if (admin && isLoginPage) {
      throw redirect(303, "/mi/admin");
    }
  }
  return resolve(event);
};
export {
  handle
};
