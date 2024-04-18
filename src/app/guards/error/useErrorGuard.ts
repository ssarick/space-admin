import { computed } from 'vue';
import router from '@/app/router';
import { IErrorGuard } from './error-guard.types';
import useErrorHandlers from './handlers/useErrorHandlers';

export default function useErrorGuard() {
  const errorHandlers = useErrorHandlers();

  const error = computed(() => errorHandlers
    .find(handler => handler.value?.handled)
    ?.value);

  const redirectToMain = () => router
    .push('/');

  const onClickBtn = (error: IErrorGuard) =>
    (error.onClickBtn || redirectToMain)();

  return {
    error,
    onClickBtn
  };
}
