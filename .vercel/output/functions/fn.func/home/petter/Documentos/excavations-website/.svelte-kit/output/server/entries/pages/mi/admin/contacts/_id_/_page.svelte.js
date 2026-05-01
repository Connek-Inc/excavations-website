import { c as create_ssr_component, v as validate_component, e as escape, b as add_attribute } from "../../../../../../chunks/ssr.js";
import "devalue";
import "../../../../../../chunks/client.js";
import { B as Badge } from "../../../../../../chunks/badge.js";
import { T as Textarea, S as Save } from "../../../../../../chunks/textarea.js";
import { L as Label } from "../../../../../../chunks/label.js";
import { I as Icon } from "../../../../../../chunks/Icon.js";
import { A as ArrowLeft } from "../../../../../../chunks/arrow-left.js";
import { T as Trash2 } from "../../../../../../chunks/trash-2.js";
import { M as Mail } from "../../../../../../chunks/mail.js";
import { P as Phone } from "../../../../../../chunks/phone.js";
import { G as Globe } from "../../../../../../chunks/globe.js";
import { C as Calendar } from "../../../../../../chunks/calendar.js";
const Message_square = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "message-square" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const MessageSquare = Message_square;
function formatDate(d) {
  if (!d)
    return "—";
  return new Date(d).toLocaleString("fr-CA", { dateStyle: "long", timeStyle: "short" });
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let contact;
  let { data } = $$props;
  let { form } = $$props;
  contact.status;
  let notes = contact.notes ?? "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    contact = data.contact;
    $$rendered = `<div class="space-y-6 max-w-5xl"><a href="/mi/admin/contacts" class="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400 hover:text-[#febd17] transition-colors">${validate_component(ArrowLeft, "ArrowLeft").$$render($$result, { class: "w-4 h-4" }, {}, {})} Retour à la liste</a> <div class="flex items-start justify-between flex-wrap gap-4"><div class="flex items-center gap-4"><div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#febd17] to-yellow-600 flex items-center justify-center text-black font-black text-2xl shadow-lg shadow-yellow-500/30">${escape(contact.name[0]?.toUpperCase())}</div> <div><h1 class="text-2xl md:text-3xl font-black">${escape(contact.name)}</h1> <p class="text-gray-500 dark:text-zinc-400 text-sm">Contact #${escape(contact.id)}</p></div></div> <form method="POST" action="?/delete"><button type="submit" class="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-medium text-sm hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors flex items-center gap-2">${validate_component(Trash2, "Trash2").$$render($$result, { class: "w-4 h-4" }, {}, {})} Supprimer</button></form></div> ${form?.success ? `<div class="p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 text-sm" data-svelte-h="svelte-1nwtigo">✓ Modifications enregistrées</div>` : ``} <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"> <div class="lg:col-span-2 space-y-6"><div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6"><h2 class="font-bold text-lg mb-4 flex items-center gap-2">${validate_component(MessageSquare, "MessageSquare").$$render($$result, { class: "w-5 h-5 text-[#febd17]" }, {}, {})} Message</h2> ${contact.subject ? `<p class="font-semibold mb-2">${escape(contact.subject)}</p>` : ``} <p class="text-gray-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">${escape(contact.message)}</p></div> <form method="POST" action="?/update" class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4"><h2 class="font-bold text-lg" data-svelte-h="svelte-rghmic">Gestion</h2> <div class="space-y-2">${validate_component(Label, "Label").$$render($$result, { forId: "status" }, {}, {
      default: () => {
        return `Statut`;
      }
    })} <select id="status" name="status" class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#febd17]"><option value="new" data-svelte-h="svelte-1hayaxj">Nouveau</option><option value="contacted" data-svelte-h="svelte-1bn8oe6">Contacté</option><option value="quoted" data-svelte-h="svelte-1h035u3">Devis envoyé</option><option value="won" data-svelte-h="svelte-14laspa">Gagné</option><option value="lost" data-svelte-h="svelte-30xs4y">Perdu</option><option value="archived" data-svelte-h="svelte-r5kcv0">Archivé</option></select></div> <div class="space-y-2">${validate_component(Label, "Label").$$render($$result, { forId: "notes" }, {}, {
      default: () => {
        return `Notes internes`;
      }
    })} ${validate_component(Textarea, "Textarea").$$render(
      $$result,
      {
        id: "notes",
        name: "notes",
        rows: 5,
        placeholder: "Notes privées sur ce lead...",
        value: notes
      },
      {
        value: ($$value) => {
          notes = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <button type="submit" ${""} class="px-6 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 transition-colors flex items-center gap-2 disabled:opacity-60">${validate_component(Save, "Save").$$render($$result, { class: "w-4 h-4" }, {}, {})} ${escape("Enregistrer")}</button></form></div>  <div class="space-y-4"><div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4"><h2 class="font-bold text-lg" data-svelte-h="svelte-2dlz56">Coordonnées</h2> <div class="space-y-3 text-sm"><a${add_attribute("href", `mailto:${contact.email}`, 0)} class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-950 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 transition-colors group">${validate_component(Mail, "Mail").$$render(
      $$result,
      {
        class: "w-4 h-4 text-[#febd17] flex-shrink-0"
      },
      {},
      {}
    )} <span class="break-all group-hover:text-[#febd17]">${escape(contact.email)}</span></a> ${contact.phone ? `<a${add_attribute("href", `tel:${contact.phone}`, 0)} class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-950 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 transition-colors group">${validate_component(Phone, "Phone").$$render(
      $$result,
      {
        class: "w-4 h-4 text-[#febd17] flex-shrink-0"
      },
      {},
      {}
    )} <span class="group-hover:text-[#febd17]">${escape(contact.phone)}</span></a>` : ``} ${contact.serviceType ? `<div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-950">${validate_component(Globe, "Globe").$$render(
      $$result,
      {
        class: "w-4 h-4 text-[#febd17] flex-shrink-0"
      },
      {},
      {}
    )} ${validate_component(Badge, "Badge").$$render($$result, { variant: "outline" }, {}, {
      default: () => {
        return `${escape(contact.serviceType)}`;
      }
    })}</div>` : ``} ${contact.preferredDate ? `<div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-950">${validate_component(Calendar, "Calendar").$$render(
      $$result,
      {
        class: "w-4 h-4 text-[#febd17] flex-shrink-0"
      },
      {},
      {}
    )} <span class="text-xs">${escape(formatDate(contact.preferredDate))}</span></div>` : ``}</div></div> <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-2 text-xs text-gray-500 dark:text-zinc-400"><div class="flex justify-between"><span data-svelte-h="svelte-1blyvkm">Reçu le</span> <span>${escape(formatDate(contact.createdAt))}</span></div> <div class="flex justify-between"><span data-svelte-h="svelte-4y4n3b">Source</span> <span class="font-medium text-gray-700 dark:text-zinc-300">${escape(contact.source ?? "website")}</span></div> <div class="flex justify-between"><span data-svelte-h="svelte-8pezm0">Langue</span> <span class="font-medium text-gray-700 dark:text-zinc-300 uppercase">${escape(contact.language ?? "fr")}</span></div> ${contact.ipAddress ? `<div class="flex justify-between"><span data-svelte-h="svelte-x63q2r">IP</span> <span class="font-mono text-gray-700 dark:text-zinc-300 text-[10px]">${escape(contact.ipAddress)}</span></div>` : ``}</div></div></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
