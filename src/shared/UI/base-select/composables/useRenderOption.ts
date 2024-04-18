import { h } from 'vue';
import { ISelectOption } from '@/shared/types/select.types';

export default function useRenderOption() {
  const renderOption = (option: ISelectOption) => {
    // FIXME render custom label by prop labelField
    if (!option.subLabel) return option.label;

    return h('div', null, [
      h('div', null, option.label),
      h('div', { class: 'color-secondary_dark' }, option.subLabel)
    ]);
  };

  return {
    renderOption
  };
}
