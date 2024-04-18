import { Ref } from 'vue';
import { InternalNotification } from '../../shared/types/internal-notification.types';

export interface InternalNotificationListControls {
  notifications: Ref<InternalNotification[]>
}
