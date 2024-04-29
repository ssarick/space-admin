import {
  computed,
  onMounted,
  reactive,
  ref
} from 'vue';
import { useI18n } from 'vue-i18n';
import { IListItem } from '@/shared/types/common.types';
import AmountFormatter from '@/shared/utils/amount-formatter';
import { formatDate } from '@/shared/utils/functions/date';
import { ApiSubsidyApplication } from '@/projects/subsidy/shared/api';
import { SubsidyApplication } from '@/projects/subsidy/shared/types/application.types';
import { isEditableSubsidyStatus } from '@/projects/subsidy/shared/utils/status-utils';
import { ApplicationInfoProps } from './application-info.types';

export default function useApplicationForm(
  props: ApplicationInfoProps
) {
  const { t } = useI18n();
  const application = reactive<Partial<SubsidyApplication>>({
  });
  const loading = ref(false);

  const isEditable = computed<boolean>(() =>
    isEditableSubsidyStatus(application.status));

  const data = computed<IListItem[]>(() => [
    {
      name: 'Номер документа',
      subText: application.decision || '-'
    },
    {
      name: t('PINFL'),
      subText: application.pinfl || '-'
    },
    {
      name: 'Счет',
      subText: application.accExternal || '-'
    },
    {
      name: 'Сумма к оплате',
      subText: AmountFormatter
        .divideAndFormat(application.amountThisMonthTiyin, 'UZS')
    },
    {
      name: 'Остаток кредита',
      subText: AmountFormatter
        .divideAndFormat(application.restAmountTiyin, 'UZS')
    },
    {
      name: 'Сумма кредита',
      subText: AmountFormatter
        .divideAndFormat(application.creditAmountTiyin, 'UZS')
    },
    {
      name: 'День оплаты',
      subText: application.contractPaymentStartDate
        ? formatDate(
          application.contractPaymentStartDate
        )
        : '-'
    },
    {
      name: 'Дата выдачи',
      subText: application.percentagePaymentDate
        ? formatDate(
          application.percentagePaymentDate
        )
        : '-'
    },
    {
      name: 'Тип контракта',
      subText: application.contractTypeName
    }
  ]);

  const fetchApplication = async () => {
    loading.value = true;

    const { item, error } = await ApiSubsidyApplication
      .fetchApplicationItem({
        id: props.subsidyId
      });

    error || Object.assign(application, item);

    loading.value = false;
  };

  onMounted(fetchApplication);

  return {
    data,
    loading,
    isEditable
  };
}
