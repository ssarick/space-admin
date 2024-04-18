import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { DataTableColumns } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { formatDate } from '@/shared/utils/functions/date';
import type { InventoryUser } from '@/projects/inventory/shared/types/users.types';

export default function useUsersMainTable() {
  const { t } = useI18n();
  const tableRef = useTableRef();
  const router = useRouter();

  const columns = computed<
    DataTableColumns<InventoryUser>
  >(
    () => [
      {
        title: t('Full-name-short'),
        key: 'fullName'
      },
      {
        title: t('Email'),
        key: 'email',
        width: '50%'
      },
      {
        title: t('Data-of-creation'),
        align: 'left',
        key: 'createdDate',
        render: (row: InventoryUser) => formatDate(
          row.createdDate
        )
      }
    ]);

  const rowProps = (row: InventoryUser) => {
    return {
      style: 'cursor: pointer',
      ondblclick: () => {
        router.push({
          name: 'inventory-users-info',
          params: {
            userId: row.id
          }
        });
      }
    };
  };

  const rowKey = (row: InventoryUser) => row.id;

  return {
    columns,
    rowKey,
    tableRef,
    rowProps
  };
}
