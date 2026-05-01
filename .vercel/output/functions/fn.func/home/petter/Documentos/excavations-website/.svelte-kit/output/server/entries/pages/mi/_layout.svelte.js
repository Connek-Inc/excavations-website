import { c as create_ssr_component } from "../../../chunks/ssr.js";
/* empty css                  */
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1xym0t4_START -->${$$result.title = `<title>Panel - Mini Excavations Érable</title>`, ""}<meta name="robots" content="noindex, nofollow, noarchive, nosnippet"><!-- HEAD_svelte-1xym0t4_END -->`, ""} ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
