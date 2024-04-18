import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { IAppMenuOption } from '../../app-layout-sider.types';

export default function useAuditLogsMenu():
  ComputedRef<IAppMenuOption[]> {
  const { t } = useI18n();

  return computed<IAppMenuOption[]>(() => [
    {
      label: t('LOGS_AUDIT'),
      key: 'logs-audit-list',
      icon: 'logs-unload'
    }
  ]);
}
