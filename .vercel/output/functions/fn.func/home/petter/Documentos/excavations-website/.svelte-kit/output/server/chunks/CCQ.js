import { c as create_ssr_component, h as compute_rest_props, i as spread, k as escape_attribute_value, j as escape_object } from "./ssr.js";
import { cva } from "class-variance-authority";
import { c as cn } from "./lib-utils.js";
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant", "size"]);
  const buttonVariants = cva("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  });
  let { class: className = void 0 } = $$props;
  let { variant = "default" } = $$props;
  let { size = "default" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<button${spread(
    [
      {
        class: escape_attribute_value(cn(buttonVariants({ variant, size, className })))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</button>`;
});
const certif1 = "data:image/png;base64,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";
const certif2 = "/_app/immutable/assets/RBQ.DXAyArpO.png";
const certif3 = "/_app/immutable/assets/CMMTQ.QYKK5cAN.svg";
const certif4 = "/_app/immutable/assets/CCQ.D3M7-nHi.png";
export {
  Button as B,
  certif2 as a,
  certif3 as b,
  certif1 as c,
  certif4 as d
};
