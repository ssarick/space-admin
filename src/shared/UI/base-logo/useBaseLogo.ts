import { computed } from 'vue';
import { IProps } from './base-logo.types';

export default function useBaseLogo(
  props: IProps
) {
  const logoWidth = computed(
    () => props.short ? 32 : 220
  );

  return {
    logoWidth
  };
}
