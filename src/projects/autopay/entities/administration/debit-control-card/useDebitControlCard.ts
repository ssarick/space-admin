import { ISwitchListItemValue } from '@/shared/types/list.types';
import { IDebitControlItemValue } from '@/projects/autopay/shared/types/administration.types';
import { IEmits } from './debit-control-card.types';

export default function useDebitControlCard(
  emit: IEmits
) {
  const emitCheckDebitItem = (
    value: ISwitchListItemValue
  ) => emit(
    'check',
    value as IDebitControlItemValue
  );

  return {
    emitCheckDebitItem
  };
}
