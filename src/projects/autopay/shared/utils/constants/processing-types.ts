import { StatusColor, StatusConfig } from '@/shared/types/status.types';
import { ProcessingType } from '@/projects/autopay/shared/types/administration.types';
import ProcessingTypesMapper from '../../mappers/processing-types';

const onlyProcessingTypesList: StatusConfig<
  ProcessingType
>[] = [
  {
    id: ProcessingType.UZCARD,
    label: 'Uzcard',
    color: StatusColor.BLUE
  },
  {
    id: ProcessingType.HUMO,
    label: 'Humo',
    color: StatusColor.YELLOW
  },
  // {
  //   id: ProcessingType.VISA,
  //   label: 'Visa',
  //   color: StatusColor.RED
  // },
  {
    id: ProcessingType.ABS,
    label: 'ABS',
    color: StatusColor.GREEN
  },
  {
    id: ProcessingType.AUTO_PAY_UZCARD,
    label: 'Genesis',
    color: StatusColor.ORANGE
  }
];

const onlyProcessingTypesManualList: StatusConfig<
  ProcessingType
>[] = [
  {
    id: ProcessingType.MANUAL_PAY_UZCARD,
    label: 'Uzcard',
    color: StatusColor.BLUE
  },
  {
    id: ProcessingType.MANUAL_PAY_HUMO,
    label: 'Humo',
    color: StatusColor.YELLOW
  },
  {
    id: ProcessingType.MANUAL_PAY_VISA,
    label: 'Visa',
    color: StatusColor.RED
  }
];

const commonProcessingTypesList: StatusConfig<
  ProcessingType
>[] = [
  {
    id: ProcessingType.ALL,
    label: 'Всего',
    color: StatusColor.GRAY_DARK
  }
];

export const processingTypesList: StatusConfig<
  ProcessingType
>[] = [
  ...onlyProcessingTypesList,
  ...commonProcessingTypesList
];

export const processingTypesManualList: StatusConfig<
  ProcessingType
>[] = [
  ...onlyProcessingTypesManualList,
  ...commonProcessingTypesList
];

export const processingTypesFullList: StatusConfig<
  ProcessingType
>[] = [
  ...onlyProcessingTypesList,
  ...onlyProcessingTypesManualList,
  ...commonProcessingTypesList
];

export const processingsConfigMap = ProcessingTypesMapper
  .toProcessingsConfigMap(processingTypesFullList);
