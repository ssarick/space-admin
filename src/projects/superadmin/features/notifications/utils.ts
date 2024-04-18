import { IListItem } from '@/shared/types/common.types';
import { INotification } from '@/projects/superadmin/shared/types/notifications.types';

export const mapNotificationsToList = (
  list: INotification[]
): IListItem[] => list.map(item => ({
  id: item.id,
  name: item.text
}));
