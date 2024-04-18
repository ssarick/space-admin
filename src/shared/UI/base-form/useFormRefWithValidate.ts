import useFormRef from './useFormRef';
import useFormValidate from './useFormValidate';

export default function useFormRefWithValidate() {
  const formRef = useFormRef();

  const {
    validateForm,
    restoreFormValidation
  } = useFormValidate(formRef);

  return {
    formRef,
    validateForm,
    restoreFormValidation
  };
}
