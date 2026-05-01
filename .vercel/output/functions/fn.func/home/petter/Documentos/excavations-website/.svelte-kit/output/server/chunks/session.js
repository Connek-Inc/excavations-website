import { SignJWT, jwtVerify } from "jose";
import { d as db, e as sessions, a as admins } from "./index3.js";
import { eq } from "drizzle-orm";
const SESSION_COOKIE = "mi_admin_session";
const SESSION_DURATION_MS = 1e3 * 60 * 60 * 24 * 7;
function getSecret() {
  return new TextEncoder().encode(
    process.env.JWT_SECRET || "dev-secret-change-in-production-min-32chars"
  );
}
async function createSessionToken(payload) {
  return await new SignJWT({ ...payload }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(getSecret());
}
async function verifySessionToken(token) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}
async function createSession(adminId) {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  await db.insert(sessions).values({ id: sessionId, adminId, expiresAt });
  return { sessionId, expiresAt };
}
async function deleteSession(sessionId) {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}
async function getAdminFromCookies(cookies) {
  const token = cookies.get(SESSION_COOKIE);
  if (!token)
    return null;
  const payload = await verifySessionToken(token);
  if (!payload)
    return null;
  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, payload.sessionId)
  });
  if (!session || session.expiresAt < /* @__PURE__ */ new Date()) {
    if (session)
      await deleteSession(session.id);
    return null;
  }
  const admin = await db.query.admins.findFirst({
    where: eq(admins.id, payload.adminId)
  });
  if (!admin)
    return null;
  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    sessionId: session.id
  };
}
function setSessionCookie(cookies, token, expiresAt) {
  cookies.set(SESSION_COOKIE, token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt
  });
}
function clearSessionCookie(cookies) {
  cookies.delete(SESSION_COOKIE, { path: "/" });
}
export {
  createSessionToken as a,
  clearSessionCookie as b,
  createSession as c,
  deleteSession as d,
  getAdminFromCookies as g,
  setSessionCookie as s
};
