import { MessagesStatusGroupMap } from '../../types/group-messages.types';
import { MessageStatuses } from './enums';

export const messagesStatusGroupsMap:
MessagesStatusGroupMap = {
  done: [
    MessageStatuses.DONE
  ],
  error: [
    MessageStatuses.INVALID_DATA,
    MessageStatuses.TIMEOUT_ERROR,
    MessageStatuses.FREQUENCY_LIMIT_EXCEEDED_ERROR,
    MessageStatuses.DUPLICATE_UUID_ERROR,
    MessageStatuses.TEMPLATE_NOT_FOUND_ERROR,
    MessageStatuses.FAILED
  ],
  inProgress: [
    MessageStatuses.IN_PROCESS,
    MessageStatuses.FAILED_SEND_TO_QUEUE
  ]
};
