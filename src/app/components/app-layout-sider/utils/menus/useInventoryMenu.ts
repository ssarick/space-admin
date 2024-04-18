import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { IAppMenuOption } from '../../app-layout-sider.types';

export default function useInventoryMenu():
  ComputedRef<IAppMenuOption[]> {
  const { t } = useI18n();

  return computed<IAppMenuOption[]>(() => [
    {
      label: t('Users'),
      icon: 'clients',
      key: 'inventory-users-wrapper',
      route: {
        name: 'inventory-users'
      }
    },
    {
      label: t('inventory-sessions'),
      icon: 'settings',
      key: 'inventory-sessions-wrapper',
      route: {
        name: 'inventory-sessions'
      }
    }
  ]);
}
