import { useVModel } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import {
  IUntrustedCardsFilterList, IUntrustedCardsModalEmits
} from '@/projects/autopay/entities/untrusted-card/untrusted-card-filter-modal/untrusted-cards-filter-modal.types';
import {
  ruleCoincidence,
  ruleContractId,
  ruleOwnerId
} from '@/projects/autopay/shared/utils/validation-rules';

export default function useUntrustedFilterModal(
  props: IUntrustedCardsFilterList,
  emit: IUntrustedCardsModalEmits
) {
  const formRef = useFormRef();

  const isModalOpen = useVModel(
    props, 'showModal', emit
  );

  function showModal() {
    isModalOpen.value = true;
  }

  const rules: FormRules = {
    contractId: {
      validator: ruleContractId,
      trigger: [ 'input', 'blur' ]
    },
    ownerId: {
      validator: ruleOwnerId,
      trigger: [ 'input', 'blur' ]
    },
    coincidence: {
      validator: ruleCoincidence,
      trigger: [ 'input', 'blur' ]
    }
  };
  const statusOptions = [
    {
      label: 'На рассмотрении',
      value: 'CREATED'
    },
    {
      label: 'Утвержден',
      value: 'CORRECTED'
    },
    {
      label: 'Отклонен',
      value: 'DECLINED'
    }
  ];

  const onFilterSubmit = async ($event: SubmitEvent) => {
    const hasError = await formValidate(formRef.value);
    if (!hasError) {
      emit('submitFilterModal', $event);
    }
  };

  return {
    isModalOpen,
    showModal,
    rules,
    formRef,
    statusOptions,
    onFilterSubmit
  };
}
