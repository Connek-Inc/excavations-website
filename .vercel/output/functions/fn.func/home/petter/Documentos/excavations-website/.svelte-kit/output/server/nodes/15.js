import * as server from '../entries/pages/mi/admin/contacts/_id_/_page.server.ts.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mi/admin/contacts/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/mi/admin/contacts/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/15.CO1IHFkb.js","_app/immutable/chunks/scheduler.J-BEiXcY.js","_app/immutable/chunks/index.DXRlxHrZ.js","_app/immutable/chunks/forms.Bvc0oCCc.js","_app/immutable/chunks/entry.tnOUaGl8.js","_app/immutable/chunks/index.u5pShCGP.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/badge.DEX3pVZL.js","_app/immutable/chunks/lib-utils.CrxRf8It.js","_app/immutable/chunks/textarea.DhNFh9hm.js","_app/immutable/chunks/Icon.CS2gJ8Vc.js","_app/immutable/chunks/label.fXdOqWJA.js","_app/immutable/chunks/arrow-left.DFJ93y60.js","_app/immutable/chunks/trash-2.BdpIUOyp.js","_app/immutable/chunks/mail.DP89PTfj.js","_app/immutable/chunks/phone.CTMo6K68.js","_app/immutable/chunks/globe.CxBd-dfe.js","_app/immutable/chunks/calendar.CXqB4Prz.js"];
export const stylesheets = [];
export const fonts = [];
