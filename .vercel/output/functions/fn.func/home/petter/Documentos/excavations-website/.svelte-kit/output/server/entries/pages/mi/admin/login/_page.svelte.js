import { c as create_ssr_component, v as validate_component, e as escape } from "../../../../../chunks/ssr.js";
import "devalue";
import "../../../../../chunks/client.js";
import { I as Input } from "../../../../../chunks/input.js";
import { L as Label } from "../../../../../chunks/label.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
import { M as Mail } from "../../../../../chunks/mail.js";
import { A as ArrowRight } from "../../../../../chunks/arrow-right.js";
const Lock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "11",
        "x": "3",
        "y": "11",
        "rx": "2",
        "ry": "2"
      }
    ],
    ["path", { "d": "M7 11V7a5 5 0 0 1 10 0v4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "lock" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Lock$1 = Lock;
const Shield_check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ],
    ["path", { "d": "m9 12 2 2 4-4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "shield-check" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ShieldCheck = Shield_check;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `<div class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black relative overflow-hidden"> <div class="absolute inset-0 overflow-hidden pointer-events-none" data-svelte-h="svelte-covsjz"><div class="absolute -top-40 -left-40 w-96 h-96 bg-[#febd17] rounded-full blur-3xl opacity-10 animate-pulse"></div> <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-[#febd17] rounded-full blur-3xl opacity-10 animate-pulse" style="animation-delay: 2s;"></div> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500 rounded-full blur-3xl opacity-5"></div></div>  <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div> <div class="relative z-10 w-full max-w-md"> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#febd17] to-yellow-600 mb-4 shadow-2xl shadow-yellow-500/30">${validate_component(ShieldCheck, "ShieldCheck").$$render($$result, { class: "w-8 h-8 text-black" }, {}, {})}</div> <h1 class="text-3xl font-black text-white mb-2 tracking-tight" data-svelte-h="svelte-er1w3q">Panel de Control</h1> <p class="text-zinc-400 text-sm" data-svelte-h="svelte-120gbf1">Mini Excavations Érable — Administration</p></div>  <div class="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl"><form method="POST" class="space-y-5">${form?.error ? `<div class="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">${escape(form.error)}</div>` : ``} <div class="space-y-2">${validate_component(Label, "Label").$$render($$result, { forId: "email", class: "text-zinc-300" }, {}, {
    default: () => {
      return `Adresse courriel`;
    }
  })} <div class="relative">${validate_component(Mail, "Mail").$$render(
    $$result,
    {
      class: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 z-10"
    },
    {},
    {}
  )} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      id: "email",
      type: "email",
      name: "email",
      required: true,
      autocomplete: "email",
      placeholder: "admin@exemple.com",
      value: form?.email ?? "",
      class: "pl-10 h-12 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600"
    },
    {},
    {}
  )}</div></div> <div class="space-y-2">${validate_component(Label, "Label").$$render(
    $$result,
    {
      forId: "password",
      class: "text-zinc-300"
    },
    {},
    {
      default: () => {
        return `Mot de passe`;
      }
    }
  )} <div class="relative">${validate_component(Lock$1, "Lock").$$render(
    $$result,
    {
      class: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 z-10"
    },
    {},
    {}
  )} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      id: "password",
      type: "password",
      name: "password",
      required: true,
      autocomplete: "current-password",
      placeholder: "••••••••",
      class: "pl-10 h-12 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600"
    },
    {},
    {}
  )}</div></div> <button type="submit" ${""} class="w-full h-12 rounded-xl bg-gradient-to-r from-[#febd17] to-yellow-500 hover:from-yellow-500 hover:to-[#febd17] text-black font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-yellow-500/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">${`Se connecter
						${validate_component(ArrowRight, "ArrowRight").$$render($$result, { class: "w-4 h-4" }, {}, {})}`}</button></form> <div class="mt-6 pt-6 border-t border-zinc-800 text-center" data-svelte-h="svelte-5ituri"><a href="/" class="text-xs text-zinc-500 hover:text-[#febd17] transition-colors">← Retour au site</a></div></div> <p class="text-center text-zinc-600 text-xs mt-6" data-svelte-h="svelte-m8blym">Accès restreint • Toutes les tentatives sont enregistrées</p></div></div>`;
});
export {
  Page as default
};
