import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { IAppMenuOption } from '../../app-layout-sider.types';

export default function useB2bMenu(): ComputedRef<IAppMenuOption[]> {
  const { t } = useI18n();

  return computed<IAppMenuOption[]>(() => [
    {
      label: t('SMS'),
      key: 'sms',
      icon: 'dashboard',
      children: [
        {
          label: t('all-messages'),
          key: 'all-messages'
        },
        {
          label: t('grouped-messages'),
          key: 'grouped-messages'
        },
        {
          label: t('send-message'),
          key: 'send-message'
        },
        {
          label: t('message-templates'),
          key: 'message-templates'
        }
      ]
    }
  ]);
}
