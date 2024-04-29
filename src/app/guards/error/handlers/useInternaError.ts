import {
  computed,
  ComputedRef,
  onErrorCaptured,
  ref,
  watch
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { ErrorGuardStatus, IErrorGuard } from '../error-guard.types';

export default function useInternalError():
ComputedRef<IErrorGuard> {
  const { t } = useI18n();
  const hasInternalError = ref(false);
  const route = useRoute();

  const resetInternalError = () =>
    hasInternalError.value = false;

  const result = computed<IErrorGuard>(() => ({
    title: t('Internal-error'),
    description: t('Please-repeat-later'),
    status: ErrorGuardStatus.INTERNAL_ERROR,
    handled: hasInternalError.value,
    onClickBtn: resetInternalError
  }));

  watch(() => route.name, resetInternalError);

  onErrorCaptured(() => {
    hasInternalError.value = true;
  });

  return result;
}
