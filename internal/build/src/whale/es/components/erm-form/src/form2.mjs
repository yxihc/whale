import { defineComponent, openBlock, createElementBlock, toDisplayString } from 'vue';
import { formProps } from './form.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';

const _hoisted_1 = { id: "test" };
const _sfc_main = defineComponent({
  ...{
    name: "WlErmForm"
  },
  __name: "form",
  props: formProps,
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        _hoisted_1,
        toDisplayString(props.title),
        1
      );
    };
  }
});
var form = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/shenkun/WorkSpace/Github/whale/packages/components/erm-form/src/form.vue"]]);

export { form as default };
//# sourceMappingURL=form2.mjs.map
