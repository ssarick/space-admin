import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { ruleRequired } from '@/shared/utils/validation-rules';
import { ISignInFormEmit, ISignInFormProps } from './sign-in-form.types';

export default function useSignInForm(
  props: ISignInFormProps,
  emit: ISignInFormEmit
) {
  const {
    username,
    password,
    rememberMe
  } = useVModels(props, emit);

  const formRules: FormRules = {
    username: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    password: {
      trigger: [ 'input' ],
      validator: ruleRequired
    }
  };

  const {
    formRef,
    validateForm,
    restoreFormValidation
  } = useFormRefWithValidate();

  return {
    formRef,
    validateForm,
    restoreFormValidation,
    formRules,
    username,
    password,
    rememberMe
  };
}
