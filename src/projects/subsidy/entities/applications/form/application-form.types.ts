import { IResponseData } from '@/shared/types/api.types';
import { SubsidyApplicationFormModel, SubsidyContract } from '@/projects/subsidy/shared/types/application.types';

export interface ApplicationFormProps extends
  SubsidyApplicationFormModel {
  model?: SubsidyApplicationFormModel
  saveLoading?: boolean
  dataLoading?: boolean
  contractTypeName?: string | null
  requestContracts?: () => Promise<
    IResponseData<SubsidyContract>
  >
}

export interface ApplicationFormEmits {
  (
    event: 'update:decision',
    value: ApplicationFormProps['decision']
  )
  (
    event: 'update:pinfl',
    value: ApplicationFormProps['pinfl']
  )
  (
    event: 'update:accExternal',
    value: ApplicationFormProps['accExternal']
  )
  (
    event: 'update:amountThisMonthTiyin',
    value: ApplicationFormProps['amountThisMonthTiyin']
  )
  (
    event: 'update:restAmountTiyin',
    value: ApplicationFormProps['restAmountTiyin']
  )
  (
    event: 'update:percentagePaymentDate',
    value: ApplicationFormProps['percentagePaymentDate']
  )
  (
    event: 'update:contractPaymentStartDate',
    value: ApplicationFormProps['contractPaymentStartDate']
  )
  (
    event: 'update:contractType',
    value: ApplicationFormProps['contractType']
  )
  (
    event: 'update:mfo',
    value: ApplicationFormProps['mfo']
  )
  (
    event: 'update:creditAmountTiyin',
    value: ApplicationFormProps['creditAmountTiyin']
  )
}
