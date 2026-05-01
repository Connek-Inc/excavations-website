import { c as create_ssr_component, b as add_attribute } from "./ssr.js";
import { c as cn } from "./lib-utils.js";
const Badge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: className = void 0 } = $$props;
  let { variant = "default" } = $$props;
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-200",
    success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    outline: "border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300"
  };
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  return `<span${add_attribute("class", cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", variants[variant], className), 0)}>${slots.default ? slots.default({}) : ``}</span>`;
});
export {
  Badge as B
};
