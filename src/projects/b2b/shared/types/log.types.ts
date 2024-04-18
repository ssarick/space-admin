export enum LogType {
  PROSECUTORS,
  ACTIONS_HISTORY
}

export enum LogEntityType {
  CLIENT,
  USER
}

export interface ILogsReport {
  base64String: string | null
}

export interface ILogsReportInfo {
  id?: string | null
  requestedDate?: string | null
  type?: number | null
  intervalFrom?: string | null
  intervalTo?: string | null
  userIds?: number[] | null
  fileType?: number | null
  isReadyToDownload?: boolean | null
  isError?: boolean | null
  loading?: boolean | null
}

export interface ILogsFilter {
  userIds: number[]
  clientIds: string[]
  branch: string
  intervalStart: string
  intervalEnd: string
  logType: LogType
}

export interface ILogsCreatedReport {
  reportId?: string
}
