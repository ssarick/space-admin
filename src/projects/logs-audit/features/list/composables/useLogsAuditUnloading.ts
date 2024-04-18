import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import downloadFile from '@/shared/utils/functions/downloadFile';
import { ApiLogsAudit } from '@/projects/logs-audit/shared/api';
import { LogsAuditUnloadingModel } from '@/projects/logs-audit/shared/types/logs-audit.types';
import LogsAuditMapper from '../mappers/logs-audit.mapper';

export default function useLogsAuditUnloading() {
  const unloadingModalRef = useFormRef();
  const logsAuditUnloadLoading = ref(false);
  const unloadingModalIsActive = ref(false);

  const unloadingModel = reactive<LogsAuditUnloadingModel>({
    action: [],
    dateFrom: null,
    dateTo: null,
    service: [],
    username: []
  });

  const downloadLogsAudit = async () => {
    logsAuditUnloadLoading.value = true;

    const data = await ApiLogsAudit.fetchExcelFile(
      LogsAuditMapper.toFetchPayload(
        unloadingModel
      )
    );

    data && downloadFile(data, 'logs.xlsx');

    logsAuditUnloadLoading.value = false;
  };

  const toggleUnloadingModal = () =>
    unloadingModalIsActive.value = !unloadingModalIsActive.value;

  const handleSubmitDownload = async () => {
    const hasError = await formValidate(
      unloadingModalRef.value
    );

    if (hasError) return;

    toggleUnloadingModal();
    await downloadLogsAudit();
  };

  return {
    unloadingModalRef,
    logsAuditUnloadLoading,
    unloadingModalIsActive,
    unloadingModel,
    handleSubmitDownload,
    toggleUnloadingModal
  };
}
