import { useI18n } from 'vue-i18n';
import { useVModels } from '@vueuse/core';
import { FormRules, SelectOption } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { FIELD_MASK } from '@/shared/utils/constants/field-mask';
import { ruleRequired } from '@/projects/autopay/shared/utils/validation-rules';
import { SendMessageInput } from '@/projects/notification-service/shared/types/send-message.types.ts';
import {
  MessageLanguages,
  MessagePriority
} from '@/projects/notification-service/shared/utils/constants/enums';
import type {
  SendMessageToOneEmits,
  SendMessageToOneProps
} from './send-message-to-one.types';

export default function useSendMessageToOne(
  props: SendMessageToOneProps,
  emit: SendMessageToOneEmits
) {
  const { t } = useI18n();
  const models = useVModels(props, emit);
  const formUtils = useFormRefWithValidate();

  const langOptions = computed<
    SelectOption[]
  >(() => [
    {
      label: t('ru'),
      value: MessageLanguages.RU
    },
    {
      label: t('uz'),
      value: MessageLanguages.UZ
    }
  ]);

  const priorityOptions = computed<
    SelectOption[]
  >(() => [
    {
      label: t('low'),
      value: MessagePriority.LOW
    },
    {
      label: t('medium'),
      value: MessagePriority.MEDIUM
    },
    {
      label: t('high'),
      value: MessagePriority.HIGH
    }
  ]);

  const rules = computed<
    FormRules
  >(() => ({
    ...generateRules(props.parameters)
  }));

  const phoneFieldMask = FIELD_MASK.phone;
  const defaultRules: FormRules = {
    priority: {
      validator: ruleRequired,
      trigger: [ 'change' ]
    },
    language: {
      validator: ruleRequired,
      trigger: [ 'change' ]
    },
    to: {
      validator: ruleRequired,
      trigger: [ 'input' ]
    }
  };

  const handleEventForParams = (key: string | number, value: string) => {
    emit('changeValuesForParameters', key, value);
  };

  const generateRules = (parameters?: SendMessageInput['parameters']): FormRules => {
    const rules: FormRules = {
    };

    for (const key in parameters) {
      rules[key] = {
        validator: ruleRequired,
        trigger: [ 'input' ]
      };
    }

    return Object.assign(defaultRules, {
      ...defaultRules,
      parameters: {
        ...rules
      }
    });
  };

  return {
    ...models,
    ...formUtils,
    rules,
    langOptions,
    priorityOptions,
    phoneFieldMask,
    handleEventForParams
  };
}
