import { StatusColor, StatusConfig } from '@/shared/types/status.types';
import { BindedFaceStatus } from '@/projects/binded-face/shared/types/binded-face.types';
// TODO: verstka

export const bindedFaceStatusMapper:
  Record<BindedFaceStatus, StatusConfig> = {
    [BindedFaceStatus.ACTIVE]: {
      color: StatusColor.GREEN
    },
    [BindedFaceStatus.INACTIVE]: {
      color: StatusColor.RED
    }
  };
