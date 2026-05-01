import { c as create_ssr_component, v as validate_component, b as add_attribute, e as escape } from "./ssr.js";
import { I as Icon } from "./Icon.js";
import { c as cn } from "./lib-utils.js";
const Save = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
      }
    ],
    [
      "path",
      {
        "d": "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"
      }
    ],
    ["path", { "d": "M7 3v4a1 1 0 0 0 1 1h7" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "save" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Save$1 = Save;
const Textarea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: className = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { placeholder = void 0 } = $$props;
  let { name = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { rows = 4 } = $$props;
  let { required = false } = $$props;
  let { disabled = false } = $$props;
  let { maxlength = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0)
    $$bindings.rows(rows);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.maxlength === void 0 && $$bindings.maxlength && maxlength !== void 0)
    $$bindings.maxlength(maxlength);
  return `<textarea${add_attribute("name", name, 0)}${add_attribute("id", id, 0)}${add_attribute("rows", rows, 0)}${add_attribute("placeholder", placeholder, 0)} ${required ? "required" : ""} ${disabled ? "disabled" : ""}${add_attribute("maxlength", maxlength, 0)}${add_attribute("class", cn("flex min-h-[100px] w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-sm transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#febd17] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50", className), 0)}>${escape(value || "")}</textarea>`;
});
export {
  Save$1 as S,
  Textarea as T
};
