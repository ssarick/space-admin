import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { IAppMenuOption } from '../../app-layout-sider.types';

export default function useSubsidyMenu():
  ComputedRef<IAppMenuOption[]> {
  const { t } = useI18n();

  return computed<IAppMenuOption[]>(() => [
    {
      label: t('SUBSIDY'),
      key: 'subsidy-applications-wrapper',
      route: {
        name: 'subsidy-applications'
      },
      icon: 'clients'
    }
  ]);
}
