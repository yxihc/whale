'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var form$1 = require('./form.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');

const _hoisted_1 = { id: "test" };
const _sfc_main = vue.defineComponent({
  ...{
    name: "WlErmForm"
  },
  __name: "form",
  props: form$1.formProps,
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        _hoisted_1,
        vue.toDisplayString(props.title),
        1
      );
    };
  }
});
var form = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "/Users/shenkun/WorkSpace/Github/whale/packages/components/erm-form/src/form.vue"]]);

exports["default"] = form;
//# sourceMappingURL=form2.js.map
