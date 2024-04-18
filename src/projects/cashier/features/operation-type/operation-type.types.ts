export interface OperationTypeEmits {
  (
    event: 'selectOperationType',
    value: string
  )
}

export enum OPERATION_TYPES {
  FIVE_ONE = 'five-one',
  FIVE_THREE = 'five-three',
  ONE_TWO_TWO = '122',
  ONE_TWO_SEVEN = '127',
  ONE_THREE_TWO = '132',
  ONE_THREE_THREE = '133'
}
