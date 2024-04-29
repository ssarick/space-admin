export interface IFieldLimits {
  [field: string]: {
    maxLength?: number
    minLength?: number
    max?: number
    min?: number
  }
}
