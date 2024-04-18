import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { ErrorGuardStatus, IErrorGuard } from '../error-guard.types';

export default function useForbidden(): ComputedRef<IErrorGuard> {
  const { t } = useI18n();

  const result = computed<IErrorGuard>(() => ({
    title: t('Forbidden-title'),
    description: t('Forbidden-text'),
    status: ErrorGuardStatus.FORBIDDEN,
    handled: false // TODO
  }));

  return result;
}
