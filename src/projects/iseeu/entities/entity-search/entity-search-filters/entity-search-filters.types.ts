import { EntityFiltersModel } from '@/projects/iseeu/shared/types/entity.types';

export interface IEntitySearchFiltersProps extends
  EntityFiltersModel {
  model?: EntityFiltersModel
}

export interface IEntitySearchFiltersEmits {
  (
    event: 'update:name',
    value: IEntitySearchFiltersProps['name']
  )
  (
    event: 'update:openDate',
    value: IEntitySearchFiltersProps['openDate']
  )
  (
    event: 'update:pinfl',
    value: IEntitySearchFiltersProps['pinfl']
  )
  (
    event: 'openMassSearch'
  )
}
