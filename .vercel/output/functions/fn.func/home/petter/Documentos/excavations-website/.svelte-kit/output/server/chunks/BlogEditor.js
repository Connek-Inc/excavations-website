import { c as create_ssr_component, v as validate_component, e as escape, d as each } from "./ssr.js";
import "devalue";
import "./client.js";
import { I as Input } from "./input.js";
import { L as Label } from "./label.js";
import { S as Save, T as Textarea } from "./textarea.js";
import { A as ArrowLeft } from "./arrow-left.js";
const BlogEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { blog = {} } = $$props;
  let { isNew = false } = $$props;
  let { form = null } = $$props;
  let activeLang = "fr";
  let activeTab = "content";
  const tabs = [
    { key: "content", label: "Contenu" },
    { key: "seo", label: "SEO" },
    { key: "settings", label: "Paramètres" }
  ];
  const langs = [
    {
      key: "fr",
      label: "🇨🇦 Français"
    },
    {
      key: "en",
      label: "🇬🇧 English"
    },
    {
      key: "es",
      label: "🇪🇸 Español"
    }
  ];
  blog.slug ?? "";
  let titleFr = blog.titleFr ?? "";
  blog.titleEn ?? "";
  blog.titleEs ?? "";
  let excerptFr = blog.excerptFr ?? "";
  blog.excerptEn ?? "";
  blog.excerptEs ?? "";
  let contentFr = blog.contentFr ?? "";
  blog.contentEn ?? "";
  blog.contentEs ?? "";
  blog.coverImage ?? "";
  blog.metaTitle ?? "";
  blog.metaDescription ?? "";
  blog.metaKeywords ?? "";
  blog.category ?? "";
  (blog.tags ?? []).join(", ");
  blog.published ?? false;
  if ($$props.blog === void 0 && $$bindings.blog && blog !== void 0)
    $$bindings.blog(blog);
  if ($$props.isNew === void 0 && $$bindings.isNew && isNew !== void 0)
    $$bindings.isNew(isNew);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<form method="POST" class="space-y-6"><div class="flex items-center justify-between flex-wrap gap-4"><a href="/mi/admin/blogs" class="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400 hover:text-[#febd17]">${validate_component(ArrowLeft, "ArrowLeft").$$render($$result, { class: "w-4 h-4" }, {}, {})} Retour</a> <button type="submit" ${""} class="px-6 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 flex items-center gap-2 disabled:opacity-60 shadow-lg shadow-yellow-500/20">${validate_component(Save, "Save").$$render($$result, { class: "w-4 h-4" }, {}, {})} ${escape("Enregistrer")}</button></div> <h1 class="text-3xl font-black">${escape(isNew ? "Nouvel article" : "Modifier")} ${escape(titleFr ? `— ${titleFr}` : "")}</h1> ${form?.error ? `<div class="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 text-sm">${escape(form.error)}</div>` : ``} ${form?.success ? `<div class="p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 text-sm" data-svelte-h="svelte-h6uqib">✓ Article enregistré</div>` : ``}  <div class="flex gap-2 border-b border-gray-200 dark:border-zinc-800">${each(tabs, (t) => {
      return `<button type="button" class="${"px-4 py-3 text-sm font-medium border-b-2 transition-colors " + escape(
        activeTab === t.key ? "border-[#febd17] text-[#febd17]" : "border-transparent text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-300",
        true
      )}">${escape(t.label)} </button>`;
    })}</div> ${` <div class="flex gap-2 p-1 bg-gray-100 dark:bg-zinc-900 rounded-xl w-fit">${each(langs, (l) => {
      return `<button type="button" class="${"px-4 py-2 rounded-lg text-sm font-medium transition-all " + escape(
        activeLang === l.key ? "bg-white dark:bg-zinc-800 shadow-sm" : "text-gray-500 dark:text-zinc-400",
        true
      )}">${escape(l.label)} </button>`;
    })}</div> <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">${`<div class="space-y-2">${validate_component(Label, "Label").$$render($$result, { forId: "titleFr" }, {}, {
      default: () => {
        return `Titre (FR) *`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "titleFr",
        name: "titleFr",
        required: true,
        value: titleFr
      },
      {
        value: ($$value) => {
          titleFr = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="space-y-2">${validate_component(Label, "Label").$$render($$result, { forId: "excerptFr" }, {}, {
      default: () => {
        return `Résumé (FR)`;
      }
    })} ${validate_component(Textarea, "Textarea").$$render(
      $$result,
      {
        id: "excerptFr",
        name: "excerptFr",
        rows: 3,
        value: excerptFr
      },
      {
        value: ($$value) => {
          excerptFr = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="space-y-2">${validate_component(Label, "Label").$$render($$result, { forId: "contentFr" }, {}, {
      default: () => {
        return `Contenu HTML (FR) *`;
      }
    })} ${validate_component(Textarea, "Textarea").$$render(
      $$result,
      {
        id: "contentFr",
        name: "contentFr",
        rows: 20,
        required: true,
        class: "font-mono text-xs",
        value: contentFr
      },
      {
        value: ($$value) => {
          contentFr = $$value;
          $$settled = false;
        }
      },
      {}
    )} <p class="text-xs text-gray-500 dark:text-zinc-500" data-svelte-h="svelte-n2nnfu">HTML supporté : &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;...</p></div>`}</div>`}</form>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  BlogEditor as B
};
