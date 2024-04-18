import { IListItem } from '@/shared/types/common.types';
import { StatusConfig } from '@/shared/types/status.types';
import { ProcessingType } from '@/projects/autopay/shared/types/administration.types';
import { ProcessingsConfigMap } from '../types/dashboard.types';

export default class ProcessingTypesMapper {

  static toTypes(
    list: IListItem<ProcessingType>[]
  ): ProcessingType[] {
    return list
      .map(item => item.id)
      .filter(
        id => id && id !== ProcessingType.ALL
      ) as ProcessingType[];
  }

  static toProcessingsConfigMap(
    list: StatusConfig<ProcessingType>[]
  ): ProcessingsConfigMap {
    const result = {} as ProcessingsConfigMap;

    list.forEach(
      item => result[item.id!] = item
    );

    return result;
  }

}
