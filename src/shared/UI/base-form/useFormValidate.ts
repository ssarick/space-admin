import { FormInst } from 'naive-ui';
import { formValidate } from '@/shared/utils/functions';
import useFormRef from './useFormRef';

export default function useFormValidate(
  formRef: ReturnType<typeof useFormRef>
) {
  const validateForm = async () => formRef
    ?.value
    ?.validate();

  const restoreFormValidation = async () => formRef
    ?.value
    ?.restoreValidation();

  const checkFormHasError = async () =>
    formValidate(formRef.value as FormInst);

  return {
    validateForm,
    restoreFormValidation,
    checkFormHasError
  };
}
