import * as server from '../entries/pages/mi/admin/_page.server.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mi/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/mi/admin/+page.server.ts";
export const imports = ["_app/immutable/nodes/10.C-pwTitw.js","_app/immutable/chunks/17.Hg3iES99.js","_app/immutable/chunks/index.Bl9WQOpk.js","_app/immutable/chunks/Icon.xIbDICFG.js","_app/immutable/chunks/badge.BLGHVgOS.js","_app/immutable/chunks/lib-utils.CrxRf8It.js","_app/immutable/chunks/sparkles.CGigagcQ.js","_app/immutable/chunks/file-text.BGkJt40l.js","_app/immutable/chunks/wrench.CA743UTf.js","_app/immutable/chunks/users.to7SymeT.js","_app/immutable/chunks/mail.DQxWlBTw.js","_app/immutable/chunks/clock.CFLAafy2.js"];
export const stylesheets = [];
export const fonts = [];
