import * as server from '../entries/pages/mi/admin/blogs/_page.server.ts.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mi/admin/blogs/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/mi/admin/blogs/+page.server.ts";
export const imports = ["_app/immutable/nodes/11.DwuCTi1M.js","_app/immutable/chunks/scheduler.J-BEiXcY.js","_app/immutable/chunks/index.DXRlxHrZ.js","_app/immutable/chunks/Icon.CS2gJ8Vc.js","_app/immutable/chunks/forms.Bvc0oCCc.js","_app/immutable/chunks/entry.tnOUaGl8.js","_app/immutable/chunks/index.u5pShCGP.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/badge.DEX3pVZL.js","_app/immutable/chunks/lib-utils.CrxRf8It.js","_app/immutable/chunks/file-text.bBXVLCDW.js","_app/immutable/chunks/square-pen.DUHQO1_m.js","_app/immutable/chunks/trash-2.BdpIUOyp.js","_app/immutable/chunks/eye.Bk-q_MBG.js"];
export const stylesheets = [];
export const fonts = [];
