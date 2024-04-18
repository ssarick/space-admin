import { EntityClient } from '@/projects/iseeu/shared/types/entity.types';

export interface IEntitySearchTableProps {
  data?: EntityClient[]
  loading?: boolean
}

export interface IEntitySearchTableEmits {
  (event: 'example'): void
}
