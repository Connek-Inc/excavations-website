import * as server from '../entries/pages/mi/admin/blogs/_page.server.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mi/admin/blogs/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/mi/admin/blogs/+page.server.ts";
export const imports = ["_app/immutable/nodes/10.CnqRsiGf.js","_app/immutable/chunks/16.Hg3iES99.js","_app/immutable/chunks/index.xsNOgvTg.js","_app/immutable/chunks/Icon.jKQ0pTKu.js","_app/immutable/chunks/forms.BrdWT2Zf.js","_app/immutable/chunks/entry.iGvxD1w1.js","_app/immutable/chunks/index.DSr7kP-3.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/badge.DuX8-x7k.js","_app/immutable/chunks/lib-utils.CrxRf8It.js","_app/immutable/chunks/file-text.BejrUZ-X.js","_app/immutable/chunks/square-pen.D-L8m8eb.js","_app/immutable/chunks/trash-2.BKEgbIU2.js","_app/immutable/chunks/eye.CFAq_0tv.js"];
export const stylesheets = [];
export const fonts = [];
