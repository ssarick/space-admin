import { useVModel } from '@vueuse/core';
import { FormRules, SelectOption } from 'naive-ui';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import { amountMaskOptions } from '@/shared/utils/mask';
import {
  ITransactionFilterModalEmits,
  ITransactionFilterModalProps
} from '@/projects/autopay/entities/transaction/transaction-filter-modal/transaction-filter-modal.types';
import { ProcessingType } from '@/projects/autopay/shared/types/administration.types';
import {
  ruleBorrowerId,
  ruleContractId,
  rulePanMaskedLastNumbers,
  rulePassportSeriesAndNumber,
  ruleProperSum
} from '@/projects/autopay/shared/utils/validation-rules';

export default function useTransactionFilterModal(
  props: ITransactionFilterModalProps,
  emit: ITransactionFilterModalEmits
) {
  const formRef = useFormRef();

  const isModalOpen = useVModel(
    props, 'showModal', emit
  );

  const statusOptions: SelectOption[] = [
    {
      label: 'HOLD',
      value: 'HOLD'
    },
    {
      label: 'PERFORMED',
      value: 'PERFORMED'
    },
    {
      label: 'CANCELLED',
      value: 'CANCELLED'
    },
    {
      label: 'REVERSED',
      value: 'REVERSED'
    }
  ];
  const sourceOptions = [
    {
      label: 'Genesis Uzcard',
      value: ProcessingType.AUTO_PAY_UZCARD
    },
    {
      label: 'Uzcard',
      value: ProcessingType.UZCARD
    },
    {
      label: 'Humo',
      value: ProcessingType.HUMO
    },
    {
      label: 'ABS',
      value: ProcessingType.ABS
    }
  ];
  const checkOptions = [
    {
      label: 'Да',
      value: 'yes'
    },
    {
      label: 'Нет',
      value: 'no'
    }
  ];

  const rules: FormRules = {
    contractId: {
      validator: ruleContractId,
      trigger: [ 'input', 'blur' ]
    },
    cardHolderId: {
      validator: ruleBorrowerId,
      trigger: [ 'input', 'blur' ]
    },
    amountFrom: {
      validator: ruleProperSum,
      trigger: [ 'input', 'blur' ]
    },
    amountTo: {
      validator: ruleProperSum,
      trigger: [ 'input', 'blur' ]
    },
    passport: {
      validator: rulePassportSeriesAndNumber,
      trigger: [ 'blur', 'input' ]
    },
    panMaskedLastNumbers: {
      validator: rulePanMaskedLastNumbers,
      trigger: [ 'blur', 'input' ]
    }
  };

  function showModal() {
    isModalOpen.value = true;
  }

  const submitFilterModal = async ($event) => {
    const hasError = await formValidate(formRef.value);

    if (!hasError) {
      emit('submitFilterModal', $event);
    }
  };

  const maskOptions = amountMaskOptions;

  return {
    isModalOpen,
    showModal,
    rules,
    statusOptions,
    sourceOptions,
    checkOptions,
    submitFilterModal,
    formRef,
    maskOptions
  };
}
