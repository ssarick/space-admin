import ProcessingTypesMapper from '@/projects/autopay/shared/mappers/processing-types';
import { processingTypesList } from '@/projects/autopay/shared/utils/constants/processing-types';

export default function useDashboardPage() {
  const processingTypes = ProcessingTypesMapper
    .toTypes(processingTypesList);

  return {
    processingTypes
  };
}
