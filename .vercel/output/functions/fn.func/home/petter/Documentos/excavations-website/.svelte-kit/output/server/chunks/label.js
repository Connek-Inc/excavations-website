import { c as create_ssr_component, b as add_attribute } from "./ssr.js";
import { c as cn } from "./lib-utils.js";
const Label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: className = void 0 } = $$props;
  let { forId = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.forId === void 0 && $$bindings.forId && forId !== void 0)
    $$bindings.forId(forId);
  return `<label${add_attribute("for", forId, 0)}${add_attribute("class", cn("text-sm font-medium text-gray-700 dark:text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className), 0)}>${slots.default ? slots.default({}) : ``}</label>`;
});
export {
  Label as L
};
