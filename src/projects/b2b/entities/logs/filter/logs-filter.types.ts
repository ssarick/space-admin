import { LogEntityType, LogType } from '@/projects/b2b/shared/types/log.types';

export interface ILogsFilterProps {
  logType?: LogType | null
  logEntityType?: LogEntityType | null
  anyCode?: string | null
  userName?: string | null
  userLogin?: string | null
  userPhone?: string | null
  userPidSN?: string | null
  userPidNumber?: string | null
  datePeriod?: [ number, number ]
}

export interface ILogsFilterEmits {
  (
    event: 'update:logType',
    value: ILogsFilterProps['logType']
  )
  (
    event: 'update:logEntityType',
    value: ILogsFilterProps['logEntityType']
  )
  (
    event: 'update:anyCode',
    value: ILogsFilterProps['anyCode']
  )
  (
    event: 'update:userName',
    value: ILogsFilterProps['userName']
  )
  (
    event: 'update:userLogin',
    value: ILogsFilterProps['userLogin']
  )
  (
    event: 'update:userPhone',
    value: ILogsFilterProps['userPhone']
  )
  (
    event: 'update:userPidSN',
    value: ILogsFilterProps['userPidSN']
  )
  (
    event: 'update:userPidNumber',
    value: ILogsFilterProps['userPidNumber']
  )

  (
    event: 'update:datePeriod',
    value: ILogsFilterProps['datePeriod']
  )
}
