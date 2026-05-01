import * as server from '../entries/pages/mi/admin/_layout.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mi/admin/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/mi/admin/+layout.server.ts";
export const imports = ["_app/immutable/nodes/3.GQ7zb8zM.js","_app/immutable/chunks/16.Hg3iES99.js","_app/immutable/chunks/index.xsNOgvTg.js","_app/immutable/chunks/Icon.jKQ0pTKu.js","_app/immutable/chunks/stores.sHVk2tOc.js","_app/immutable/chunks/entry.iGvxD1w1.js","_app/immutable/chunks/index.DSr7kP-3.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/forms.BrdWT2Zf.js","_app/immutable/chunks/store.C4YmkljO.js","_app/immutable/chunks/users.BuGIrQHk.js","_app/immutable/chunks/file-text.BejrUZ-X.js","_app/immutable/chunks/wrench.Ip-vjopd.js","_app/immutable/chunks/settings.DHnpkALD.js","_app/immutable/chunks/sparkles.BA28MIS9.js","_app/immutable/chunks/x.B5UiUbMx.js","_app/immutable/chunks/sun.B5csh7qj.js"];
export const stylesheets = [];
export const fonts = [];
