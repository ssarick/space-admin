import { Ref } from 'vue';
import { SubsidyApplicationInternal } from '@/projects/subsidy/shared/types/application.types';

export interface SubsidyApplicationControls {
  applications: Ref<SubsidyApplicationInternal[]>
  fetchApplications: VoidFunction
  resetFilters: VoidFunction
}

export interface SubsidyApplicationsMinfinControls extends
  Pick<SubsidyApplicationControls, 'applications'
    | 'fetchApplications'> {
  selectedApplicationIds: Ref<number[]>
}
