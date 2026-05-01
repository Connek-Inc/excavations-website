import { c as create_ssr_component, v as validate_component, a as subscribe, e as escape, d as each, b as add_attribute } from "../../../../../chunks/ssr.js";
import "../../../../../chunks/client.js";
import { p as page } from "../../../../../chunks/stores.js";
import { B as Badge } from "../../../../../chunks/badge.js";
import { I as Input } from "../../../../../chunks/input.js";
import "devalue";
import { I as Icon } from "../../../../../chunks/Icon.js";
import { U as Users } from "../../../../../chunks/users.js";
import { M as Mail } from "../../../../../chunks/mail.js";
import { P as Phone } from "../../../../../chunks/phone.js";
import { E as Eye } from "../../../../../chunks/eye.js";
import { T as Trash2 } from "../../../../../chunks/trash-2.js";
const Funnel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "funnel" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Filter = Funnel;
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "m21 21-4.34-4.34" }],
    ["circle", { "cx": "11", "cy": "11", "r": "8" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "search" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Search$1 = Search;
function statusBadge(status) {
  const map = {
    new: { variant: "warning", label: "Nouveau" },
    contacted: { variant: "info", label: "Contacté" },
    quoted: { variant: "info", label: "Devis" },
    won: { variant: "success", label: "Gagné" },
    lost: { variant: "danger", label: "Perdu" },
    archived: { variant: "default", label: "Archivé" }
  };
  return map[status] ?? { variant: "default", label: status };
}
function formatDate(d) {
  return new Date(d).toLocaleString("fr-CA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let totalPages;
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { data } = $$props;
  let searchValue = data.filters.search;
  data.filters.status;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    totalPages = Math.max(1, Math.ceil(data.total / data.pageSize));
    $$rendered = `<div class="space-y-6"> <div><h1 class="text-3xl font-black flex items-center gap-3">${validate_component(Users, "Users").$$render($$result, { class: "w-7 h-7 text-[#febd17]" }, {}, {})}
			Contacts / Leads</h1> <p class="text-gray-500 dark:text-zinc-400 mt-1">${escape(data.total)} contact${escape(data.total !== 1 ? "s" : "")} au total</p></div>  <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row gap-3"><div class="relative flex-1">${validate_component(Search$1, "Search").$$render(
      $$result,
      {
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10"
      },
      {},
      {}
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        placeholder: "Rechercher par nom, email, téléphone...",
        class: "pl-10",
        value: searchValue
      },
      {
        value: ($$value) => {
          searchValue = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <select class="h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#febd17]"><option value="" data-svelte-h="svelte-sdq8id">Tous les statuts</option><option value="new" data-svelte-h="svelte-1hayaxj">Nouveau</option><option value="contacted" data-svelte-h="svelte-1bn8oe6">Contacté</option><option value="quoted" data-svelte-h="svelte-1h035u3">Devis envoyé</option><option value="won" data-svelte-h="svelte-14laspa">Gagné</option><option value="lost" data-svelte-h="svelte-30xs4y">Perdu</option><option value="archived" data-svelte-h="svelte-r5kcv0">Archivé</option></select> <button class="px-6 py-2 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2">${validate_component(Filter, "Filter").$$render($$result, { class: "w-4 h-4" }, {}, {})} Filtrer</button></div>  <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden">${data.items.length === 0 ? `<div class="py-16 text-center">${validate_component(Users, "Users").$$render(
      $$result,
      {
        class: "w-12 h-12 text-gray-300 dark:text-zinc-700 mx-auto mb-3"
      },
      {},
      {}
    )} <p class="text-gray-500 dark:text-zinc-500" data-svelte-h="svelte-wq8dhb">Aucun contact trouvé</p></div>` : `<div class="overflow-x-auto"><table class="w-full text-sm"><thead class="bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800" data-svelte-h="svelte-vh6u70"><tr><th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400">Contact</th> <th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400 hidden md:table-cell">Service</th> <th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400">Statut</th> <th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400 hidden lg:table-cell">Date</th> <th class="text-right p-4 font-semibold text-gray-600 dark:text-zinc-400">Actions</th></tr></thead> <tbody>${each(data.items, (c) => {
      let badge = statusBadge(c.status);
      return ` <tr class="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-950 transition-colors"><td class="p-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">${escape(c.name[0]?.toUpperCase())}</div> <div class="min-w-0"><p class="font-bold truncate">${escape(c.name)}</p> <p class="text-xs text-gray-500 dark:text-zinc-400 truncate flex items-center gap-1">${validate_component(Mail, "Mail").$$render($$result, { class: "w-3 h-3" }, {}, {})} ${escape(c.email)}</p> ${c.phone ? `<p class="text-xs text-gray-500 dark:text-zinc-400 truncate flex items-center gap-1">${validate_component(Phone, "Phone").$$render($$result, { class: "w-3 h-3" }, {}, {})} ${escape(c.phone)} </p>` : ``}</div> </div></td> <td class="p-4 hidden md:table-cell">${c.serviceType ? `${validate_component(Badge, "Badge").$$render($$result, { variant: "outline" }, {}, {
        default: () => {
          return `${escape(c.serviceType)}`;
        }
      })}` : `<span class="text-gray-400 dark:text-zinc-600 text-xs" data-svelte-h="svelte-1h6jshj">—</span>`}</td> <td class="p-4">${validate_component(Badge, "Badge").$$render($$result, { variant: badge.variant }, {}, {
        default: () => {
          return `${escape(badge.label)}`;
        }
      })}</td> <td class="p-4 hidden lg:table-cell text-gray-500 dark:text-zinc-400 text-xs">${escape(formatDate(c.createdAt))}</td> <td class="p-4 text-right"><div class="flex justify-end gap-1"><a${add_attribute("href", `/mi/admin/contacts/${c.id}`, 0)} class="p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-500/10 text-gray-600 dark:text-zinc-400 hover:text-[#febd17] transition-colors" aria-label="Voir">${validate_component(Eye, "Eye").$$render($$result, { class: "w-4 h-4" }, {}, {})}</a> <form method="POST" action="?/delete"><input type="hidden" name="id"${add_attribute("value", c.id, 0)}> <button type="submit" class="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/10 text-gray-600 dark:text-zinc-400 hover:text-red-500 transition-colors" aria-label="Supprimer">${validate_component(Trash2, "Trash2").$$render($$result, { class: "w-4 h-4" }, {}, {})} </button></form> </div></td> </tr>`;
    })}</tbody></table></div> ${totalPages > 1 ? `<div class="flex justify-between items-center p-4 border-t border-gray-200 dark:border-zinc-800"><p class="text-sm text-gray-500 dark:text-zinc-400">Page ${escape(data.page)} sur ${escape(totalPages)}</p> <div class="flex gap-2"><button ${data.page <= 1 ? "disabled" : ""} class="px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 text-sm font-medium disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-zinc-800">Précédent</button> <button ${data.page >= totalPages ? "disabled" : ""} class="px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 text-sm font-medium disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-zinc-800">Suivant</button></div></div>` : ``}`}</div></div>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
