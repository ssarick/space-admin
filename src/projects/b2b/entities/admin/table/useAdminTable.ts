import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { DataTableColumns, NButton, NPopover, NSpace } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { formatPhoneNumber } from '@/shared/utils/functions';
import { formatDate } from '@/shared/utils/functions/date';
import renderIcon from '@/shared/utils/render-icon';
import { IAdmin } from '@/projects/b2b/shared/types/admin.types';
import { stateMap } from '@/projects/b2b/shared/utils/constants';
import { IAdminTableEmits } from './admin-table.types';

export default function useAdminTable(
  emit: IAdminTableEmits
) {
  const { t } = useI18n();
  const router = useRouter();
  const tableRef = useTableRef();

  const columns = computed<DataTableColumns<IAdmin>>(() => [
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
      render: (row: IAdmin) =>
        formatPhoneNumber(row.phone || '')
    },
    {
      title: t('E-mail'),
      key: 'email'
    },
    {
      title: t('Data-of-creation'),
      key: 'createDate',
      render: (row: IAdmin) => formatDate(row.createDate || '')
    },
    {
      title: t('Status'),
      key: 'stateId',
      render(row: IAdmin) {
        return stateMap.value[row.stateId!];
      }
    },
    {
      title: '',
      key: 'actions',
      fixed: 'right',
      align: 'center',
      width: '100px',
      render(row: IAdmin) {
        return h(
          NSpace,
          {
            wrap: false,
            justify: 'center',
            themeOverrides: {
              gapMedium: '8px'
            }
          },
          () => [
            h(
              NPopover,
              { placement: 'top' },
              {
                trigger: () =>
                  h(NButton, {
                    onClick: (e) => {
                      e.stopPropagation();

                      goToAdminEdit(row);
                    },
                    type: 'primary',
                    size: 'small',
                    circle: true,
                    quaternary: true,
                    renderIcon: renderIcon('edit')
                  }),
                default: () => h('span', null, t('Edit'))
              }
            ),
            h(
              NPopover,
              { placement: 'top' },
              {
                trigger: () =>
                  h(NButton, {
                    onClick: (e) => {
                      e.stopPropagation();

                      onDeleteAdmin(row);
                    },
                    type: 'error',
                    size: 'small',
                    circle: true,
                    quaternary: true,
                    renderIcon: renderIcon('trash-outline')
                  }),
                default: () => h('span', null, t('Delete'))
              }
            )
          ]
        );
      }
    }
  ]);

  const onDeleteAdmin = (admin: IAdmin) =>
    emit('delete', admin.id!);

  const rowProps = (row: IAdmin) => {
    return {
      style: 'cursor: pointer',
      ondblclick: () => {
        goToAdminEdit(row);
      }
    };
  };

  const goToAdminEdit = (admin: IAdmin) => {
    router.push({
      name: 'admins-edit',
      params: { id: admin.id }
    });
  };

  const rowKey = (admin: IAdmin) =>
    admin.id || Math.random();

  return {
    rowProps,
    columns,
    rowKey,
    tableRef
  };
}
