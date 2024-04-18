import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { IListItem } from '@/shared/types/common.types';
import { formatDate } from '@/shared/utils/functions/date';
import { IContragentDetailTableProps } from './contragent-detail-table.types';

export default function useContragentDetailTable(
  props: IContragentDetailTableProps
) {
  const { t } = useI18n();

  const data = computed<IListItem[]>(() => [
    {
      name: t('ID'),
      subText: props.contragent?.id || ''
    },
    {
      name: t('PINFL'),
      subText: props.contragent?.pinfl
    },
    {
      name: t('TIN'),
      subText: props.contragent?.inn
    },
    {
      name: t('Surname'),
      subText: props.contragent?.surname
    },
    {
      name: t('Name'),
      subText: props.contragent?.name
    },
    {
      name: t('Patronymic'),
      subText: props.contragent?.patronymic
    },
    {
      name: t('Date-of-birth'),
      subText: formatDate(props.contragent?.dateBirth)
    },
    {
      name: t('Passport-series'),
      subText: props.contragent?.passport?.serialPrefix
    },
    {
      name: t('Passport-id'),
      subText: props.contragent?.passport?.serialNumber
    },
    {
      name: t('Passport-issue-date'),
      subText: formatDate(
        props.contragent?.passport?.issueDate
      )
    },
    {
      name: t('Passport-expiration-date'),
      subText: formatDate(
        props.contragent?.passport?.expiryDate
      )
    },
    {
      name: t('Phone-number'),
      subText: props.contragent?.phoneNumber
    }
  ]);

  return {
    data
  };
}
