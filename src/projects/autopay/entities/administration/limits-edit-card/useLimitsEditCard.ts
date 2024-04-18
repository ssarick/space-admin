import { ILimitWithOptions } from '@/projects/autopay/shared/types/administration.types';
import { IEmits } from './limits-edit-card.types';

export default function useLimitsEditCard(
  emit: IEmits
) {
  const emitEditLimit = (
    limit: ILimitWithOptions
  ) => emit(
    'edit', limit
  );

  return {
    emitEditLimit
  };
}
