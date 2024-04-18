import ProcessingTypesMapper from '@/projects/autopay/shared/mappers/processing-types';
import { processingTypesManualList } from '@/projects/autopay/shared/utils/constants/processing-types';

export default function useDashboardManualPage() {
  const processingTypes = ProcessingTypesMapper
    .toTypes(processingTypesManualList);

  return {
    processingTypes
  };
}
