import { ref, watch } from 'vue';
import { useVModel } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import AmountFormatter from '@/shared/utils/amount-formatter';
import { formValidate } from '@/shared/utils/functions';
import { wholeAmountMaskOptions } from '@/shared/utils/mask';
import { ruleProperSum } from '@/projects/autopay/shared/utils/validation-rules';
import {
  IEmits,
  ILimitEditFormModel,
  IProps
} from './limit-edit-modal.types';

export default function useLimitEditModal(
  props: IProps,
  emit: IEmits
) {
  const isOpen = useVModel(
    props, 'modelValue', emit
  );

  const formRef = useFormRef();

  const formModel = ref<ILimitEditFormModel>({
    limit: getLimitFromProps()
  });

  const amountMask = wholeAmountMaskOptions;

  const rules: FormRules = {
    limit: {
      trigger: [ 'blur' ],
      validator: ruleProperSum
    }
  };

  const closeModal = () =>
    isOpen.value = false;

  const syncFormModelWithProps = () => {
    formModel.value = {
      limit: getLimitFromProps()
    };
  };

  const onSubmit = async () => {
    const hasError = await formValidate(
      formRef.value
    );

    if (!hasError && props.limit?.type) {
      emit('edit', {
        type: props.limit.type,
        limit: AmountFormatter
          .multiplyAndRound(
            AmountFormatter
              .toAmount(formModel.value.limit)
          )
      });
    }

    closeModal();
  };

  function getLimitFromProps() {
    return String(
      AmountFormatter.divide(
        props.limit?.limit || 0
      )
    );
  }

  watch(
    () => props.limit,
    syncFormModelWithProps
  );

  return {
    isOpen,
    closeModal,
    amountMask,
    rules,
    formModel,
    onSubmit,
    formRef
  };
}
