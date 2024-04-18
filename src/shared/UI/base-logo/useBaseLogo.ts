import { computed } from 'vue';
import { IProps } from './base-logo.types';

export default function useBaseLogo(
  props: IProps
) {
  const logoWidth = computed(
    () => props.short ? 22 : 220
  );

  return {
    logoWidth
  };
}
