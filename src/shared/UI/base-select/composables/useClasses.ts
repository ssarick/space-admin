import { BaseSelectProps } from '../base-select.types';

export default function useClasses(
  props: BaseSelectProps,
  searchString: Ref<string | null>
) {
  const classes = computed<Record<string, boolean>>(
    () => ({
      searching: !!searchString.value?.trim(),
      [`base-select--size-${props.size}`]: !!props.size
    })
  );

  return {
    classes
  };
}
