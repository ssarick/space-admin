import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { ruleRequired } from '@/shared/utils/validation-rules';
import {
  IAdminStateFormEmits,
  IAdminStateFormProps
} from './admin-state-form.types';

export default function useAdminStateForm(
  props: IAdminStateFormProps,
  emit: IAdminStateFormEmits
) {
  const models = useVModels(props, emit);

  const {
    formRef,
    validateForm,
    restoreFormValidation
  } = useFormRefWithValidate();

  const formRules: FormRules = {
    stateBlockingReasonId: {
      trigger: [ 'change', 'blur' ],
      validator: ruleRequired
    }
  };

  const onChangeState = () =>
    emit('change-state');

  return {
    ...models,
    formRef,
    validateForm,
    restoreFormValidation,
    formRules,
    onChangeState
  };
}
