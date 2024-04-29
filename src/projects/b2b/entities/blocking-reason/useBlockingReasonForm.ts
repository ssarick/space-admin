import { useVModel } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { ruleRequired } from '@/shared/utils/validation-rules';
import { IBlockingReason } from '@/projects/b2b/shared/types/reason.types';
import {
  IBlockingReasonFormEmits,
  IBlockingReasonFormProps
} from './blocking-reason-form.types';

export default function useBlockingReasonForm(
  props: IBlockingReasonFormProps,
  emit: IBlockingReasonFormEmits
) {
  const reasonId = useVModel(props, 'reasonId', emit);

  const {
    formRef,
    validateForm,
    restoreFormValidation
  } =
    useFormRefWithValidate();

  const blockingReasonFormRules: FormRules = {
    reasonId: {
      trigger: [ 'change', 'blur' ],
      validator: ruleRequired
    }
  };

  const onSelectBlockingReason = (reason?: IBlockingReason) =>
    emit('update:reasonText', reason?.reasonDesc || '');

  return {
    blockingReasonFormRules,
    onSelectBlockingReason,
    validateForm,
    formRef,
    restoreFormValidation,
    reasonId
  };
}
