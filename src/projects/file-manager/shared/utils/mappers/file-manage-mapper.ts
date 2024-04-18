import {
  FileManageEntity,
  FileManageEntityType,
  IFileManageBucket,
  IFileManageItem } from '../../types/file-manage.types';

export default class FileManageMapper {

  static toBuckets(
    list: string[]
  ): IFileManageBucket[] {
    return list.map(name => ({
      name
    }));
  }

  static filesToEntities(
    list: IFileManageItem[]
  ): FileManageEntity[] {
    return list.map(data => ({
      id: data.name,
      name: data.name,
      data,
      key: `${data.name}-${data.folder}-${data.bucket}`,
      type: FileManageEntityType.FILE
    }));
  }

  static foldersToEntities(
    list: string[]
  ): FileManageEntity[] {
    return list.map(name => ({
      id: name,
      name: name,
      type: FileManageEntityType.FOLDER,
      children: [],
      key: name,
      expanded: false,
      loading: false
    }));
  }

}
