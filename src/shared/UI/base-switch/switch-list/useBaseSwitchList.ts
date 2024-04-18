import { useI18n } from 'vue-i18n';
import { SwitchListItem } from '@/shared/types/list.types';
import {
  IBaseSwitchListEmits,
  IBaseSwitchListProps
} from './base-switch-list.types';

export default function useBaseSwitchList(
  props: IBaseSwitchListProps,
  emit: IBaseSwitchListEmits
) {
  const { t } = useI18n();

  const emitCheckItem = (
    item: SwitchListItem | object,
    value: boolean
  ) => emit('check', {
    key: item[props.idKey!] as string,
    value
  });

  const getItemLabel = (
    item: SwitchListItem | object
  ): string | undefined => props.idKeyIsLocale
    ? t(item[props.idKey!])
    : (item as SwitchListItem).label;

  return {
    emitCheckItem,
    getItemLabel
  };
}
