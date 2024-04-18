import { OperationTypeEmits } from '@/projects/cashier/features/operation-type/operation-type.types';
import { defaultOperationType, operationTypeOptions } from '@/projects/cashier/features/operation-type/utils';

export function useOperationType(
  emit: OperationTypeEmits
) {

  const choosenOption = ref<string>(defaultOperationType);

  const validateAndEmitToNextStep = () => {
    emit('selectOperationType', choosenOption.value);
  };

  return {
    operationTypeOptions,
    choosenOption,
    validateAndEmitToNextStep
  };
}
