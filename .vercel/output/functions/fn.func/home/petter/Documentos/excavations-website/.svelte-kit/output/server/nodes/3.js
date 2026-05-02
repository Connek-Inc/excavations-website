import * as server from '../entries/pages/mi/admin/_layout.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mi/admin/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/mi/admin/+layout.server.ts";
export const imports = ["_app/immutable/nodes/3.DXfpxHEF.js","_app/immutable/chunks/17.Hg3iES99.js","_app/immutable/chunks/index.Bl9WQOpk.js","_app/immutable/chunks/Icon.xIbDICFG.js","_app/immutable/chunks/stores.Cim5FQeR.js","_app/immutable/chunks/entry.Ca6bb6fs.js","_app/immutable/chunks/index.DtHhzqLo.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/forms.BpLafAvx.js","_app/immutable/chunks/store.BpQZICWp.js","_app/immutable/chunks/users.to7SymeT.js","_app/immutable/chunks/file-text.BGkJt40l.js","_app/immutable/chunks/wrench.CA743UTf.js","_app/immutable/chunks/settings.C_ljmf5b.js","_app/immutable/chunks/sparkles.CGigagcQ.js","_app/immutable/chunks/x.D1ubrMWJ.js","_app/immutable/chunks/sun.RvowWV9U.js"];
export const stylesheets = [];
export const fonts = [];
