import { computed, toRefs } from 'vue';
import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import { IDictionaryCommon } from '@/shared/types/common.types';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { FIELD_MASK } from '@/shared/utils/constants/field-mask';
import { ruleRequired } from '@/shared/utils/validation-rules';
import { useBranchesStore } from '@/projects/b2b/app/store/useBranchesStore';
import { ruleLogin, rulePhone } from '@/projects/b2b/shared/utils/validation-rules';
import { IAdminEditFormEmits, IAdminEditFormProps } from './admin-edit-form.types';

export default function useAdminEditForm(
  props: IAdminEditFormProps,
  emit: IAdminEditFormEmits
) {
  const models = useVModels(props, emit);
  const phoneFieldMask = FIELD_MASK.phone;
  const { branches, branchesLoading } = toRefs(useBranchesStore());

  const isForm = computed<boolean>(() =>
    !!(props.data && props.isEdit));

  const currentRole = computed<IDictionaryCommon | null>(
    () => props.roleId
      ? {
        id: props.roleId,
        name: props.data?.userRoleName
      }
      : null
  );

  const { formRef, validateForm, restoreFormValidation } =
    useFormRefWithValidate();

  const formRules: FormRules = {
    fio: {
      trigger: [ 'blur' ],
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
    formRef,
    validateForm,
    isForm,
    restoreFormValidation,
    formRules,
    phoneFieldMask,
    currentRole,
    branches,
    branchesLoading
  };
}
