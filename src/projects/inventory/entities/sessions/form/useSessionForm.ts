import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { ruleRequired, ruleRequiredArray } from '@/shared/utils/validation-rules';
import type { SessionFormEmits, SessionFormProps } from './session-form.types';

export default function useSessionForm(
  props: SessionFormProps,
  emit: SessionFormEmits
) {
  const models = useVModels(props, emit);
  const formUtils = useFormRefWithValidate();

  const formRules: FormRules = {
    name: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    inventoryUserIds: {
      trigger: [ 'change' ],
      validator: ruleRequiredArray
    },
    officeId: {
      trigger: [ 'change' ],
      validator: ruleRequired
    }
  };

  return {
    formRules,
    ...models,
    ...formUtils
  };
}
