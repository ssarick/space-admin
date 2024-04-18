import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useVModels } from '@vueuse/core';
import { DataTableColumn, NButton, NPopover, NSpace } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { BaseStatusItem } from '@/shared/UI/base-status';
import AmountFormatter from '@/shared/utils/amount-formatter';
import { formatDate } from '@/shared/utils/functions/date';
import renderIcon from '@/shared/utils/render-icon';
import { SubsidyApplication } from '@/projects/subsidy/shared/types/application.types';
import { isEditableSubsidyStatus, isSendibleToMinfinSubsidyStatus } from '@/projects/subsidy/shared/utils/status-utils';
import { ApplicationsTableEmits, ApplicationsTableProps } from './application-table.types';
import { subsidyApplicationStatusesMap } from './utils/constants/status-map';

export default function useApplicationsTable(
  props: ApplicationsTableProps,
  emit: ApplicationsTableEmits
) {
  const { t } = useI18n();
  const router = useRouter();
  const tableRef = useTableRef();
  const models = useVModels(props, emit);

  const columns = computed<
    DataTableColumn<SubsidyApplication>[]
  >(() => [
    {
      type: 'selection',
      disabled: (row: SubsidyApplication) =>
        !isSendibleToMinfinSubsidyStatus(row.status!)
    },
    {
      width: 150,
      title: 'ПИНФЛ',
      key: 'pinfl'
    },
    {
      width: 210,
      title: 'Счет',
      key: 'accExternal'
    },
    {
      title: 'Сумма к оплате',
      key: 'amountThisMonthTiyin',
      width: 190,
      render: (row: SubsidyApplication) => AmountFormatter
        .divideAndFormat(row.amountThisMonthTiyin, 'UZS')
    },
    {
      title: 'Остаток',
      key: 'restAmountTiyin',
      width: 190,
      render: (row: SubsidyApplication) => AmountFormatter
        .divideAndFormat(row.restAmountTiyin, 'UZS')
    },
    {
      title: 'Сумма кредита',
      key: 'creditAmountTiyin',
      width: 190,
      render: (row: SubsidyApplication) => AmountFormatter
        .divideAndFormat(row.creditAmountTiyin, 'UZS')
    },
    {
      title: 'Дата оплаты',
      width: 110,
      key: 'contractPaymentStartDate',
      render: (row: SubsidyApplication) => formatDate(
        row.contractPaymentStartDate
      )
    },
    {
      title: 'Дата выдачи',
      width: 110,
      key: 'percentagePaymentDate',
      render: (row: SubsidyApplication) => formatDate(
        row.percentagePaymentDate
      )
    },
    {
      title: 'Статус заявки',
      key: 'statusName',
      width: 200,
      render: (row: SubsidyApplication) => h(
        NPopover,
        {
          placement: 'top',
          disabled: !row.descriptionError,
          width: 300
        },
        {
          trigger: () => h(
            BaseStatusItem,
            {
              label: row.statusName!,
              type: 'filled',
              ...(subsidyApplicationStatusesMap[
                row.status!
              ] || {})
            }
          ),
          default: () => row.descriptionError
        }
      )
    },
    {
      title: 'Номер документа',
      key: 'decision',
      width: 160,
      render: (row: SubsidyApplication) =>
        row.decision || '-'
    },
    {
      title: 'ID',
      key: 'id',
      width: 100
    },
    {
      title: 'Статус в Минфин',
      key: 'minfinStatusName',
      width: 200,
      render: (row: SubsidyApplication) =>
        row.minfinStatusName || '-'
    },
    {
      title: '',
      key: 'actions',
      fixed: 'right',
      align: 'center',
      width: 100,
      render(row: SubsidyApplication) {
        const disabled = !isEditableSubsidyStatus(row.status!);

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
              {
                placement: 'top',
                disabled
              },
              {
                trigger: () => h(NButton, {
                  onClick: () => router.push({
                    name: 'subsidy-applications-edit',
                    params: {
                      subsidyId: row.id
                    }
                  }),
                  type: 'primary',
                  size: 'small',
                  circle: true,
                  quaternary: true,
                  disabled,
                  renderIcon: renderIcon('edit')
                }),
                default: () => h('span', null, t('Edit'))
              }
            ),
            h(
              NPopover,
              {
                placement: 'top',
                disabled
              },
              {
                trigger: () => h(NButton, {
                  onClick: () => emit('delete', row.id!),
                  size: 'small',
                  circle: true,
                  quaternary: true,
                  disabled,
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

  const rowKey = (row: SubsidyApplication) => row.id;

  const rowProps = (row: SubsidyApplication) => {
    return {
      style: 'cursor: pointer',
      ondblclick: () => router.push({
        name: 'subsidy-applications-info',
        params: {
          subsidyId: row.id
        }
      })
    };
  };

  return {
    ...models,
    tableRef,
    columns,
    rowKey,
    rowProps
  };
}
