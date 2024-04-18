import { useI18n } from 'vue-i18n';
import { useVModels } from '@vueuse/core';
import { FormRules, SelectOption } from 'naive-ui';
import { UploadFileEvent } from '@/shared/types/common.types';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { FileMimeType } from '@/shared/utils/constants/file-mime-types';
import { ruleRequired } from '@/projects/autopay/shared/utils/validation-rules';
import {
  MessageLanguages,
  MessagePriority
} from '@/projects/notification-service/shared/utils/constants/enums';
import type {
  SendMessageToAllEmits,
  SendMessageToAllProps
} from './send-message-to-all.types';

export default function useSendMessageToAll(
  props: SendMessageToAllProps,
  emit: SendMessageToAllEmits
) {
  const { t } = useI18n();
  const formUtils = useFormRefWithValidate();
  const models = useVModels(props, emit);

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

  const handleFileUpload = async (
    { file: { file } }: UploadFileEvent
  ) => {
    emit('update:file', file);
  };

  const rules: FormRules = {
    priority: {
      validator: ruleRequired,
      trigger: [ 'change' ]
    },
    language: {
      validator: ruleRequired,
      trigger: [ 'change' ]
    },
    file: {
      validator: ruleRequired,
      trigger: [ 'input' ]
    }
  };

  const acceptFileTypes: FileMimeType[] = [
    FileMimeType.xls,
    FileMimeType.xlsx
  ];

  return {
    ...models,
    ...formUtils,
    rules,
    langOptions,
    priorityOptions,
    acceptFileTypes,
    handleFileUpload
  };
}
