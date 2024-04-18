import { IndividualClient } from '@/projects/iseeu/shared/types/individual.types';

export interface IIndividualSearchTableProps {
  data?: IndividualClient[]
  loading?: boolean
}

export interface IIndividualSearchTableEmits {
  (event: 'example'): void
}
