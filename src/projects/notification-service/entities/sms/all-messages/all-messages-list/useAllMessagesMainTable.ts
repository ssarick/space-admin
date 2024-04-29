import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { DataTableColumns, NSpace } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { BaseStatusItem } from '@/shared/UI/base-status';
import { DATE_VALUE_FORMAT, TIME_VALUE_FORMAT } from '@/shared/utils/constants/naive-constants';
import { formatDate } from '@/shared/utils/functions/date';
import type { AllMessagesClient } from '@/projects/notification-service/shared/types/all-messages.types';
import { MessagesStatusMap } from '@/projects/notification-service/shared/utils/constants/status-map';

export default function useAllMessagesMainTable() {
  const { t } = useI18n();
  const tableRef = useTableRef();

  const columns = computed<
    DataTableColumns<AllMessagesClient>
  >(
    () => [
      {
        title: t('ID'),
        key: 'id',
        width: 140,
        ellipsis: {
          tooltip: true
        }
      },
      {
        title: t('Number'),
        key: 'addressRecipient',
        width: 140
      },
      {
        title: t('Sender'),
        key: 'sentBy',
        width: 140
      },
      {
        title: t('Text'),
        key: 'text',
        width: 340,
        ellipsis: {
          tooltip: true
        }
      },
      {
        title: t('Data-of-creation'),
        key: 'createdDate',
        fixed: 'right',
        width: 170,
        render: (row) => {
          return h(
            NSpace,
            {
              align: 'center',
              justify: 'center',
              size: [ 20, 16 ]
            },
            {
              default: () => [
                h(
                  'span',
                  {
                  },
                  formatDate(row.createdDate, DATE_VALUE_FORMAT)
                ),
                h(
                  'span', {
                    style: {
                      color: '#808080'
                    }
                  }, formatDate(row.createdDate, TIME_VALUE_FORMAT)
                )
              ]
            }
          );
        }
      },
      {
        title: t('Status'),
        key: 'status',
        fixed: 'right',
        width: 180,
        render: (row) => h(
          BaseStatusItem,
          {
            label: t(`${getStatusProps(row)?.value}`),
            color: getStatusProps(row)?.color,
            type: 'filled'
          }
        )
      }
    ]
  );

  const rowKey = (row: AllMessagesClient) => row.id;

  const getStatusProps = (row: AllMessagesClient) => {
    return MessagesStatusMap.find(
      item => item.value === row.status
    );
  };

  return {
    columns,
    rowKey,
    tableRef
  };
}
