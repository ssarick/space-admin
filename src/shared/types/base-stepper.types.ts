export interface StepProps {
  steps: Step[]
  activeStep: number | string
}

export interface Step<T = number | string> {
  label: string
  key: T
  isFilled: boolean
  isDisabled: boolean
}

export interface StepEmits {
  (event: 'nextButton')
  (event: 'backButton')
  (event: 'update:activeStep', payload: StepProps['activeStep']): void
}
