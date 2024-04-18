import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { BaseLink, IListItem } from '@/shared/types/common.types';
import AmountFormatter from '@/shared/utils/amount-formatter';
import { formatDate } from '@/shared/utils/functions/date';
import { IContractDetailTableProps } from './contract-detail-table.types';

export default function useContractDetailTable(
  props: IContractDetailTableProps
) {
  const { t } = useI18n();

  const clientBorrowers = computed<BaseLink[]>(() => [
    {
      text: `ID ${props.contract?.borrowerId}`,
      name: 'contragent-detail',
      params: { id: props.contract?.borrowerId }
    }
  ]);

  const coBorrowers = computed<BaseLink[]>(() => props
    .coborrowers
    .map(id => ({
      name: 'contragent-detail',
      params: { id },
      text: `ID ${id}`
    }))
  );

  const data = computed<IListItem[]>(() => [
    {
      name: t('ID'),
      subText: props.contract?.contractId || ''
    },
    {
      name: t('Client-borrower'),
      links: clientBorrowers.value
    },
    {
      name: t('Co-borrowers'),
      links: coBorrowers.value
    },
    {
      name: t('Amount-of-the-deal'),
      subText: AmountFormatter.divideAndFormat(
        props.contract?.contractDebt, 'UZS'
      )
    },
    {
      name: t('Validity'),
      subText: formatDate(
        props.contract?.contractExpiryDate
      )
    },
    {
      name: t('Current-arrears'),
      subText: AmountFormatter.divideAndFormat(
        props.contract?.actualDebt, 'UZS'
      )
    }
  ]);

  return {
    clientBorrowers,
    coBorrowers,
    data
  };
}
