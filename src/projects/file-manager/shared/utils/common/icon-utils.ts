import { IconName } from '@/shared/types/icon.types';
import { FileManageExtension } from '../../types/file-manage.types';

export default class IconUtils {

  protected static iconNamesByExtensions:
  Record<FileManageExtension, IconName> = {
      [FileManageExtension.doc]: 'file-word',
      [FileManageExtension.docx]: 'file-word',
      [FileManageExtension.xls]: 'file-excel',
      [FileManageExtension.xlsx]: 'file-excel',
      [FileManageExtension.csv]: 'file-csv',
      [FileManageExtension.pdf]: 'file-pdf',
      [FileManageExtension.txt]: 'file-txt',
      [FileManageExtension.png]: 'file-png',
      [FileManageExtension.jpg]: 'file-jpg',
      [FileManageExtension.jpeg]: 'file-jpg',
      [FileManageExtension.default]: 'file-default'
    };

  static getIconNameByFileName(
    fileName?: string | null
  ): IconName {
    const extension = fileName?.split('.').pop();

    if (extension) {
      const result = IconUtils.iconNamesByExtensions[
        FileManageExtension[extension]
      ];

      if (result) return result;
    }

    return IconUtils.iconNamesByExtensions[
      FileManageExtension.default
    ];
  }

}
