import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVModels } from '@vueuse/core';
import { SelectOption } from 'naive-ui';
import { FIELD_MASK } from '@/shared/utils/constants/field-mask';
import { LogEntityType, LogType } from '@/projects/b2b/shared/types/log.types';
import { ILogsFilterEmits, ILogsFilterProps } from './logs-filter.types';

export default function useLogsFilter(
  props: ILogsFilterProps,
  emit: ILogsFilterEmits
) {
  const models = useVModels(props, emit);
  const { t } = useI18n();
  const phoneFieldMask = FIELD_MASK.phone;
  const datePeriodIsVisible = ref(false);

  const logTypeOptions = computed<
    SelectOption[]
  >(() => [
    {
      label: t('Для прокуратуры'),
      value: LogType.PROSECUTORS
    },
    {
      label: t('История действий'),
      value: LogType.ACTIONS_HISTORY,
      disabled: true
    }
  ]);

  const logEntityTypeOptions = computed<
    SelectOption[]
  >(() => [
    {
      label: t('Клиент'),
      value: LogEntityType.CLIENT
    },
    {
      label: t('Пользователь'),
      value: LogEntityType.USER
    }
  ]);

  const onClearDatePeriod = () => {
    if (!models.datePeriod) return;

    const now = Date.now();

    models.datePeriod.value = [ now, now ];
    datePeriodIsVisible.value = false;
  };

  const onSelectAllDatePeriod = () => {
    if (!models.datePeriod) return;

    models.datePeriod.value = [
      new Date(2020, 0, 1).getTime(),
      Date.now()
    ];

    datePeriodIsVisible.value = false;
  };

  return {
    ...models,
    logTypeOptions,
    logEntityTypeOptions,
    phoneFieldMask,
    onClearDatePeriod,
    onSelectAllDatePeriod,
    datePeriodIsVisible
  };
}
