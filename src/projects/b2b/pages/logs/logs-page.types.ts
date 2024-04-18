import type { fieldLimits } from '@/shared/utils/constants/field-limits';
import { LogEntityType, LogType } from '@/projects/b2b/shared/types/log.types';

export interface ILogsModel {
  logType: LogType | null
  logEntityType: LogEntityType | null
  datePeriod: [ number, number ]
  anyCode: string | null
  userName: string | null
  userLogin: string | null
  userPhone: string | null
  userPidSN: string | null
  userPidNumber: string | null
}

export type LogsClientFieldLength = {
  [P in keyof ILogsModel]?: keyof typeof fieldLimits
}
