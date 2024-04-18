import { InternalNotificationCreateServiceModel } from '../../shared/types/internal-notification.types';

export interface InternalNotificationCreateModel {
  version: string
  services: InternalNotificationCreateServiceModel[]
}
