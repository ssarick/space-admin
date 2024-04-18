import { AlertEmits } from './alert.types';

export default function useAlert(
  emit: AlertEmits
) {
  const emitClose = () => emit('close');
  const emitActionClick = () => emit('actionClick');

  return {
    emitActionClick,
    emitClose
  };
}
