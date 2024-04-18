import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { ruleSemver } from '@/shared/utils/validation-rules';
import { InternalNotificationCreateFormEmits, InternalNotificationCreateFormProps } from './internal-notification-create-form.types';

export default function useInternalNotificationCreateForm(
  props: InternalNotificationCreateFormProps,
  emit: InternalNotificationCreateFormEmits
) {
  const models = useVModels(props, emit);
  const formUtils = useFormRefWithValidate();

  const rules = computed<FormRules>(() => ({
    version: {
      trigger: 'input',
      validator: ruleSemver
    }
  }));

  const handleSubmit = () => emit('submit');

  const handleAddService = () => emit('addService');

  return {
    ...models,
    ...formUtils,
    rules,
    handleSubmit,
    handleAddService
  };
}
