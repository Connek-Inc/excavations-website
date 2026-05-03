import * as server from '../entries/pages/mi/admin/blogs/_id_/_page.server.ts.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mi/admin/blogs/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/mi/admin/blogs/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/12.CUFtI7dn.js","_app/immutable/chunks/scheduler.J-BEiXcY.js","_app/immutable/chunks/index.DXRlxHrZ.js","_app/immutable/chunks/BlogEditor.iBrDm1r4.js","_app/immutable/chunks/Icon.CS2gJ8Vc.js","_app/immutable/chunks/forms.Bvc0oCCc.js","_app/immutable/chunks/entry.tnOUaGl8.js","_app/immutable/chunks/index.u5pShCGP.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/input.Cz6hPbig.js","_app/immutable/chunks/lib-utils.CrxRf8It.js","_app/immutable/chunks/label.fXdOqWJA.js","_app/immutable/chunks/textarea.DhNFh9hm.js","_app/immutable/chunks/arrow-left.DFJ93y60.js","_app/immutable/chunks/globe.CxBd-dfe.js"];
export const stylesheets = [];
export const fonts = [];
