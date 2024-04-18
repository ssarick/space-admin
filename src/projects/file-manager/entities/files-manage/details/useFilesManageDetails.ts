import { computed } from 'vue';
import { IListItem } from '@/shared/types/common.types';
import { IconName } from '@/shared/types/icon.types';
import { DATE_TIME_TEXT_FORMAT } from '@/shared/utils/constants/naive-constants';
import { formatDate } from '@/shared/utils/functions/date';
import IconUtils from '@/projects/file-manager/shared/utils/common/icon-utils';
import { renderFileManageSignIconWithLabel } from '@/projects/file-manager/shared/utils/renderers/file-manage-icon';
import { IFilesManageDetailsEmits, IFilesManageDetailsProps } from './files-manage-details.types';

export default function useFilesManageDetails(
  props: IFilesManageDetailsProps,
  emit: IFilesManageDetailsEmits
) {
  const fileDetailsList = computed<IListItem[]>(() => [
    {
      name: 'Бакет',
      subText: props.selectedFile?.bucket || '-'
    },
    {
      name: 'Папка',
      subText: props.selectedFile?.folder || '-'
    },
    {
      name: 'Описание',
      subText: props.selectedFile?.description || '-'
    },
    {
      name: 'Файл подписания',
      subText: () => renderFileManageSignIconWithLabel(
        props.selectedFile
      )
    },
    {
      name: 'Дата создания',
      subText: props.selectedFile?.createdAt
        ? formatDate(
          props.selectedFile?.createdAt,
          DATE_TIME_TEXT_FORMAT
        )
        : '-'
    },
    {
      name: 'Дата планируемого удаления',
      subText: props.selectedFile?.deleteAt
        ? formatDate(
          props.selectedFile?.deleteAt,
          DATE_TIME_TEXT_FORMAT
        )
        : '-'
    }
  ]);

  const fileIcon = computed<IconName>(() =>
    IconUtils.getIconNameByFileName(
      props.selectedFile?.name
    ));

  const onDownload = () => emit('download');

  return {
    fileDetailsList,
    fileIcon,
    onDownload
  };
}
