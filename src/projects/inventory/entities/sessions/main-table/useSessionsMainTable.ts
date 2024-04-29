import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import {
  DataTableColumns,
  NButton,
  NPopover
} from 'naive-ui';
import {
  StatusColor,
  StatusConfig
} from '@/shared/types/status.types';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { BaseStatusItem } from '@/shared/UI/base-status';
import { formatDateToLocaleWithTime } from '@/shared/utils/functions/date';
import renderIcon from '@/shared/utils/render-icon';
import type { SessionsMainTableEmits } from '@/projects/inventory/entities/sessions/main-table/sessions-main-table.types';
import type {
  InventorySession,
  InventoryTakerUsersList
} from '@/projects/inventory/shared/types/sessions.types';
import type { InventoryUser } from '@/projects/inventory/shared/types/users.types';

export default function useSessionsMainTable(
  emit: SessionsMainTableEmits
) {
  const { t } = useI18n();
  const tableRef = useTableRef();
  const router = useRouter();

  const roleOptions = computed<
    StatusConfig[]
  >(
    () => [
      {
        value: 1,
        label: t('Active'),
        color: StatusColor.GREEN
      },
      {
        value: 2,
        label: t('Finished'),
        color: StatusColor.RED
      }
    ]
  );

  const columns = computed<
    DataTableColumns<InventorySession>
  >(
    () => [
      {
        title: t('session'),
        key: 'id',
        width: 100
      },
      {
        title: t('Name2'),
        key: 'name'
      },
      {
        title: t('Data-of-creation'),
        key: 'createdDate',
        render: (row: InventoryUser) => formatDateToLocaleWithTime(
          row.createdDate
        )
      },
      {
        title: t('Office'),
        key: 'officeName'
      },
      {
        title: t('Inventory-taker'),
        key: 'inventoryUserFullName',
        width: 220,
        render: (row: InventorySession) => h(
          NPopover,
          {
            placement: 'top',
            disabled: isPopoverDisabled(row)
          },
          {
            trigger: () => h(
              NButton,
              {
                text: true,
                tag: 'a',
                size: 'small'
              }, {
                default: () => getInventoryTakersList(row)
              }
            ),
            default: () => renderPopoverContent(row)
          }
        )

      },
      {
        title: t('Status'),
        key: 'stateId',
        render: (row: InventorySession) => h(
          BaseStatusItem, {
            label: getStatus(row)?.label,
            color: getStatus(row)?.color,
            type: 'filled'
          }
        )
      },
      {
        title: t('Action'),
        key: 'actions',
        render: (row: InventorySession) => renderActionsContent(row)
      }
    ]
  );

  const getInventoryTakersList = (row: InventoryTakerUsersList) => {
    const { users } = row;

    const list = users && users.map(
      item => item.fullName
    );

    if (list && list?.length > 1) return `${list[0]} и еще ${list.length - 1}`;
    return list;
  };

  const isPopoverDisabled = (row: InventoryTakerUsersList) => {
    const { users } = row;
    if (users && users?.length < 2) return true;
  };

  const renderPopoverContent = (row: InventoryTakerUsersList) => {
    const { users } = row;
    const data = users && users.map(item => item.fullName);
    return h(
      'div',
      {
        class: 'popover-list'
      },
      data && data.map(item => {
        return h('div', {
          class: 'popover-list-item'
        }, item as string);
      })
    );
  };

  const renderActionsContent = (row: InventorySession) => {
    return h(
      NButton,
      {
        onClick: (e) => {
          e.stopPropagation();
          disableSession(row);
        },
        renderIcon: renderIcon(
          'power',
          {
            color: 'error'
          }
        ),
        iconPlacement: 'left',
        style: {
          fontWeight: 500
        },
        disabled: getStatus(row)?.value === 2,
        class: 'px-1',
        type: 'error',
        size: 'small',
        tertiary: true
      },
      () => h('span', null, `${t('Power-off')}`)
    );
  };

  const getStatus = (row: InventorySession) => {
    return roleOptions.value.find(item => item.value === row.stateId);
  };

  const disableSession = (row: InventorySession) => {
    emit('confirmModalShow', true);
    emit('confirmModalData', row);
  };

  const rowProps = (row: InventorySession) => {
    return {
      style: 'cursor: pointer',
      ondblclick: () => goToSessionInfo(row)
    };
  };

  const rowKey = (row: InventorySession) => row.id;

  const goToSessionInfo = (row: InventorySession) => {
    return router.push({
      name: 'inventory-sessions-info',
      params: {
        sessionId: row.id
      }
    });
  };

  return {
    columns,
    rowKey,
    tableRef,
    rowProps
  };
}
