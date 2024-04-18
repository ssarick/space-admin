import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { IAppMenuOption } from '@/app/components/app-layout-sider/app-layout-sider.types';

export default function useCashierMenu() {
  const { t } = useI18n();

  return computed<IAppMenuOption[]>(() => [
    {
      label: t('cashier-operations'),
      key: 'cashier-operations',
      icon: 'operations'
    }
  ]);
}
