export interface IBlockingReason {
  entityName: string | null
  reasonDesc: string | null
  entityId: number | null
}

export interface IBlockingReasonParams
  extends Partial<Pick<IBlockingReason, 'entityName'>> {
  entityId?: number
}

export interface IReason {
  reasonId: number | null
}

export interface IReasonFormModel extends IReason {}
