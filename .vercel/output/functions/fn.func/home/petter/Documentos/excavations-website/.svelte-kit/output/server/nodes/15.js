import * as server from '../entries/pages/mi/admin/contacts/_id_/_page.server.ts.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mi/admin/contacts/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/mi/admin/contacts/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/15.B8SJ-FS1.js","_app/immutable/chunks/17.Hg3iES99.js","_app/immutable/chunks/index.Bl9WQOpk.js","_app/immutable/chunks/forms.B2aXqdJn.js","_app/immutable/chunks/entry.KefXZ3f0.js","_app/immutable/chunks/index.DtHhzqLo.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/badge.BLGHVgOS.js","_app/immutable/chunks/lib-utils.CrxRf8It.js","_app/immutable/chunks/textarea.LPgSOpZT.js","_app/immutable/chunks/Icon.xIbDICFG.js","_app/immutable/chunks/label.DUU4snNT.js","_app/immutable/chunks/arrow-left.BdFA2RWC.js","_app/immutable/chunks/trash-2.DFhII9re.js","_app/immutable/chunks/mail.DQxWlBTw.js","_app/immutable/chunks/phone.M1kUGOmK.js","_app/immutable/chunks/globe.DaS71LgU.js","_app/immutable/chunks/calendar.C8KgV9Pz.js"];
export const stylesheets = [];
export const fonts = [];
