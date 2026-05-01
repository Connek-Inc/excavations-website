import { c as create_ssr_component, v as validate_component, e as escape, d as each, m as missing_component } from "../../../../../chunks/ssr.js";
import "devalue";
import "../../../../../chunks/client.js";
import { I as Input } from "../../../../../chunks/input.js";
import { L as Label } from "../../../../../chunks/label.js";
import { S as Save, T as Textarea } from "../../../../../chunks/textarea.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
import { S as Settings } from "../../../../../chunks/settings.js";
import { G as Globe } from "../../../../../chunks/globe.js";
const Building = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M12 10h.01" }],
    ["path", { "d": "M12 14h.01" }],
    ["path", { "d": "M12 6h.01" }],
    ["path", { "d": "M16 10h.01" }],
    ["path", { "d": "M16 14h.01" }],
    ["path", { "d": "M16 6h.01" }],
    ["path", { "d": "M8 10h.01" }],
    ["path", { "d": "M8 14h.01" }],
    ["path", { "d": "M8 6h.01" }],
    [
      "path",
      {
        "d": "M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
      }
    ],
    [
      "rect",
      {
        "x": "4",
        "y": "2",
        "width": "16",
        "height": "20",
        "rx": "2"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "building" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Building$1 = Building;
const Share_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "18", "cy": "5", "r": "3" }],
    ["circle", { "cx": "6", "cy": "12", "r": "3" }],
    ["circle", { "cx": "18", "cy": "19", "r": "3" }],
    [
      "line",
      {
        "x1": "8.59",
        "x2": "15.42",
        "y1": "13.51",
        "y2": "17.49"
      }
    ],
    [
      "line",
      {
        "x1": "15.41",
        "x2": "8.59",
        "y1": "6.51",
        "y2": "10.49"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "share-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Share2 = Share_2;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  const s = data.settings;
  let activeTab = "general";
  const tabs = [
    {
      key: "general",
      label: "Général",
      icon: Building$1
    },
    {
      key: "social",
      label: "Réseaux sociaux",
      icon: Share2
    },
    {
      key: "seo",
      label: "SEO global",
      icon: Globe
    }
  ];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `<form method="POST" class="space-y-6"><div class="flex items-center justify-between flex-wrap gap-4"><div><h1 class="text-3xl font-black flex items-center gap-3">${validate_component(Settings, "Settings").$$render($$result, { class: "w-7 h-7 text-[#febd17]" }, {}, {})}
				Paramètres</h1> <p class="text-gray-500 dark:text-zinc-400 mt-1" data-svelte-h="svelte-19faljc">Configuration globale du site</p></div> <button type="submit" ${""} class="px-6 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 flex items-center gap-2 disabled:opacity-60 shadow-lg shadow-yellow-500/20">${validate_component(Save, "Save").$$render($$result, { class: "w-4 h-4" }, {}, {})} ${escape("Enregistrer")}</button></div> ${form?.success ? `<div class="p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 text-sm" data-svelte-h="svelte-1ml5j8l">✓ Paramètres mis à jour</div>` : ``} <div class="flex gap-2 border-b border-gray-200 dark:border-zinc-800">${each(tabs, (t) => {
    return `<button type="button" class="${"px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 " + escape(
      activeTab === t.key ? "border-[#febd17] text-[#febd17]" : "border-transparent text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-300",
      true
    )}">${validate_component(t.icon || missing_component, "svelte:component").$$render($$result, { class: "w-4 h-4" }, {}, {})} ${escape(t.label)} </button>`;
  })}</div> ${`<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4"><div class="space-y-2">${validate_component(Label, "Label").$$render($$result, { forId: "site_name" }, {}, {
    default: () => {
      return `Nom de l&#39;entreprise`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      id: "site_name",
      name: "site_name",
      value: s.site_name?.value ?? "Mini Excavations Érable"
    },
    {},
    {}
  )}</div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="space-y-2">${validate_component(Label, "Label").$$render($$result, { forId: "phone" }, {}, {
    default: () => {
      return `Téléphone`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      id: "phone",
      name: "phone",
      type: "tel",
      value: s.phone?.value ?? ""
    },
    {},
    {}
  )}</div> <div class="space-y-2">${validate_component(Label, "Label").$$render($$result, { forId: "email" }, {}, {
    default: () => {
      return `Courriel`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      id: "email",
      name: "email",
      type: "email",
      value: s.email?.value ?? ""
    },
    {},
    {}
  )}</div></div> <div class="space-y-2">${validate_component(Label, "Label").$$render($$result, { forId: "address" }, {}, {
    default: () => {
      return `Adresse`;
    }
  })} ${validate_component(Textarea, "Textarea").$$render(
    $$result,
    {
      id: "address",
      name: "address",
      rows: 2,
      value: s.address?.value ?? ""
    },
    {},
    {}
  )}</div></div>`}</form>`;
});
export {
  Page as default
};
