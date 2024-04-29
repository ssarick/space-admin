import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { DataTableColumns, NSpace } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { DATE_VALUE_FORMAT, TIME_VALUE_FORMAT } from '@/shared/utils/constants/naive-constants';
import { formatDate } from '@/shared/utils/functions/date';
import type { MessageTemplateModel } from '@/projects/notification-service/shared/types/send-message.types';
import type { SendMessageTemplateTableEmits } from './send-messages-templates-table.types';

export default function useSendMessageTemplatesTable(
  emit: SendMessageTemplateTableEmits
) {
  const { t } = useI18n();
  const tableRef = useTableRef();

  const columns = computed<
    DataTableColumns<MessageTemplateModel>
  >(
    () => [
      {
        title: t('template-code'),
        key: 'code',
        width: 180
      },
      {
        title: t('Name2'),
        key: 'name',
        width: 220
      },
      {
        title: t('template-description'),
        key: 'description',
        width: 600
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
      }
    ]
  );

  const rowProps = (row: MessageTemplateModel) => {
    return {
      style: 'cursor: pointer',
      onClick: () => {
        emit('confirmModalData', row);
      }
    };
  };

  const onSearchValueChanged = (value?: string) => {
    emit('searchValueChange', value);
  };

  const rowKey = (row: MessageTemplateModel) => row.code;

  return {
    columns,
    rowProps,
    rowKey,
    onSearchValueChanged,
    tableRef
  };
}
