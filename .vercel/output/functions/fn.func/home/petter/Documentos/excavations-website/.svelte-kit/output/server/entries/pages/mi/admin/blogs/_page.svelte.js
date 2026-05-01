import { c as create_ssr_component, v as validate_component, e as escape, d as each, b as add_attribute } from "../../../../../chunks/ssr.js";
import "devalue";
import "../../../../../chunks/client.js";
import { B as Badge } from "../../../../../chunks/badge.js";
import { P as Plus, E as Edit } from "../../../../../chunks/square-pen.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
import { E as Eye } from "../../../../../chunks/eye.js";
import { T as Trash2 } from "../../../../../chunks/trash-2.js";
import { F as FileText } from "../../../../../chunks/file-text.js";
const Eye_off = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"
      }
    ],
    [
      "path",
      {
        "d": "M14.084 14.158a3 3 0 0 1-4.242-4.242"
      }
    ],
    [
      "path",
      {
        "d": "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"
      }
    ],
    ["path", { "d": "m2 2 20 20" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "eye-off" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const EyeOff = Eye_off;
function formatDate(d) {
  if (!d)
    return "—";
  return new Date(d).toLocaleDateString("fr-CA", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="space-y-6"><div class="flex items-center justify-between flex-wrap gap-4"><div><h1 class="text-3xl font-black flex items-center gap-3">${validate_component(FileText, "FileText").$$render($$result, { class: "w-7 h-7 text-[#febd17]" }, {}, {})}
				Articles Blog</h1> <p class="text-gray-500 dark:text-zinc-400 mt-1">${escape(data.items.length)} articles</p></div> <a href="/mi/admin/blogs/new" class="px-5 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-lg shadow-yellow-500/20">${validate_component(Plus, "Plus").$$render($$result, { class: "w-4 h-4" }, {}, {})} Nouvel article</a></div> <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden">${data.items.length === 0 ? `<div class="py-16 text-center">${validate_component(FileText, "FileText").$$render(
    $$result,
    {
      class: "w-12 h-12 text-gray-300 dark:text-zinc-700 mx-auto mb-3"
    },
    {},
    {}
  )} <p class="text-gray-500 dark:text-zinc-500 mb-4" data-svelte-h="svelte-tncbyh">Aucun article pour le moment</p> <a href="/mi/admin/blogs/new" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400">${validate_component(Plus, "Plus").$$render($$result, { class: "w-4 h-4" }, {}, {})} Créer le premier article</a></div>` : `<div class="overflow-x-auto"><table class="w-full text-sm"><thead class="bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800" data-svelte-h="svelte-3a7x99"><tr><th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400">Titre</th> <th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400 hidden md:table-cell">Statut</th> <th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400 hidden lg:table-cell">Vues</th> <th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400 hidden lg:table-cell">Modifié</th> <th class="text-right p-4 font-semibold text-gray-600 dark:text-zinc-400">Actions</th></tr></thead> <tbody>${each(data.items, (b) => {
    return `<tr class="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-950"><td class="p-4"><p class="font-bold">${escape(b.titleFr)}</p> <p class="text-xs text-gray-500 dark:text-zinc-400 font-mono">/${escape(b.slug)}</p></td> <td class="p-4 hidden md:table-cell">${b.published ? `${validate_component(Badge, "Badge").$$render($$result, { variant: "success" }, {}, {
      default: () => {
        return `Publié`;
      }
    })}` : `${validate_component(Badge, "Badge").$$render($$result, { variant: "default" }, {}, {
      default: () => {
        return `Brouillon`;
      }
    })}`}</td> <td class="p-4 hidden lg:table-cell text-gray-500 dark:text-zinc-400">${escape(b.views)}</td> <td class="p-4 hidden lg:table-cell text-gray-500 dark:text-zinc-400 text-xs">${escape(formatDate(b.updatedAt))}</td> <td class="p-4 text-right"><div class="flex justify-end gap-1"><form method="POST" action="?/togglePublish" class="inline"><input type="hidden" name="id"${add_attribute("value", b.id, 0)}> <input type="hidden" name="published"${add_attribute("value", String(b.published), 0)}> <button type="submit" class="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-500/10 text-gray-600 dark:text-zinc-400 hover:text-blue-500" aria-label="Toggle">${b.published ? `${validate_component(EyeOff, "EyeOff").$$render($$result, { class: "w-4 h-4" }, {}, {})}` : `${validate_component(Eye, "Eye").$$render($$result, { class: "w-4 h-4" }, {}, {})}`} </button></form> <a${add_attribute("href", `/mi/admin/blogs/${b.id}`, 0)} class="p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-500/10 text-gray-600 dark:text-zinc-400 hover:text-[#febd17]" aria-label="Modifier">${validate_component(Edit, "Edit").$$render($$result, { class: "w-4 h-4" }, {}, {})}</a> <form method="POST" action="?/delete" class="inline"><input type="hidden" name="id"${add_attribute("value", b.id, 0)}> <button type="submit" class="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/10 text-gray-600 dark:text-zinc-400 hover:text-red-500" aria-label="Supprimer">${validate_component(Trash2, "Trash2").$$render($$result, { class: "w-4 h-4" }, {}, {})} </button></form> </div></td> </tr>`;
  })}</tbody></table></div>`}</div></div>`;
});
export {
  Page as default
};
