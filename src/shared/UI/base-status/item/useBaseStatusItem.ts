import { IBaseStatusItemProps } from './base-status-item.types';

export default function useBaseStatusItem(
  props: IBaseStatusItemProps
) {
  const isIndicatorVisible = computed<boolean>(
    () => !props.type || props.type === 'default'
  );

  const isWrapperHasBgColor = computed<boolean>(
    () => !!props.color && !isIndicatorVisible.value
  );

  return {
    isIndicatorVisible,
    isWrapperHasBgColor
  };
}
