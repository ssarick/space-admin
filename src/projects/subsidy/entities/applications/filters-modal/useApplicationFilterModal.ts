
import { computed } from 'vue';
import { useVModels } from '@vueuse/core';
import { ISelectOption } from '@/shared/types/select.types';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { amountMaskOptions } from '@/shared/utils/mask';
import { SubsidyApplicationStatus } from '@/projects/subsidy/shared/types/application.types';
import {
  ApplicationFilterModalEmits,
  ApplicationFilterModalProps
} from './application-filter-modal.types';

export default function useApplicationFilterModal(
  props: ApplicationFilterModalProps,
  emit: ApplicationFilterModalEmits
) {
  const models = useVModels(props, emit);
  const formUtils = useFormRefWithValidate();
  const amountMask = amountMaskOptions;

  const statusOptions = computed<
    ISelectOption<SubsidyApplicationStatus>[]
  >(
    () => [
      {
        label: 'Создан',
        value: SubsidyApplicationStatus.CREATED
      },
      {
        label: 'В процессе отправки',
        value: SubsidyApplicationStatus.SENDING_PROCESS
      },
      {
        label: 'Ошибка валидации',
        value: SubsidyApplicationStatus.SENDING_ERROR
      },
      {
        label: 'В процессе валидации',
        value: SubsidyApplicationStatus.VALIDATE_MINFIN
      },
      {
        label: 'Дубликат в Минфин',
        value: SubsidyApplicationStatus.DUPLICATE_MINFIN
      },
      {
        label: 'Отправлен в Минфин',
        value: SubsidyApplicationStatus.SENT_MINFIN
      }
    ]
  );

  const toggleModelValue = () => {
    models.modelValue!.value = !models.modelValue!.value;
  };

  const handleSubmit = () => {
    emit('submit');
    toggleModelValue();
  };

  return {
    ...models,
    ...formUtils,
    statusOptions,
    amountMask,
    toggleModelValue,
    handleSubmit
  };
}
