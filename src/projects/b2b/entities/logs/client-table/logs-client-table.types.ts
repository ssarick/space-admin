import { IClient } from '@/projects/b2b/shared/types/client.types';

export interface ILogsClientTableProps {
  data?: IClient[]
  loading?: boolean
  selected?: IClient | null
}

export interface ILogsClientTableEmits {
  (
    event: 'update:selected',
    value: ILogsClientTableProps['selected']
  )
}
