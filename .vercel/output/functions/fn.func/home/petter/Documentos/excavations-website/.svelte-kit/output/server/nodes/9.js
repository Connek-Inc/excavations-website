import * as server from '../entries/pages/mi/admin/_page.server.ts.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mi/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/mi/admin/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.1VdjBcLT.js","_app/immutable/chunks/16.Hg3iES99.js","_app/immutable/chunks/index.xsNOgvTg.js","_app/immutable/chunks/Icon.jKQ0pTKu.js","_app/immutable/chunks/badge.DuX8-x7k.js","_app/immutable/chunks/lib-utils.CrxRf8It.js","_app/immutable/chunks/sparkles.BA28MIS9.js","_app/immutable/chunks/file-text.BejrUZ-X.js","_app/immutable/chunks/wrench.Ip-vjopd.js","_app/immutable/chunks/users.BuGIrQHk.js","_app/immutable/chunks/mail.CxQNfSe9.js","_app/immutable/chunks/clock.DxYvJLwB.js"];
export const stylesheets = [];
export const fonts = [];
