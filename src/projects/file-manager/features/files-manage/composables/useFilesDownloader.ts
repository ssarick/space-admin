import { Ref, ref } from 'vue';
import { downloadBase64ToFile } from '@/shared/utils/functions/downloadFile';
import { ApiFileManage } from '@/projects/file-manager/shared/api';
import { IFileManageDownloadableContent, IFileManageItem } from '@/projects/file-manager/shared/types/file-manage.types';

export default function useFileDownloader(
  selectedFile: Ref<IFileManageItem | null>
) {
  const downloadLoading = ref(false);

  const downloadFileItem = (
    item?: IFileManageDownloadableContent | null
  ) => item?.name && downloadBase64ToFile(
    item?.content!,
    item?.mimeType!,
    item?.name
  );

  const onDownloadSelectedFile = async () => {
    if (!selectedFile.value) return;

    downloadLoading.value = true;

    const { item, error } = await ApiFileManage
      .downloadFile({
        filename: selectedFile.value.name!,
        bucket: selectedFile.value.bucket!,
        folder: selectedFile.value.folder!
      });

    downloadLoading.value = false;

    if (error) return;

    downloadFileItem(item.fileContent);
    downloadFileItem(item.signContent);
  };

  return {
    downloadLoading,
    onDownloadSelectedFile
  };
}
