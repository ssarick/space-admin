import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { IAppMenuOption } from '../../app-layout-sider.types';

export default function useISeeUMenu():
ComputedRef<IAppMenuOption[]> {
  const { t } = useI18n();

  return computed<IAppMenuOption[]>(() => [
    {
      label: t('entity'),
      key: 'entity',
      icon: 'clients'
    },
    {
      label: t('individual'),
      key: 'individual',
      icon: 'people'
    }
  ]);
}
