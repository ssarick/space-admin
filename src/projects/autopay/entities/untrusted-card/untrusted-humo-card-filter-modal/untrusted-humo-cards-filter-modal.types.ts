export interface IUntrustedCardsFilterList {
  showModal: boolean
  formValues: IUntrustedModalFilterValuesForm
}

export interface IUntrustedModalFilterValues {
  contractId?: string | null
  clientId?: string | null
  ownerFullName?: string
  genesisFullName?: string
  similarityFrom?: string | null
  similarityTo?: string | null
  status?: string
  check?: string
}

export interface IUntrustedModalFilterValuesForm {
  clientId: string | null
  ownerFullName: string
  genesisFullName: string
  similarityFrom: string | null
  similarityTo: string | null
  status: string
  check: string
}

export interface IUntrustedCardsModalEmits {
  (e: 'close-modal')
  (e: 'submitFilterModal', event: SubmitEvent)
  (e: 'update:clientId', event: string | null)
  (e: 'update:status', event: string | null)
  (e: 'update:similarityFrom', event: string | null)
  (e: 'update:similarityTo', event: string | null)
  (e: 'update:showModal', value: number)
}
