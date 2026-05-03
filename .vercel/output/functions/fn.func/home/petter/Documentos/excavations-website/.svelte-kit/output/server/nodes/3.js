import * as server from '../entries/pages/mi/admin/_layout.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mi/admin/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/mi/admin/+layout.server.ts";
export const imports = ["_app/immutable/nodes/3.C-PxDg3C.js","_app/immutable/chunks/scheduler.J-BEiXcY.js","_app/immutable/chunks/index.DXRlxHrZ.js","_app/immutable/chunks/Icon.CS2gJ8Vc.js","_app/immutable/chunks/stores.D0dQwOpJ.js","_app/immutable/chunks/entry.tnOUaGl8.js","_app/immutable/chunks/index.u5pShCGP.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/forms.Bvc0oCCc.js","_app/immutable/chunks/store.Cdoboeuv.js","_app/immutable/chunks/users.GGVrrQod.js","_app/immutable/chunks/file-text.bBXVLCDW.js","_app/immutable/chunks/wrench.q2FRoL84.js","_app/immutable/chunks/settings._b-Q-YYM.js","_app/immutable/chunks/sparkles.D2W14Y7C.js","_app/immutable/chunks/x.Dx6B5a5E.js","_app/immutable/chunks/sun.CRl6nCY3.js"];
export const stylesheets = [];
export const fonts = [];
