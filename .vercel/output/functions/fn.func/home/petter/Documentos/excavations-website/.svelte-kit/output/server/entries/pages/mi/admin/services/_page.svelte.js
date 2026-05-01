import { c as create_ssr_component, v as validate_component, e as escape, d as each, b as add_attribute } from "../../../../../chunks/ssr.js";
import "devalue";
import "../../../../../chunks/client.js";
import { B as Badge } from "../../../../../chunks/badge.js";
import "clsx";
import { W as Wrench } from "../../../../../chunks/wrench.js";
import { P as Plus, E as Edit } from "../../../../../chunks/square-pen.js";
import { S as Star } from "../../../../../chunks/star.js";
import { T as Trash2 } from "../../../../../chunks/trash-2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="space-y-6"><div class="flex items-center justify-between flex-wrap gap-4"><div><h1 class="text-3xl font-black flex items-center gap-3">${validate_component(Wrench, "Wrench").$$render($$result, { class: "w-7 h-7 text-[#febd17]" }, {}, {})}
				Services</h1> <p class="text-gray-500 dark:text-zinc-400 mt-1">${escape(data.items.length)} services</p></div> <button class="px-5 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 flex items-center gap-2 shadow-lg shadow-yellow-500/20">${validate_component(Plus, "Plus").$$render($$result, { class: "w-4 h-4" }, {}, {})} Nouveau service</button></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${each(data.items, (s) => {
      return `<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 space-y-3"><div class="flex items-start justify-between"><div><div class="flex items-center gap-2 mb-2">${s.featured ? `${validate_component(Star, "Star").$$render(
        $$result,
        {
          class: "w-4 h-4 text-[#febd17] fill-[#febd17]"
        },
        {},
        {}
      )}` : ``} ${!s.active ? `${validate_component(Badge, "Badge").$$render($$result, { variant: "default" }, {}, {
        default: () => {
          return `Inactif`;
        }
      })}` : ``}</div> <p class="font-bold">${escape(s.titleFr)}</p> <p class="text-xs text-gray-500 dark:text-zinc-500 font-mono">/${escape(s.slug)}</p></div> <div class="flex gap-1"><button class="p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-500/10 text-gray-600 dark:text-zinc-400 hover:text-[#febd17]" aria-label="Edit">${validate_component(Edit, "Edit").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button> <form method="POST" action="?/delete" class="inline"><input type="hidden" name="id"${add_attribute("value", s.id, 0)}> <button type="submit" class="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/10 text-gray-600 dark:text-zinc-400 hover:text-red-500" aria-label="Delete">${validate_component(Trash2, "Trash2").$$render($$result, { class: "w-4 h-4" }, {}, {})} </button></form> </div></div> ${s.descriptionFr ? `<p class="text-sm text-gray-600 dark:text-zinc-400 line-clamp-2">${escape(s.descriptionFr)}</p>` : ``} <div class="flex items-center gap-2 text-xs text-gray-400 dark:text-zinc-600"><span>Ordre: ${escape(s.displayOrder)}</span> ${s.icon ? `<span>· ${escape(s.icon)}</span>` : ``}</div> </div>`;
    })}</div> ${``}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
