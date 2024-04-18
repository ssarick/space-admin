import { computed } from 'vue';
import { IOperDay } from '@/projects/b2b/shared/types/oper-day.types';
import { IOperDayListEmits, IOperDayListProps } from './oper-day-list.types';

export default function useOperDayStates(
  props: IOperDayListProps,
  emit: IOperDayListEmits
) {
  const allDocumentsIsChecked = computed<boolean>(
    () => !!props.data?.every(
      item => item.documentState
    )
  );

  const allReportsIsChecked = computed<boolean>(
    () => !!props.data?.every(
      item => item.reportState
    )
  );

  const partialDocumentsIsChecked = computed<boolean>(
    () => !!props.data?.some(
      item => item.documentState
    )
  );

  const partialReportsIsChecked = computed<boolean>(
    () => !!props.data?.some(
      item => item.reportState
    )
  );

  const onCheckDocument = (state: boolean, row: IOperDay) =>
    emit('toggleDocumentState', {
      state,
      branch: row.branch!
    });

  const onCheckAllDocuments = (state: boolean) =>
    emit('toggleAllDocumentsState', { state });

  const onCheckReport = (state: boolean, row: IOperDay) =>
    emit('toggleReportState', {
      state,
      branch: row.branch!
    });

  const onCheckAllReports = (state: boolean) =>
    emit('toggleAllReportsState', { state });

  return {
    allDocumentsIsChecked,
    allReportsIsChecked,
    partialDocumentsIsChecked,
    partialReportsIsChecked,
    onCheckDocument,
    onCheckAllDocuments,
    onCheckReport,
    onCheckAllReports
  };
}
