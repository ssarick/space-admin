import { IOperDay, IOperDayTogglePayload } from '@/projects/b2b/shared/types/oper-day.types';

export interface IOperDayListProps {
  data?: IOperDay[]
  loading?: boolean
}

export interface IOperDayListEmits {
  (
    event: 'toggleDocumentState',
    value: Required<IOperDayTogglePayload>
  )
  (
    event: 'toggleReportState',
    value: Required<IOperDayTogglePayload>
  )
  (
    event: 'toggleAllDocumentsState',
    value: IOperDayTogglePayload
  )
  (
    event: 'toggleAllReportsState',
    value: IOperDayTogglePayload
  )
}

export interface IOperDaySwitchOptions {
  isSwitch?: boolean
  enabledText?: string
  disabledText?: string
  disabled?: boolean
  state?: boolean | null
  onUpdate?: (value: boolean, row: IOperDay) => void
}
