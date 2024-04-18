import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { IAppMenuOption } from '../../app-layout-sider.types';

export default function useBindedFaceMenu():
  ComputedRef<IAppMenuOption[]> {
  const { t } = useI18n();

  return computed<IAppMenuOption[]>(() => [
    {
      label: t('BINDED_FACE'),
      icon: 'clients',
      key: 'binded-face-list'
    }
  ]);
}
