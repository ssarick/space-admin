import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import downloadFile from '@/shared/utils/functions/downloadFile';
import { ApiInventorySessions } from '@/projects/inventory/shared/api';

export default function useSessionInfoPage() {
  const route = useRoute();
  const { t } = useI18n();
  const reportDownloadLoading = ref(false);
  const { sessionId } = route.params;

  const pageTitle = computed(
    () => `${t('session')} ${sessionId}`
  );

  const onDownloadInventoryReport = async () => {
    reportDownloadLoading.value = true;

    const {
      result,
      errors
    } = await ApiInventorySessions.fetchSessionExcelFile(sessionId);

    if (errors) reportDownloadLoading.value = false;

    result && downloadFile(result, `inventory-session-${sessionId}-report.xlsx`);
    reportDownloadLoading.value = false;
  };

  return {
    pageTitle,
    reportDownloadLoading,
    onDownloadInventoryReport
  };
}
