import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVModels } from '@vueuse/core';
import { DataTableColumns, NRadio } from 'naive-ui';
import { formatDate } from '@/shared/utils/functions/date';
import { IClient } from '@/projects/b2b/shared/types/client.types';
import { stateMap } from '@/projects/b2b/shared/utils/constants';
import { ILogsClientTableEmits, ILogsClientTableProps } from './logs-client-table.types';

export default function useLogsClientTable(
  props: ILogsClientTableProps,
  emit: ILogsClientTableEmits
) {
  const models = useVModels(props, emit);
  const { t } = useI18n();

  const columns = computed<DataTableColumns<IClient>>(() => [
    {
      key: 'radio',
      render: (row: IClient) => {
        return h(NRadio, {
          checked: models
            .selected
            ?.value
            ?.inn === row.inn
        });
      },
      width: 36
    },
    {
      title: t('Client-code'),
      key: 'clientCode'
    },
    {
      title: `${t('INN')}\n${t('Pinfl')}`,
      key: 'inn',
      render: (row: IClient) =>
        row.inn && row.pinfl
          ? `${row.inn}\n${row.pinfl}`
          : (row.inn || row.pinfl || '-')
    },
    {
      title: t('Name2'),
      key: 'clientName'
    },
    {
      title: t('Data-of-creation'),
      key: 'fillDate',
      render: (row: IClient) =>
        formatDate(row.fillDate || '')
    },
    {
      title: t('Status'),
      key: 'stateReason',
      render(row: IClient) {
        return stateMap.value[row.stateId!];
      }
    }
  ]);

  const rowKey = (row: IClient) => row.inn
    || Math.random();

  const onRowClick = (row: IClient) =>
    models.selected
      && (models.selected.value = { ...row });

  return {
    ...models,
    columns,
    rowKey,
    onRowClick
  };
}
