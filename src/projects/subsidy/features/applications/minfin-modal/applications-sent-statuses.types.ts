import { SubsidyApplicationWithSentStatus } from '@/projects/subsidy/shared/types/application.types';

export interface ApplicationsMinfinModalProps {
  showModal?: boolean
  applications?: SubsidyApplicationWithSentStatus[]
}

export interface ApplicationsMinfinModalEmits {
  (
    event: 'update:showModal',
    value: ApplicationsMinfinModalProps['showModal']
  )
  (
    event: 'updateApplication',
    value: SubsidyApplicationWithSentStatus
  )
}
