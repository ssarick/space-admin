import { ILogsReportInfo } from '@/projects/b2b/shared/types/log.types';

export interface ILogsHistoryTableProps {
  data?: ILogsReportInfo[]
  loading?: boolean
}

export interface ILogsHistoryTableEmits {
  (
    event: 'download',
    value: string
  )
}
