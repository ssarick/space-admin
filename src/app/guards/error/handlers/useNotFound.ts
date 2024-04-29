import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { ErrorGuardStatus, IErrorGuard } from '../error-guard.types';

export default function useNotFound():
ComputedRef<IErrorGuard> {
  const { t } = useI18n();
  const route = useRoute();

  const result = computed<IErrorGuard>(() => ({
    title: t('Page-not-found'),
    description: t('Has-many-useful-pages'),
    status: ErrorGuardStatus.NOT_FOUND,
    handled: route.name === 'not-found'
  }));

  return result;
}
