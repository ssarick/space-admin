import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  DataTableColumns,
  NButton,
  NPopover,
  NSpace
} from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { DATE_VALUE_FORMAT, TIME_VALUE_FORMAT } from '@/shared/utils/constants/naive-constants';
import { formatDate } from '@/shared/utils/functions/date';
import renderIcon from '@/shared/utils/render-icon';
import type { MessageTemplateModel } from '@/projects/notification-service/shared/types/send-message.types';
import type { MessageTemplateTableEmits } from './messages-templates-table.types';

export default function useMessageTemplatesTable(
  emit: MessageTemplateTableEmits
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
        width: 180,
        ellipsis: {
          maxWidth: 200,
          tooltip: true
        }
      },
      {
        title: t('Name2'),
        key: 'name',
        width: 220
      },
      {
        title: t('template-description'),
        key: 'description',
        width: 340,
        ellipsis: {
          tooltip: true
        }
      },
      {
        title: t('Data-of-creation'),
        key: 'createdDate',
        align: 'left',
        fixed: 'right',
        width: 170,
        render: (row) => {
          return h(
            NSpace,
            {
              align: 'flex-start',
              justify: 'start',
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
                  'span',
                  {
                    style: {
                      color: '#808080'
                    }
                  },
                  formatDate(row.createdDate, TIME_VALUE_FORMAT)
                )
              ]
            }
          );
        }
      },
      {
        title: '',
        fixed: 'right',
        align: 'center',
        width: 100,
        key: 'actions',
        render: (row: MessageTemplateModel) => {
          return h(
            NPopover,
            {
              placement: 'top'
            },
            {
              trigger: () => h(NButton, {
                onClick: () => deleteTemplate(row),
                size: 'small',
                circle: true,
                quaternary: true,
                renderIcon: renderIcon('trash-outline')
              }),
              default: () => h('span', null, t('Delete'))
            }
          );
        }
      }
    ]
  );

  const deleteTemplate = async (template: MessageTemplateModel) => {
    emit('confirmModalShow', true);
    emit('confirmModalData', template);
  };

  const onSearchValueChanged = (value: string) => {
    emit('searchValueChange', value);
  };

  const rowKey = (row: MessageTemplateModel) => row.code;

  return {
    columns,
    rowKey,
    tableRef,
    onSearchValueChanged
  };
}
