import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { DataTableColumn, NCheckbox } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { IHumoCard } from '@/projects/autopay/shared/types/card.types';
import { IUntrustedCardsListEmits, IUntrustedCardsListProps } from './untrusted-humo-cards-list.types';

export default function useUntrustedCardList(
  props: IUntrustedCardsListProps,
  emit: IUntrustedCardsListEmits
) {
  const { t } = useI18n();
  const tableRef = useTableRef();

  const searchForCheckedValues = (id) => {
    return props.checkedValues.indexOf(id) !== -1;
  };

  const tableRowClick = (row: IHumoCard) => {
    emit('rowClick', row);
  };

  const columns = computed<DataTableColumn<IHumoCard>[]>(() => [
    {
      key: 'check',
      width: 80,
      render: (row: IHumoCard) => {
        return h(NCheckbox, {
          checked: searchForCheckedValues(row.id)
        });
      }
    },
    {
      title: 'ID',
      key: 'id',
      render: (row: IHumoCard) =>
        row.id || ''
    },
    {
      title: t('Owner ID'),
      key: 'cardHolderId',
      render: (row: IHumoCard) =>
        row.cardHolderId || ''
    },
    {
      title: t('Owner Full Name'),
      key: 'nameOnBank',
      width: 190,
      render: (row: IHumoCard) =>
        row.nameOnBank || ''
    },
    {
      title: t('Card-full-name'),
      key: 'nameOnCard',
      width: 190,
      render: (row: IHumoCard) =>
        row.nameOnCard || ''
    },
    {
      title: t('Сoincidence'),
      key: 'similarity',
      render: (row: IHumoCard) =>
        `${row.similarity}%` || ''
    },
    {
      title: t('Status'),
      key: 'status',
      render: (row: IHumoCard) =>
        row.status || ''
    }
  ]);

  const updateTable = () => {
    emit('update');
  };

  return {
    tableRef,
    columns,
    updateTable,
    tableRowClick
  };
}
