import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVModels } from '@vueuse/core';
import { FormRules, SelectOption } from 'naive-ui';
import { AuthPanel } from '@/shared/types/auth.types';
import { ruleRequired } from '@/shared/utils/validation-rules';
import { InternalNotificationCreateServiceEmits, InternalNotificationCreateServiceProps } from './internal-notification-create-service.types';

export default function useInternalNotificationCreateService(
  props: InternalNotificationCreateServiceProps,
  emit: InternalNotificationCreateServiceEmits
) {
  const models = useVModels(props, emit);
  const { t } = useI18n();

  const serviceTitle = computed<string>(
    () => props.service
      ? t(AuthPanel[props.service])
      : 'Выберите раздел'
  );

  const serviceOptions = computed<SelectOption[]>(
    () => {
      const options: SelectOption[] = [];

      Object.keys(AuthPanel).forEach(key => isNaN(+key)
        && options.push({
          label: t(key),
          value: AuthPanel[key]
        }));

      return options;
    }
  );

  const formRules: FormRules = {
    service: {
      trigger: 'change',
      validator: ruleRequired
    },
    title: {
      trigger: 'input',
      validator: ruleRequired
    },
    text: {
      trigger: 'input',
      validator: ruleRequired
    }
  };

  const handleDelete = () => emit('delete');

  const getFormItemPath = (
    path: string
  ): string => typeof props.index === 'number'
    ? `services[${props.index}].${path}`
    : path;

  return {
    ...models,
    serviceOptions,
    serviceTitle,
    formRules,
    handleDelete,
    getFormItemPath
  };
}
