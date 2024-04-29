import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { IAppMenuOption } from '../../app-layout-sider.types';

export default function useControlPanelMenu():
ComputedRef<IAppMenuOption[]> {
  const { t } = useI18n();

  return computed<IAppMenuOption[]>(() => [
    {
      label: t('terminals-add'),
      icon: 'transactions',
      key: 'terminals-wrapper',
      route: {
        name: 'terminals-list'
      }
    }
    // {
    //   label: t('limits-add'),
    //   icon: 'transactions',
    //   key: 'limits-wrapper',
    //   route: {
    //     name: 'limits-create'
    //   }
    // },
    // {
    //   label: t('bins-add'),
    //   icon: 'transactions',
    //   key: 'bins-wrapper',
    //   route: {
    //     name: 'bins-create'
    //   }
    // },
    // {
    //   label: t('partners-add'),
    //   icon: 'transactions',
    //   key: 'partners-wrapper',
    //   route: {
    //     name: 'partners-create'
    //   }
    // }
  ]);
}
