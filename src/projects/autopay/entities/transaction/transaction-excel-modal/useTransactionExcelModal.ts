import { useI18n } from 'vue-i18n';
import { useVModel } from '@vueuse/core';
import {
  FormRules, useMessage
} from 'naive-ui';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import dateShortcuts from '@/shared/utils/constants/date-shortcuts';
import { formValidate } from '@/shared/utils/functions';
import { amountMaskOptions } from '@/shared/utils/mask';
import {
  ITransactionExcelModalEmits,
  ITransactionExcelModalProps
} from '@/projects/autopay/entities/transaction/transaction-excel-modal//transaction-excel-modal.types';
import { ProcessingType } from '@/projects/autopay/shared/types/administration.types';
import {
  ruleContractId,
  ruleProperSum, ruleRequired
} from '@/projects/autopay/shared/utils/validation-rules';

export default function useTransactionExcelModal(
  props: ITransactionExcelModalProps,
  emit: ITransactionExcelModalEmits
) {
  const { t } = useI18n();
  const formRef = useFormRef();
  const message = useMessage();

  const isModalOpen = useVModel(
    props, 'showModal', emit
  );
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

  const rules: FormRules = {
    contractId: {
      validator: ruleContractId,
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
    dateFrom: {
      validator: ruleRequired,
      trigger: [ 'input', 'blur' ]
    },
    dateTo: {
      validator: ruleRequired,
      trigger: [ 'input', 'blur' ]
    }

  };

  function showModal() {
    isModalOpen.value = true;
  }

  const submitFilterModal = async ($event) => {
    const hasError = await formValidate(formRef.value);
    if ((props.formValue.dateTo as number) < (props.formValue.dateFrom as number)) {
      message.error(t('date to should be higher than date from'));
      return;
    }
    if (((props.formValue.dateTo as number) - (props.formValue.dateFrom as number)) > dateShortcuts.MS_IN_MONTH) {
      message.error(t('maximum date range is 31 days'));
      return;
    }
    if (!hasError) {
      emit('submitExcelModal', $event);
    }
  };

  const maskOptions = amountMaskOptions;

  const onRemoveProcessingType = (
    value: string
  ) => {
    emit(
      'update:processingTypes',
      props.formValue.processingTypes.filter(
        item => item !== value
      )
    );
  };

  return {
    isModalOpen,
    showModal,
    rules,
    sourceOptions,
    submitFilterModal,
    formRef,
    maskOptions,
    onRemoveProcessingType
  };

}
