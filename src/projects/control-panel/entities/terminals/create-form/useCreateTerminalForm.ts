import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import {
  ruleRequired
} from '@/shared/utils/validation-rules';
import type { CreateTerminalFormEmits, CreateTerminalFormProps } from './create-terminal-form.types';

export default function useCreateTerminalForm(
  props: CreateTerminalFormProps,
  emit: CreateTerminalFormEmits
) {
  const models = useVModels(props, emit);
  const formUtils = useFormRefWithValidate();

  const formRules: FormRules = {
    name: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    port: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    partner: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    operationType: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    merchantId: {
      trigger: [ 'input' ],
      validator: ruleRequired
    }
  };

  return {
    ...models,
    ...formUtils,
    formRules
  };
}
