import * as server from '../entries/pages/mi/admin/blogs/_page.server.ts.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mi/admin/blogs/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/mi/admin/blogs/+page.server.ts";
export const imports = ["_app/immutable/nodes/11.vkxdjU3m.js","_app/immutable/chunks/17.Hg3iES99.js","_app/immutable/chunks/index.Bl9WQOpk.js","_app/immutable/chunks/Icon.xIbDICFG.js","_app/immutable/chunks/forms.BpLafAvx.js","_app/immutable/chunks/entry.Ca6bb6fs.js","_app/immutable/chunks/index.DtHhzqLo.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/badge.BLGHVgOS.js","_app/immutable/chunks/lib-utils.CrxRf8It.js","_app/immutable/chunks/file-text.BGkJt40l.js","_app/immutable/chunks/square-pen.C6Dia3CZ.js","_app/immutable/chunks/trash-2.DFhII9re.js","_app/immutable/chunks/eye.B3Qms5jf.js"];
export const stylesheets = [];
export const fonts = [];
