export enum OperDayBranch {
  ALL = 'ALL'
}

export interface IOperDay {
  branch?: string | null
  curDate?: string | null
  b2OperDayState?: number | null
  b2Description?: string | null
  nciOperDayState?: number | null
  nciDescription?: string | null
  b2CurDate?: string | null
  nextDate?: string | null
  documentState?: boolean | null
  reportState?: boolean | null
}

export interface IOperDayTogglePayload {
  branch?: string
  state: boolean
}
