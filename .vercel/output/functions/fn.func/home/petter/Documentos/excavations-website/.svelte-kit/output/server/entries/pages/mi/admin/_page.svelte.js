import { c as create_ssr_component, v as validate_component, d as each, e as escape, m as missing_component, b as add_attribute } from "../../../../chunks/ssr.js";
import { B as Badge } from "../../../../chunks/badge.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { S as Sparkles } from "../../../../chunks/sparkles.js";
import { M as Mail } from "../../../../chunks/mail.js";
import { F as FileText } from "../../../../chunks/file-text.js";
import { W as Wrench } from "../../../../chunks/wrench.js";
import { C as Clock } from "../../../../chunks/clock.js";
import { U as Users } from "../../../../chunks/users.js";
const Arrow_up_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M7 7h10v10" }], ["path", { "d": "M7 17 17 7" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "arrow-up-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ArrowUpRight = Arrow_up_right;
const Inbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "polyline",
      {
        "points": "22 12 16 12 14 15 10 15 8 12 2 12"
      }
    ],
    [
      "path",
      {
        "d": "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "inbox" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Inbox$1 = Inbox;
const Trending_up = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M16 7h6v6" }], ["path", { "d": "m22 7-8.5 8.5-5-5L2 17" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "trending-up" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const TrendingUp = Trending_up;
function statusBadge(status) {
  const map = {
    new: { variant: "warning", label: "Nouveau" },
    contacted: { variant: "info", label: "Contacté" },
    quoted: {
      variant: "info",
      label: "Devis envoyé"
    },
    won: { variant: "success", label: "Gagné" },
    lost: { variant: "danger", label: "Perdu" },
    archived: { variant: "default", label: "Archivé" }
  };
  return map[status] ?? { variant: "default", label: status };
}
function formatDate(d) {
  const date = new Date(d);
  return date.toLocaleString("fr-CA", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let stats;
  let recentContacts;
  let maxDaily;
  let { data } = $$props;
  const cards = [
    {
      label: "Nouveaux Leads",
      key: "newContacts",
      icon: Inbox$1,
      color: "from-yellow-400 to-orange-500",
      suffix: "à traiter"
    },
    {
      label: "Contacts (7 jours)",
      key: "contacts7d",
      icon: TrendingUp,
      color: "from-green-400 to-emerald-600",
      suffix: "cette semaine"
    },
    {
      label: "Contacts (30 jours)",
      key: "contacts30d",
      icon: Clock,
      color: "from-blue-400 to-indigo-600",
      suffix: "ce mois"
    },
    {
      label: "Total Contacts",
      key: "totalContacts",
      icon: Users,
      color: "from-purple-400 to-pink-600",
      suffix: "historique"
    }
  ];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  stats = data.stats;
  recentContacts = data.recentContacts;
  maxDaily = Math.max(1, ...data.dailyStats.map((d) => Number(d.c)));
  return `<div class="space-y-8"> <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"><div><h1 class="text-3xl md:text-4xl font-black tracking-tight flex items-center gap-3">${validate_component(Sparkles, "Sparkles").$$render($$result, { class: "w-8 h-8 text-[#febd17]" }, {}, {})}
				Tableau de bord</h1> <p class="text-gray-500 dark:text-zinc-400 mt-1" data-svelte-h="svelte-1dog24w">Vue d&#39;ensemble de votre activité commerciale</p></div> <div class="flex gap-2"><a href="/mi/admin/contacts" class="px-4 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-lg shadow-yellow-500/20">Voir tous les contacts ${validate_component(ArrowUpRight, "ArrowUpRight").$$render($$result, { class: "w-4 h-4" }, {}, {})}</a></div></div>  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">${each(cards, (card) => {
    return `<div class="relative overflow-hidden bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all"><div class="${"absolute top-0 right-0 w-32 h-32 bg-gradient-to-br " + escape(card.color, true) + " opacity-10 rounded-full blur-3xl"}"></div> <div class="relative"><div class="flex items-center justify-between mb-4"><div class="${"w-11 h-11 rounded-xl bg-gradient-to-br " + escape(card.color, true) + " flex items-center justify-center shadow-lg"}">${validate_component(card.icon || missing_component, "svelte:component").$$render($$result, { class: "w-5 h-5 text-white" }, {}, {})} </div></div> <p class="text-3xl font-black mb-1">${escape(stats[card.key])}</p> <p class="text-sm font-medium text-gray-700 dark:text-zinc-300">${escape(card.label)}</p> <p class="text-xs text-gray-500 dark:text-zinc-500 mt-0.5">${escape(card.suffix)}</p></div> </div>`;
  })}</div>  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"> <div class="lg:col-span-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6"><div class="flex items-center justify-between mb-6" data-svelte-h="svelte-12x4f49"><div><h2 class="text-lg font-bold">Activité (30 derniers jours)</h2> <p class="text-sm text-gray-500 dark:text-zinc-400">Contacts reçus par jour</p></div></div> ${data.dailyStats.length === 0 ? `<div class="h-48 flex items-center justify-center text-gray-400 dark:text-zinc-600 text-sm" data-svelte-h="svelte-d7rlzo">Aucune donnée pour cette période</div>` : `<div class="flex items-end gap-1 h-48">${each(data.dailyStats, (d) => {
    let h = Number(d.c) / maxDaily * 100;
    return ` <div class="flex-1 flex flex-col items-center gap-1 group"${add_attribute("title", `${d.day}: ${d.c} contacts`, 0)}><div class="w-full bg-gradient-to-t from-[#febd17] to-yellow-300 rounded-t-md transition-all group-hover:opacity-80" style="${"height: " + escape(h, true) + "%"}"></div> <span class="text-[9px] text-gray-400 dark:text-zinc-600 rotate-45 origin-left mt-2 hidden md:block">${escape(d.day.slice(5))}</span> </div>`;
  })}</div>`}</div>  <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6"><h2 class="text-lg font-bold mb-1" data-svelte-h="svelte-kxuwnf">Répartition</h2> <p class="text-sm text-gray-500 dark:text-zinc-400 mb-6" data-svelte-h="svelte-2pc95l">Statut des contacts</p> ${data.statusBreakdown.length === 0 ? `<p class="text-sm text-gray-400 dark:text-zinc-600" data-svelte-h="svelte-e9kec2">Aucun contact</p>` : `<div class="space-y-3">${each(data.statusBreakdown, (s) => {
    let badge = statusBadge(s.status);
    return ` <div class="flex items-center justify-between">${validate_component(Badge, "Badge").$$render($$result, { variant: badge.variant }, {}, {
      default: () => {
        return `${escape(badge.label)}`;
      }
    })} <span class="font-bold text-lg">${escape(s.c)}</span> </div>`;
  })}</div>`}</div></div>  <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6"><div class="flex items-center justify-between mb-6"><div data-svelte-h="svelte-sq1n2g"><h2 class="text-lg font-bold">Contacts récents</h2> <p class="text-sm text-gray-500 dark:text-zinc-400">Derniers messages reçus</p></div> <a href="/mi/admin/contacts" class="text-sm text-[#febd17] hover:underline font-medium flex items-center gap-1">Tout voir ${validate_component(ArrowUpRight, "ArrowUpRight").$$render($$result, { class: "w-3 h-3" }, {}, {})}</a></div> ${recentContacts.length === 0 ? `<div class="py-12 text-center">${validate_component(Mail, "Mail").$$render(
    $$result,
    {
      class: "w-12 h-12 text-gray-300 dark:text-zinc-700 mx-auto mb-3"
    },
    {},
    {}
  )} <p class="text-gray-500 dark:text-zinc-500" data-svelte-h="svelte-1opos2z">Aucun contact pour le moment</p></div>` : `<div class="space-y-2">${each(recentContacts, (c) => {
    let badge = statusBadge(c.status);
    return ` <a${add_attribute("href", `/mi/admin/contacts/${c.id}`, 0)} class="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 hover:border-[#febd17] dark:hover:border-[#febd17] hover:bg-yellow-50 dark:hover:bg-yellow-500/5 transition-all"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">${escape(c.name[0]?.toUpperCase())}</div> <div class="flex-1 min-w-0"><div class="flex items-center gap-2 flex-wrap"><p class="font-bold text-sm">${escape(c.name)}</p> ${validate_component(Badge, "Badge").$$render($$result, { variant: badge.variant }, {}, {
      default: () => {
        return `${escape(badge.label)}`;
      }
    })} ${c.serviceType ? `${validate_component(Badge, "Badge").$$render($$result, { variant: "outline" }, {}, {
      default: () => {
        return `${escape(c.serviceType)}`;
      }
    })}` : ``}</div> <p class="text-xs text-gray-500 dark:text-zinc-400 mt-0.5 truncate">${escape(c.email)}</p> <p class="text-sm text-gray-700 dark:text-zinc-300 mt-1 line-clamp-1">${escape(c.message)}</p></div> <span class="text-xs text-gray-400 dark:text-zinc-600 flex-shrink-0 hidden sm:block">${escape(formatDate(c.createdAt))}</span> </a>`;
  })}</div>`}</div>  <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><a href="/mi/admin/blogs" class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-[#febd17] transition-all group">${validate_component(FileText, "FileText").$$render($$result, { class: "w-8 h-8 text-[#febd17] mb-3" }, {}, {})} <p class="text-3xl font-black">${escape(stats.publishedBlogs)}<span class="text-gray-300 dark:text-zinc-700 text-base font-normal">/${escape(stats.totalBlogs)}</span></p> <p class="text-sm font-medium text-gray-700 dark:text-zinc-300" data-svelte-h="svelte-1fvjhys">Articles publiés</p></a> <a href="/mi/admin/services" class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-[#febd17] transition-all group">${validate_component(Wrench, "Wrench").$$render($$result, { class: "w-8 h-8 text-[#febd17] mb-3" }, {}, {})} <p class="text-3xl font-black">${escape(stats.totalServices)}</p> <p class="text-sm font-medium text-gray-700 dark:text-zinc-300" data-svelte-h="svelte-11necer">Services actifs</p></a> <a href="/mi/admin/settings" class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-[#febd17] transition-all group">${validate_component(Sparkles, "Sparkles").$$render($$result, { class: "w-8 h-8 text-[#febd17] mb-3" }, {}, {})} <p class="text-base font-bold" data-svelte-h="svelte-scb1x7">Configurer</p> <p class="text-sm text-gray-500 dark:text-zinc-400" data-svelte-h="svelte-1trspz6">Personnaliser le site</p></a></div></div>`;
});
export {
  Page as default
};
