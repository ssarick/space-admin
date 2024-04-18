import { IndividualFiltersModel } from '@/projects/iseeu/shared/types/individual.types';

export interface IIndividualSearchFiltersProps extends
  IndividualFiltersModel {
  model?: IndividualFiltersModel
}

export interface IIndividualSearchFiltersEmits {
  (
    event: 'update:birthDate',
    value: IIndividualSearchFiltersProps['birthDate']
  )
  (
    event: 'update:cutFio',
    value: IIndividualSearchFiltersProps['cutFio']
  )
  (
    event: 'update:name',
    value: IIndividualSearchFiltersProps['name']
  )
  (
    event: 'update:pinfl',
    value: IIndividualSearchFiltersProps['pinfl']
  )
  (
    event: 'openMassSearch'
  )
}
