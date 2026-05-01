import { c as create_ssr_component, v as validate_component, a as subscribe, e as escape, d as each, b as add_attribute, m as missing_component } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
import "devalue";
import "../../../../chunks/client.js";
import { t as theme } from "../../../../chunks/store.js";
import { S as Sparkles } from "../../../../chunks/sparkles.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { U as Users } from "../../../../chunks/users.js";
import { F as FileText } from "../../../../chunks/file-text.js";
import { W as Wrench } from "../../../../chunks/wrench.js";
import { S as Settings } from "../../../../chunks/settings.js";
const Chevron_left = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m15 18-6-6 6-6" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-left" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ChevronLeft = Chevron_left;
const Layout_dashboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "7",
        "height": "9",
        "x": "3",
        "y": "3",
        "rx": "1"
      }
    ],
    [
      "rect",
      {
        "width": "7",
        "height": "5",
        "x": "14",
        "y": "3",
        "rx": "1"
      }
    ],
    [
      "rect",
      {
        "width": "7",
        "height": "9",
        "x": "14",
        "y": "12",
        "rx": "1"
      }
    ],
    [
      "rect",
      {
        "width": "7",
        "height": "5",
        "x": "3",
        "y": "16",
        "rx": "1"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "layout-dashboard" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const LayoutDashboard = Layout_dashboard;
const Log_out = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "m16 17 5-5-5-5" }],
    ["path", { "d": "M21 12H9" }],
    [
      "path",
      {
        "d": "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "log-out" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const LogOut = Log_out;
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M4 5h16" }],
    ["path", { "d": "M4 12h16" }],
    ["path", { "d": "M4 19h16" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "menu" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Menu$1 = Menu;
const Moon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "moon" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Moon$1 = Moon;
const Sun = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "4" }],
    ["path", { "d": "M12 2v2" }],
    ["path", { "d": "M12 20v2" }],
    ["path", { "d": "m4.93 4.93 1.41 1.41" }],
    ["path", { "d": "m17.66 17.66 1.41 1.41" }],
    ["path", { "d": "M2 12h2" }],
    ["path", { "d": "M20 12h2" }],
    ["path", { "d": "m6.34 17.66-1.41 1.41" }],
    ["path", { "d": "m19.07 4.93-1.41 1.41" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "sun" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Sun$1 = Sun;
const X = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M18 6 6 18" }], ["path", { "d": "m6 6 12 12" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "x" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const X$1 = X;
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isLogin;
  let isActive;
  let $page, $$unsubscribe_page;
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { data } = $$props;
  const navItems = [
    {
      href: "/mi/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
      exact: true
    },
    {
      href: "/mi/admin/contacts",
      label: "Contacts / Leads",
      icon: Users
    },
    {
      href: "/mi/admin/blogs",
      label: "Articles Blog",
      icon: FileText
    },
    {
      href: "/mi/admin/services",
      label: "Services",
      icon: Wrench
    },
    {
      href: "/mi/admin/settings",
      label: "Paramètres",
      icon: Settings
    }
  ];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  isLogin = $page.url.pathname === "/mi/admin/login";
  isActive = (href, exact) => exact ? $page.url.pathname === href : $page.url.pathname.startsWith(href);
  $$unsubscribe_page();
  $$unsubscribe_theme();
  return `${isLogin ? `${slots.default ? slots.default({}) : ``}` : `<div class="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white flex"> ${``}  <aside class="${"fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 transition-transform duration-300 flex flex-col " + escape(
    "-translate-x-full lg:translate-x-0",
    true
  )}"> <div class="p-6 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between"><a href="/mi/admin" class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#febd17] to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">${validate_component(Sparkles, "Sparkles").$$render($$result, { class: "w-5 h-5 text-black" }, {}, {})}</div> <div data-svelte-h="svelte-1lvlhb4"><p class="font-black text-sm leading-tight">Panel</p> <p class="text-[10px] text-gray-500 dark:text-zinc-500 uppercase tracking-wider">Mini Excavations</p></div></a> <button class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800" aria-label="Close menu">${validate_component(X$1, "X").$$render($$result, { class: "w-5 h-5" }, {}, {})}</button></div>  <nav class="flex-1 p-4 space-y-1 overflow-y-auto">${each(navItems, (item) => {
    let active = isActive(item.href, item.exact);
    return ` <a${add_attribute("href", item.href, 0)} class="${"flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all relative group " + escape(
      active ? "bg-[#febd17] text-black shadow-lg shadow-yellow-500/20" : "text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800",
      true
    )}">${validate_component(item.icon || missing_component, "svelte:component").$$render($$result, { class: "w-5 h-5 flex-shrink-0" }, {}, {})} <span>${escape(item.label)}</span> ${active ? `<div class="ml-auto w-1.5 h-1.5 rounded-full bg-black"></div>` : ``} </a>`;
  })}</nav>  <div class="p-4 border-t border-gray-200 dark:border-zinc-800 space-y-3"><div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-950"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#febd17] to-yellow-600 flex items-center justify-center text-black font-black text-sm">${escape(data.admin?.name?.[0]?.toUpperCase() ?? "A")}</div> <div class="flex-1 min-w-0"><p class="text-sm font-bold truncate">${escape(data.admin?.name)}</p> <p class="text-xs text-gray-500 dark:text-zinc-500 truncate">${escape(data.admin?.email)}</p></div></div> <div class="flex gap-2"><button class="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors" aria-label="Toggle theme">${$theme === "dark" ? `${validate_component(Sun$1, "Sun").$$render($$result, { class: "w-4 h-4" }, {}, {})} Clair` : `${validate_component(Moon$1, "Moon").$$render($$result, { class: "w-4 h-4" }, {}, {})} Sombre`}</button> <form method="POST" action="/mi/admin/logout" class="flex-1"><button type="submit" class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">${validate_component(LogOut, "LogOut").$$render($$result, { class: "w-4 h-4" }, {}, {})} Quitter</button></form></div> <a href="/" target="_blank" rel="noopener" class="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-500 hover:text-[#febd17] transition-colors px-3">${validate_component(ChevronLeft, "ChevronLeft").$$render($$result, { class: "w-3 h-3" }, {}, {})}
					Voir le site public</a></div></aside>  <div class="flex-1 min-w-0"> <header class="lg:hidden sticky top-0 z-30 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between"><button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800" aria-label="Open menu">${validate_component(Menu$1, "Menu").$$render($$result, { class: "w-5 h-5" }, {}, {})}</button> <p class="font-bold text-sm" data-svelte-h="svelte-arovbo">Panel</p> <div class="w-9"></div></header> <main class="p-4 md:p-8 max-w-7xl mx-auto">${slots.default ? slots.default({}) : ``}</main></div></div>`}`;
});
export {
  Layout as default
};
