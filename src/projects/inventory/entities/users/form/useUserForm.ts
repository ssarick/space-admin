import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { FIELD_MASK } from '@/shared/utils/constants/field-mask';
import {
  rulePassword,
  ruleRequired
} from '@/shared/utils/validation-rules';
import { rulePhone } from '@/projects/b2b/shared/utils/validation-rules';
import type { UserFormEmits, UserFormProps } from './user-form.types';

export default function useUserForm(
  props: UserFormProps,
  emit: UserFormEmits
) {
  const models = useVModels(props, emit);
  const formUtils = useFormRefWithValidate();
  const phoneFieldMask = FIELD_MASK.phone;

  const formRules: FormRules = {
    fullName: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    phoneNumber: {
      trigger: [ 'input' ],
      validator: rulePhone
    },
    userName: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    email: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    password: {
      trigger: [ 'input' ],
      validator: rulePassword
    }
  };

  return {
    ...models,
    ...formUtils,
    phoneFieldMask,
    formRules
  };
}
