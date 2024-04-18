import { computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { DataTableColumn } from 'naive-ui';
import { useCheckboxColumnTitle } from '@/shared/composables';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import NumberUtils from '@/shared/utils/number';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { IOperDay } from '@/projects/b2b/shared/types/oper-day.types';
import { AdminRole } from '@/projects/b2b/shared/types/permission.types';
import {
  IOperDayListEmits,
  IOperDayListProps } from './oper-day-list.types';
import useOperDayStates from './useOperDayStates';
import { renderOperDayDetails, renderOperDaySwitch } from './utils';

export default function useOperDayList(
  props: IOperDayListProps,
  emit: IOperDayListEmits
) {
  const tableRef = useTableRef();
  const { t } = useI18n();
  const { user } = toRefs(useAuthStore());

  const isSuperAdmin = computed(
    () => user?.value?.roleId === AdminRole.SUPER_ADMIN
  );

  const {
    allDocumentsIsChecked,
    allReportsIsChecked,
    partialDocumentsIsChecked,
    partialReportsIsChecked,
    onCheckDocument,
    onCheckAllDocuments,
    onCheckReport,
    onCheckAllReports
  } = useOperDayStates(props, emit);

  const columns = computed<DataTableColumn<IOperDay>[]>(() => [
    {
      title: t('branches'),
      key: 'branch',
      width: 120
    },
    {
      title: t('b2'),
      key: 'b2OperDayState',
      render: (row: IOperDay) => renderOperDayDetails(
        row.b2CurDate,
        row.b2Description
      )
    },
    {
      title: t('nci'),
      key: 'nciOperDayState',
      render: (row: IOperDay) => renderOperDayDetails(
        row.curDate,
        row.nciDescription
      )
    },
    {
      title: useCheckboxColumnTitle(
        t('documents'),
        allDocumentsIsChecked,
        onCheckAllDocuments,
        partialDocumentsIsChecked,
        !isSuperAdmin.value
      ),
      key: 'documentState',
      render: (row: IOperDay) => renderOperDaySwitch(row, {
        state: row.documentState,
        disabled: !isSuperAdmin.value,
        enabledText: t('documents-enabled'),
        disabledText: t('documents-disabled'),
        onUpdate: onCheckDocument
      })
    },
    {
      title: useCheckboxColumnTitle(
        t('reports'),
        allReportsIsChecked,
        onCheckAllReports,
        partialReportsIsChecked,
        !isSuperAdmin.value
      ),
      key: 'reportState',
      render: (row: IOperDay) => renderOperDaySwitch(row, {
        state: row.reportState,
        disabled: !isSuperAdmin.value,
        enabledText: t('reports-enabled'),
        disabledText: t('reports-disabled'),
        onUpdate: onCheckReport
      })
    }
  ]);

  const rowKey = (row: IOperDay) => row.branch
    || NumberUtils.uniqueString;

  return {
    rowKey,
    tableRef,
    columns
  };
}
