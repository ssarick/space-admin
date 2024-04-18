import { toRefs } from 'vue';
import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { FIELD_MASK } from '@/shared/utils/constants/field-mask';
import { ruleRequired } from '@/shared/utils/validation-rules';
import { useBranchesStore } from '@/projects/b2b/app/store/useBranchesStore';
import { ruleLogin, rulePhone } from '@/projects/b2b/shared/utils/validation-rules';
import { IAdminCreationFormEmits, IAdminCreationFormProps } from './admin-creation-form.types';

export default function useAdminCreationForm(
  props: IAdminCreationFormProps,
  emit: IAdminCreationFormEmits
) {
  const models = useVModels(props, emit);
  const phoneFieldMask = FIELD_MASK.phone;

  const {
    branches,
    branchesLoading
  } = toRefs(useBranchesStore());

  const {
    formRef,
    validateForm,
    restoreFormValidation
  } = useFormRefWithValidate();

  const formRules: FormRules = {
    fio: {
      trigger: [ 'blur' ],
      validator: ruleRequired
    },
    roleId: {
      trigger: [ 'change' ],
      validator: ruleRequired
    },
    phone: {
      trigger: [ 'blur' ],
      validator: rulePhone
    },
    email: {
      trigger: [ 'blur' ],
      validator: ruleRequired
    },
    branch: {
      trigger: [ 'blur' ],
      validator: ruleRequired
    },
    login: {
      trigger: [ 'blur' ],
      validator: ruleLogin
    }
  };

  return {
    ...models,
    formRules,
    formRef,
    validateForm,
    restoreFormValidation,
    phoneFieldMask,
    branches,
    branchesLoading
  };
}
