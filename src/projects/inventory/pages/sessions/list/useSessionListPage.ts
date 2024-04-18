import { ref } from 'vue';
import downloadFile from '@/shared/utils/functions/downloadFile';
import { ApiInventorySessions } from '@/projects/inventory/shared/api';

export default function useSessionListPage() {
  const reportDownloadLoading = ref(false);

  const onDownloadInventoryAllReport = async () => {
    reportDownloadLoading.value = true;

    const {
      result,
      errors
    } = await ApiInventorySessions.fetchAllInventoryExcelFile();

    if (errors) reportDownloadLoading.value = false;

    result && downloadFile(result, 'inventory-report.xlsx');
    reportDownloadLoading.value = false;
  };

  return {
    reportDownloadLoading,
    onDownloadInventoryAllReport
  };
}
