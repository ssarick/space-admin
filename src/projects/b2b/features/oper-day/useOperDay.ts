import { onMounted, ref } from 'vue';
import { useConfirmationDialog } from '@/shared/composables';
import { ApiOperDay } from '@/projects/b2b/shared/api';
import { IOperDay, IOperDayTogglePayload, OperDayBranch } from '@/projects/b2b/shared/types/oper-day.types';
import { setOperDayProperty } from './utils';

export default function useOperDay() {
  const operDays = ref<IOperDay[]>([]);
  const loading = ref(false);

  const fetchOperDays = async () => {
    loading.value = true;

    const { items } = await ApiOperDay
      .getOperDay();

    operDays.value = items;
    loading.value = false;
  };

  const onToggleDocumentState = async (
    payload: Required<IOperDayTogglePayload>
  ) => {
    const { error } = await ApiOperDay
      .toggleDocumentState(payload);

    error || setOperDayProperty(
      operDays.value,
      'documentState',
      payload.state,
      payload.branch
    );
  };

  const onToggleAllDocumentsState = async (
    payload: IOperDayTogglePayload
  ) => {
    const { error } = await ApiOperDay
      .toggleAllDocumentsState(payload);

    error || setOperDayProperty(
      operDays.value,
      'documentState',
      payload.state,
      OperDayBranch.ALL
    );
  };

  const onToggleReportState = async (
    payload: Required<IOperDayTogglePayload>
  ) => {
    const { error } = await ApiOperDay
      .toggleReportState(payload);

    error || setOperDayProperty(
      operDays.value,
      'reportState',
      payload.state,
      payload.branch
    );
  };

  const onToggleAllReportsState = async (
    payload: IOperDayTogglePayload
  ) => {
    const { error } = await ApiOperDay
      .toggleAllReportsState(payload);

    error || setOperDayProperty(
      operDays.value,
      'reportState',
      payload.state,
      OperDayBranch.ALL
    );
  };

  const {
    showConfirmationDialog:
      onBeforeToggleDocumentState
  } = useConfirmationDialog(
    onToggleDocumentState
  );

  const {
    showConfirmationDialog:
      onBeforeToggleAllDocumentsState
  } = useConfirmationDialog(
    onToggleAllDocumentsState
  );

  const {
    showConfirmationDialog:
      onBeforeToggleReportState
  } = useConfirmationDialog(
    onToggleReportState
  );

  const {
    showConfirmationDialog:
      onBeforeToggleAllReportsState
  } = useConfirmationDialog(
    onToggleAllReportsState
  );

  onMounted(fetchOperDays);

  return {
    operDays,
    loading,
    onBeforeToggleDocumentState,
    onBeforeToggleAllDocumentsState,
    onBeforeToggleReportState,
    onBeforeToggleAllReportsState
  };
}
