import { h } from 'vue';
import { NSpace } from 'naive-ui';
import BaseIcon from '@/shared/UI/base-icon';
import { FileManageSignType, IFileManageItem } from '../../types/file-manage.types';

export const renderFileManageSignIcon = (
  fileItem?: IFileManageItem | null
) => {
  if (!fileItem?.fileType
    || fileItem?.fileType === FileManageSignType.UNSIGNED)
    return '-';

  return h(BaseIcon, {
    icon: fileItem?.fileType === FileManageSignType
      .SIGNED_WITH_FILE
      ? 'document-pen'
      : 'pen',
    size: 24
  });
};

export const renderFileManageSignIconWithLabel = (
  fileItem?: IFileManageItem | null
) => h(
  NSpace,
  {
    align: 'center',
    size: [ 10, 8 ],
    wrapItem: false
  },
  () => renderFileManageSignIcon(fileItem)
);
