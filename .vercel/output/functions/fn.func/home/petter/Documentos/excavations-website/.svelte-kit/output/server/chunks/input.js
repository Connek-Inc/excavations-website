import { c as create_ssr_component, b as add_attribute } from "./ssr.js";
import { c as cn } from "./lib-utils.js";
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let inputClass;
  let { class: className = void 0 } = $$props;
  let { type = "text" } = $$props;
  let { value = void 0 } = $$props;
  let { placeholder = void 0 } = $$props;
  let { name = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { required = false } = $$props;
  let { disabled = false } = $$props;
  let { readonly = false } = $$props;
  let { autocomplete = void 0 } = $$props;
  let { pattern = void 0 } = $$props;
  let { maxlength = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
  if ($$props.autocomplete === void 0 && $$bindings.autocomplete && autocomplete !== void 0)
    $$bindings.autocomplete(autocomplete);
  if ($$props.pattern === void 0 && $$bindings.pattern && pattern !== void 0)
    $$bindings.pattern(pattern);
  if ($$props.maxlength === void 0 && $$bindings.maxlength && maxlength !== void 0)
    $$bindings.maxlength(maxlength);
  inputClass = cn("flex h-11 w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-2 text-sm transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#febd17] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50", className);
  return `${type === "email" ? `<input type="email"${add_attribute("name", name, 0)}${add_attribute("id", id, 0)}${add_attribute("placeholder", placeholder, 0)} ${required ? "required" : ""} ${disabled ? "disabled" : ""} ${readonly ? "readonly" : ""}${add_attribute("autocomplete", autocomplete, 0)}${add_attribute("pattern", pattern, 0)}${add_attribute("maxlength", maxlength, 0)}${add_attribute("class", inputClass, 0)}${add_attribute("value", value, 0)}>` : `${type === "password" ? `<input type="password"${add_attribute("name", name, 0)}${add_attribute("id", id, 0)}${add_attribute("placeholder", placeholder, 0)} ${required ? "required" : ""} ${disabled ? "disabled" : ""} ${readonly ? "readonly" : ""}${add_attribute("autocomplete", autocomplete, 0)}${add_attribute("pattern", pattern, 0)}${add_attribute("maxlength", maxlength, 0)}${add_attribute("class", inputClass, 0)}${add_attribute("value", value, 0)}>` : `${type === "number" ? `<input type="number"${add_attribute("name", name, 0)}${add_attribute("id", id, 0)}${add_attribute("placeholder", placeholder, 0)} ${required ? "required" : ""} ${disabled ? "disabled" : ""} ${readonly ? "readonly" : ""}${add_attribute("autocomplete", autocomplete, 0)}${add_attribute("class", inputClass, 0)}${add_attribute("value", value, 0)}>` : `${type === "tel" ? `<input type="tel"${add_attribute("name", name, 0)}${add_attribute("id", id, 0)}${add_attribute("placeholder", placeholder, 0)} ${required ? "required" : ""} ${disabled ? "disabled" : ""} ${readonly ? "readonly" : ""}${add_attribute("autocomplete", autocomplete, 0)}${add_attribute("pattern", pattern, 0)}${add_attribute("maxlength", maxlength, 0)}${add_attribute("class", inputClass, 0)}${add_attribute("value", value, 0)}>` : `${type === "url" ? `<input type="url"${add_attribute("name", name, 0)}${add_attribute("id", id, 0)}${add_attribute("placeholder", placeholder, 0)} ${required ? "required" : ""} ${disabled ? "disabled" : ""} ${readonly ? "readonly" : ""}${add_attribute("autocomplete", autocomplete, 0)}${add_attribute("pattern", pattern, 0)}${add_attribute("maxlength", maxlength, 0)}${add_attribute("class", inputClass, 0)}${add_attribute("value", value, 0)}>` : `<input type="text"${add_attribute("name", name, 0)}${add_attribute("id", id, 0)}${add_attribute("placeholder", placeholder, 0)} ${required ? "required" : ""} ${disabled ? "disabled" : ""} ${readonly ? "readonly" : ""}${add_attribute("autocomplete", autocomplete, 0)}${add_attribute("pattern", pattern, 0)}${add_attribute("maxlength", maxlength, 0)}${add_attribute("class", inputClass, 0)}${add_attribute("value", value, 0)}>`}`}`}`}`}`;
});
export {
  Input as I
};
