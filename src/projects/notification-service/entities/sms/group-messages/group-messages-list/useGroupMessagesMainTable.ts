import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { DataTableColumns } from 'naive-ui';
import { NSpace } from 'naive-ui/es/space';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { DATE_VALUE_FORMAT, TIME_VALUE_FORMAT } from '@/shared/utils/constants/naive-constants';
import { formatDate } from '@/shared/utils/functions/date';
import {
  GroupMessagesClientInternal
} from '@/projects/notification-service/shared/types/group-messages.types';
import useStatusRenderer from './composables/useStatusRenderer';
import { GroupMessagesMainTableEmits } from './group-messages-main-table.types';

export default function useGroupMessagesMainTable(
  emit: GroupMessagesMainTableEmits
) {
  const { t } = useI18n();
  const tableRef = useTableRef();
  const router = useRouter();

  const {
    renderProgressOrStatus
  } = useStatusRenderer(emit);

  const columns = computed<
    DataTableColumns<GroupMessagesClientInternal>
  >(
    () => [
      {
        title: t('ID'),
        key: 'id',
        width: 100
      },
      {
        title: t('Initiator'),
        key: 'initiator',
        width: 140
      },
      {
        title: t('Text'),
        key: 'textPattern',
        width: 560,
        ellipsis: {
          tooltip: true
        }
      },
      {
        title: t('Data-of-creation'),
        key: 'createdDate',
        fixed: 'right',
        width: 170,
        render: (row: GroupMessagesClientInternal) => {
          return h(
            NSpace,
            {
              size: [ 20, 16 ]
            },
            {
              default: () => [
                h(
                  'span',
                  {},
                  formatDate(row.createdDate, DATE_VALUE_FORMAT)
                ),
                h(
                  'span', {
                    style: { color: '#808080' }
                  }, formatDate(row.createdDate, TIME_VALUE_FORMAT)
                )
              ]
            }
          );
        }
      },
      {
        title: t('Status'),
        key: 'massMailingStatus',
        fixed: 'right',
        width: 220,
        render: renderProgressOrStatus
      }
    ]);

  const rowProps = (
    row: GroupMessagesClientInternal
  ) => ({
    style: 'cursor: pointer',
    ondblclick: () => {
      router.push({
        name: 'grouped-message-info',
        params: {
          messageId: row.id
        }
      });
    }
  });

  const rowKey = (
    row: GroupMessagesClientInternal
  ) => row.id;

  return {
    columns,
    rowKey,
    tableRef,
    rowProps
  };
}
