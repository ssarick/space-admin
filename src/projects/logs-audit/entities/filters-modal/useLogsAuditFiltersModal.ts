
import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { ruleRequired } from '@/shared/utils/validation-rules';
import {
  LogsAuditFiltersModalEmits,
  LogsAuditFiltersModalProps
} from './logs-audit-filters-modal.types';

export default function useLogsAuditFiltersModal(
  props: LogsAuditFiltersModalProps,
  emit: LogsAuditFiltersModalEmits
) {
  const models = useVModels(props, emit);
  const formUtils = useFormRefWithValidate();

  const rules = computed<FormRules>(
    (): FormRules => props.isDatesRequired
      ? {
        dateFrom: {
          trigger: [ 'blur' ],
          validator: ruleRequired
        },
        dateTo: {
          trigger: [ 'blur' ],
          validator: ruleRequired
        }
      }
      : {
      }
  );

  const handleSubmit = () => emit('submit');

  return {
    ...models,
    ...formUtils,
    rules,
    handleSubmit
  };
}
