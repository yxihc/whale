// 这里主要放置的是组件的props,及一些公共的方法
import type { ExtractPropTypes } from 'vue';

export const formProps = {
  title: {
    type: String,
    default: '',
  },
};
export type FormProps = ExtractPropTypes<typeof formProps>;
