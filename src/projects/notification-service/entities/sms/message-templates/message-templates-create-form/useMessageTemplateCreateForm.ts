import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { ruleRequired } from '@/shared/utils/validation-rules';
import type { MessageTemplateCreateFormEmits, MessageTemplateCreateFormProps } from './message-template-create-form.types';

export default function useMessageTemplateCreateForm(
  props: MessageTemplateCreateFormProps,
  emit: MessageTemplateCreateFormEmits
) {
  const models = useVModels(props, emit);
  const formUtils = useFormRefWithValidate();

  const formRules: FormRules = {
    name: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    description: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    code: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    titleRu: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    titleUz: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    textRu: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    textUz: {
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
