import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVModels } from '@vueuse/core';
import { DataTableColumns, NRadio } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { formatPhoneNumber } from '@/shared/utils/functions';
import { formatDate } from '@/shared/utils/functions/date';
import { IUser } from '@/projects/b2b/shared/types/user.types';
import { stateMap } from '@/projects/b2b/shared/utils/constants';
import { ILogsUserTableEmits, ILogsUserTableProps } from './logs-user-table.types';

export default function useLogsUserTable(
  props: ILogsUserTableProps,
  emit: ILogsUserTableEmits
) {
  const models = useVModels(props, emit);
  const tableRef = useTableRef();
  const { t } = useI18n();

  const columns = computed<DataTableColumns<IUser>>(() => [
    {
      key: 'radio',
      render: (row: IUser) => {
        return h(NRadio, {
          checked: models
            .selected
            ?.value
            ?.userId === row.userId
        });
      },
      width: 36
    },
    {
      title: t('Full-name-short'),
      key: 'fio'
    },
    {
      title: t('Login'),
      key: 'login'
    },
    {
      title: t('Phone'),
      key: 'phone',
      render(row: IUser) {
        return formatPhoneNumber(row.phone || '');
      }
    },
    {
      title: t('E-mail'),
      key: 'email'
    },
    {
      title: t('Data-of-creation'),
      key: 'createDate',
      render: (row: IUser) => formatDate(row.createDate || '')
    },
    {
      title: t('Status'),
      key: 'stateId',
      render(row: IUser) {
        return stateMap.value[row.stateId!];
      }
    }
  ]);

  const rowKey = (row: IUser) => row.userId
    || Math.random();

  const onRowClick = (row: IUser) =>
    models.selected
      && (models.selected.value = { ...row });

  return {
    ...models,
    columns,
    rowKey,
    onRowClick,
    tableRef
  };
}
