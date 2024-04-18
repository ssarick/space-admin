import { StatusColor, StatusConfig } from '@/shared/types/status.types';
import { SubsidyApplicationStatus } from '@/projects/subsidy/shared/types/application.types';

export const subsidyApplicationStatusesMap:
  Record<SubsidyApplicationStatus, StatusConfig> = {
    [SubsidyApplicationStatus.CREATED]: {
      color: StatusColor.SILVER
    },
    [SubsidyApplicationStatus.SENDING_PROCESS]: {
      color: StatusColor.ORANGE
    },
    [SubsidyApplicationStatus.SENDING_ERROR]: {
      color: StatusColor.RED
    },
    [SubsidyApplicationStatus.VALIDATE_MINFIN]: {
      color: StatusColor.GRAY_DARK
    },
    [SubsidyApplicationStatus.DUPLICATE_MINFIN]: {
      color: StatusColor.BLUE
    },
    [SubsidyApplicationStatus.SENT_MINFIN]: {
      color: StatusColor.GREEN
    }
  };
