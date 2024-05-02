import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { ruleRequired } from '@/shared/utils/validation-rules';
import { ISignUpFormEmit, ISignUpFormProps } from './sign-up-form.types';

export default function useSignUpForm(
  props: ISignUpFormProps,
  emit: ISignUpFormEmit
) {
  const {
    username,
    password
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

  const goToSignIn = () => {
    emit('showRegister', false);
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
    goToSignIn,
    formRules,
    username,
    password
  };
}
