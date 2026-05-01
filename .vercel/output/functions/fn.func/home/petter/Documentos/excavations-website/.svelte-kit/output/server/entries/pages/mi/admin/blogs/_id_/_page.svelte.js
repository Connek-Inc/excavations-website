import { c as create_ssr_component, v as validate_component } from "../../../../../../chunks/ssr.js";
import { B as BlogEditor } from "../../../../../../chunks/BlogEditor.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `${validate_component(BlogEditor, "BlogEditor").$$render($$result, { blog: data.blog, form }, {}, {})}`;
});
export {
  Page as default
};
