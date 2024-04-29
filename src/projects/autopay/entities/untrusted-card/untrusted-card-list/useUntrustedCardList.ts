import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { NCheckbox } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { ICard } from '@/projects/autopay/shared/types/card.types';
import { IUntrustedCardsListEmits, IUntrustedCardsListProps } from './untrusted-cards-list.types';

export default function useUntrustedCardList(
  props: IUntrustedCardsListProps,
  emit: IUntrustedCardsListEmits
) {
  const { t } = useI18n();
  const tableRef = useTableRef();

  const searchForCheckedValues = (id) => {
    return props.checkedValues.indexOf(id) !== -1;
  };

  const tableRowClick = (row: ICard) => {
    emit('rowClick', row);
  };

  const columns = computed(() => [
    {
      key: 'check',
      width: 80,
      render: (row: ICard) => {
        return h(NCheckbox, {
          checked: searchForCheckedValues(row.id)
        });
      }
    },
    {
      title: 'ID',
      key: 'id',
      render: (row: ICard) =>
        row.id || ''
    },
    {
      title: t('Contract ID'),
      key: 'contractId',
      render: (row: ICard) =>
        row.contractId || ''
    },
    {
      title: t('Owner ID'),
      key: 'clientId',
      render: (row: ICard) =>
        row.clientId || ''
    },
    {
      title: t('Owner Full Name'),
      key: 'clientName',
      width: 190,
      render: (row: ICard) =>
        row.clientName || ''
    },
    {
      title: t('Genesis Full Name'),
      key: 'genesisName',
      width: 190,
      render: (row: ICard) =>
        row.genesisName || ''
    },
    {
      title: t('Сoincidence'),
      key: 'similarity',
      render: (row: ICard) =>
        `${row.similarity}%` || ''
    },
    {
      title: t('Status'),
      key: 'status',
      render: (row: ICard) =>
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
