import { useI18n } from 'vue-i18n';
import { useMessage } from 'naive-ui';
import { ApiNotificationMessages } from '@/projects/notification-service/shared/api';
import { GroupMessagesClientInternal } from '@/projects/notification-service/shared/types/group-messages.types';
import { GroupedMessageStatuses } from '@/projects/notification-service/shared/utils/constants/enums';

export default function useGroupMessagesProgressControls(
  groupMessages: Ref<GroupMessagesClientInternal[]>
) {
  const { t } = useI18n();
  const toast = useMessage();

  const updateGroupMessage = (
    groupMessage: GroupMessagesClientInternal
  ) => {
    const current = groupMessages.value.find(
      ({ id }) => id === groupMessage.id
    );

    current && Object.assign(
      current, groupMessage
    );
  };

  const changeMailingStatus = async (
    groupMessage: GroupMessagesClientInternal,
    loadingKey: 'isStopLoading'
      | 'isPlayOrPauseLoading',
    newStatus: GroupedMessageStatuses
  ) => {
    updateGroupMessage({
      id: groupMessage.id,
      [loadingKey]: true
    });

    const { error } = await ApiNotificationMessages
      .changeStatusOfGroupedMessage({
        massMailingId: groupMessage.id!,
        newStatus
      });

    updateGroupMessage({
      id: groupMessage.id,
      massMailingStatus: error
        ? groupMessage.massMailingStatus
        : newStatus,
      [loadingKey]: false
    });

    error || toast.success(t('Success'));
  };

  const playMailing = async (
    groupMessage: GroupMessagesClientInternal
  ) => changeMailingStatus(
    groupMessage,
    'isPlayOrPauseLoading',
    GroupedMessageStatuses.IN_PROGRESS
  );

  const pauseMailing = async (
    groupMessage: GroupMessagesClientInternal
  ) => changeMailingStatus(
    groupMessage,
    'isPlayOrPauseLoading',
    GroupedMessageStatuses.PAUSE
  );

  const stopMailing = async (
    groupMessage: GroupMessagesClientInternal
  ) => changeMailingStatus(
    groupMessage,
    'isStopLoading',
    GroupedMessageStatuses.STOP
  );

  return {
    playMailing,
    pauseMailing,
    stopMailing
  };
}
