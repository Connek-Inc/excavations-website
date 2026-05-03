import * as server from '../entries/pages/mi/admin/settings/_page.server.ts.js';

export const index = 19;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mi/admin/settings/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/mi/admin/settings/+page.server.ts";
export const imports = ["_app/immutable/nodes/19.Cd3Llg78.js","_app/immutable/chunks/scheduler.J-BEiXcY.js","_app/immutable/chunks/index.DXRlxHrZ.js","_app/immutable/chunks/Icon.CS2gJ8Vc.js","_app/immutable/chunks/forms.Bvc0oCCc.js","_app/immutable/chunks/entry.tnOUaGl8.js","_app/immutable/chunks/index.u5pShCGP.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/input.Cz6hPbig.js","_app/immutable/chunks/lib-utils.CrxRf8It.js","_app/immutable/chunks/label.fXdOqWJA.js","_app/immutable/chunks/textarea.DhNFh9hm.js","_app/immutable/chunks/settings._b-Q-YYM.js","_app/immutable/chunks/globe.CxBd-dfe.js"];
export const stylesheets = [];
export const fonts = [];
