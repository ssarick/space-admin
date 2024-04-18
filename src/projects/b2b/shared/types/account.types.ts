export interface IAccountRelation extends IAccountAccessOnly {
  dateFill: string
  userId: number
}

export interface IAccount {
  branch: string
  clientCode: string
  accountNumber: string
  openDate: string
  closeDate: string
  accountState: number
  canPayGenerally: number
  accountRelations: IAccountRelation[]
}

export interface IAccountAccessOnly {
  canPay: number
  stateId: number
}

export interface IAccountAccess extends IAccountAccessOnly {
  accountNumber: string
}

export interface IAccountAccesses {
  branch: string
  businessCode: string
  userId: number
  accounts: IAccountAccess[]
}
