import { computed, h } from 'vue';
import {
  DataTableColumn,
  NSpace,
  NSpin
} from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import BaseIcon from '@/shared/UI/base-icon';
import { formatDate } from '@/shared/utils/functions/date';
import { FileManageEntity, FileManageEntityType } from '@/projects/file-manager/shared/types/file-manage.types';
import IconUtils from '@/projects/file-manager/shared/utils/common/icon-utils';
import { renderFileManageSignIcon } from '@/projects/file-manager/shared/utils/renderers/file-manage-icon';
import { IFilesManageTableEmits, IFilesManageTableProps } from './files-manage-table.types';

export default function useFilesManageTable(
  props: IFilesManageTableProps,
  emit: IFilesManageTableEmits
) {
  const tableRef = useTableRef();

  const expandedRowKeys = computed<(number | string)[]>(
    () => getExpandedIds(props.data)
  );

  const getEntityIconName = (
    row: FileManageEntity
  ) => {
    if (row.type === FileManageEntityType.FILE) {
      return IconUtils.getIconNameByFileName(
        row.name
      );
    }

    return row.expanded ? 'folder-open' : 'folder';
  };

  const columns = computed<
    DataTableColumn<FileManageEntity>[]
  >(() => [
    {
      title: 'Имя',
      key: 'name',
      render: (row: FileManageEntity) => h(
        NSpace,
        {
          align: 'center',
          wrapItem: false,
          wrap: false
        },
        () => [
          row.loading
            ? h(NSpace, {
              align: 'center',
              justify: 'center',
              wrapItem: false,
              style: {
                width: '24px',
                height: '24px'
              }
            }, () => h(NSpin, {
              size: 20
            }))
            : h(BaseIcon, {
              icon: getEntityIconName(row),
              size: 24,
              color: '#F9B225',
              isReactive: true
            }),
          row.name
        ]
      )
    },
    {
      title: 'Подпись',
      key: 'fileType',
      width: 110,
      align: 'right',
      render: (row: FileManageEntity) =>
        row.type === FileManageEntityType.FILE
          ? renderFileManageSignIcon(row.data)
          : ''
    },
    {
      title: 'Последнее обновление',
      key: 'updatedAt',
      width: 200,
      align: 'right',
      render: (row: FileManageEntity) =>
        row.type === FileManageEntityType.FILE
          ? formatDate(
            row.data?.updatedAt,
            'DD.MM.YYYY HH:mm:ss'
          )
          : ''
    }
  ]);

  const rowKey = (row: FileManageEntity) =>
    row.key;

  const onRowClick = (row: FileManageEntity) =>
    emit('select', row);

  function getExpandedIds(
    rows: FileManageEntity[] = []
  ): (number | string)[] {
    return rows.reduce((result, item) => {
      item.expanded && result.push(
        item.key || item.id!
      );

      item.children && result.push(
        ...getExpandedIds(item.children)
      );

      return result;
    }, [] as (number | string)[]);
  }

  return {
    columns,
    rowKey,
    expandedRowKeys,
    onRowClick,
    tableRef
  };
}
