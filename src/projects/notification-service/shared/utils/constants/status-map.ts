import { StatusColor } from '@/shared/types/status.types';
import { MessagesStatusMapType } from '@/projects/notification-service/shared/types/send-message.types';
import { MessageStatuses } from '@/projects/notification-service/shared/utils/constants/enums';

export const MessagesStatusMap: MessagesStatusMapType[] = [
  {
    value: MessageStatuses.NEW,
    color: StatusColor.SILVER
  },
  {
    value: MessageStatuses.DONE,
    color: StatusColor.GREEN
  },
  {
    value: MessageStatuses.IN_PROCESS,
    color: StatusColor.ORANGE
  },
  {
    value: MessageStatuses.FAILED_SEND_TO_QUEUE,
    color: StatusColor.ORANGE
  },
  {
    value: MessageStatuses.INVALID_DATA,
    color: StatusColor.RED
  },
  {
    value: MessageStatuses.TIMEOUT_ERROR,
    color: StatusColor.RED
  },
  {
    value: MessageStatuses.FREQUENCY_LIMIT_EXCEEDED_ERROR,
    color: StatusColor.RED
  },
  {
    value: MessageStatuses.DUPLICATE_UUID_ERROR,
    color: StatusColor.RED
  },
  {
    value: MessageStatuses.TEMPLATE_NOT_FOUND_ERROR,
    color: StatusColor.RED
  },
  {
    value: MessageStatuses.FAILED,
    color: StatusColor.RED
  }
];
