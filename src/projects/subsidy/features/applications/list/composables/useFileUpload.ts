import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { UploadFileEvent } from '@/shared/types/common.types';
import { ApiSubsidyApplication } from '@/projects/subsidy/shared/api';
import { SubsidyApplicationControls } from '../application-list.types';

export default function useFileUpload(
  applicationControls: SubsidyApplicationControls
) {
  const fileUploadLoading = ref(false);
  const message = useMessage();

  const handleFileUpload = async (
    { file: { file } }: UploadFileEvent
  ) => {
    fileUploadLoading.value = true;

    const { error } = await ApiSubsidyApplication
      .uploadExcel({
        excelFile: file!
      });

    if (!error) {
      message.success(
        `Файл "${file?.name}" загружен`
      );

      applicationControls.resetFilters();
      applicationControls.fetchApplications();
    }

    fileUploadLoading.value = false;
  };

  return {
    fileUploadLoading,
    handleFileUpload
  };
}
