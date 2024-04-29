import { VNode } from 'vue';
import { useI18n } from 'vue-i18n';
import { ButtonProps, NTooltip } from 'naive-ui';
import { StatusColor, StatusConfig } from '@/shared/types/status.types';
import BaseButton from '@/shared/UI/base-button';
import {
  BaseProgressPercentageList,
  BaseProgressWithControls
} from '@/shared/UI/base-progress';
import { BaseStatusItem } from '@/shared/UI/base-status';
import renderIcon from '@/shared/utils/render-icon';
import { GroupMessagesClientInternal } from '@/projects/notification-service/shared/types/group-messages.types';
import { GroupedMessageStatuses, MessageStatuses } from '@/projects/notification-service/shared/utils/constants/enums';
import { GroupMessagesMainTableEmits } from '../group-messages-main-table.types';
import useGroupMessageOptions from './useCalcAndOptions';

export default function useStatusRenderer(
  emit: GroupMessagesMainTableEmits
) {
  const playAvailableStatuses:
  GroupedMessageStatuses[] = [
    GroupedMessageStatuses.PAUSE,
    GroupedMessageStatuses.NEW
  ];

  const inProgressStatuses:
  MessageStatuses[] = [
    MessageStatuses.NEW,
    MessageStatuses.IN_PROCESS
  ];

  const disableActionsStatuses:
  MessageStatuses[] = [
    MessageStatuses.NEW
  ];

  const { t } = useI18n();

  const {
    calcCountByStatuses,
    createOptionsByGroupMessage
  } = useGroupMessageOptions();

  const emitStop = (
    row: GroupMessagesClientInternal
  ) => emit('stop', {
    ...row
  });

  const emitPlay = (
    row: GroupMessagesClientInternal
  ) => emit('play', {
    ...row
  });

  const emitPause = (
    row: GroupMessagesClientInternal
  ) => emit('pause', {
    ...row
  });

  const checkIsPlayAvailable = (
    row: GroupMessagesClientInternal
  ): boolean => playAvailableStatuses.includes(
    row.massMailingStatus!
  );

  const getInProgressMessagesCount = (
    row: GroupMessagesClientInternal
  ): number => calcCountByStatuses(
    row, inProgressStatuses
  );

  const checkIsDoneMailing = (
    row: GroupMessagesClientInternal
  ): boolean => row.massMailingStatus ===
    GroupedMessageStatuses.STOP
    || !getInProgressMessagesCount(row);

  const renderProgress = (
    row: GroupMessagesClientInternal
  ): VNode => {
    const isPlayAvailable = checkIsPlayAvailable(row);

    const actionsDisabled = !calcCountByStatuses(
      row, disableActionsStatuses
    );

    const buttonCommonProps: ButtonProps = {
      quaternary: true,
      circle: true,
      type: 'primary',
      size: 'tiny'
    };

    return h(
      BaseProgressWithControls,
      {
        options: createOptionsByGroupMessage(row)
      },
      {
        actions: () => [
          h(
            BaseButton,
            {
              ...buttonCommonProps,
              loading: row.isStopLoading,
              disabled: actionsDisabled,
              renderIcon: renderIcon('close', {
                size: 24
              }),
              onClick: () => emitStop(row)
            }
          ),
          h(
            BaseButton,
            {
              ...buttonCommonProps,
              loading: row.isPlayOrPauseLoading,
              disabled: actionsDisabled,
              renderIcon: renderIcon(
                isPlayAvailable ? 'play' : 'pause',
                {
                  size: 24
                }
              ),
              onClick: () => isPlayAvailable
                ? emitPlay(row)
                : emitPause(row)
            }
          )
        ]
      }
    );
  };

  const getStatusConfig = (
    row: GroupMessagesClientInternal
  ): StatusConfig => row.massMailingStatus ===
    GroupedMessageStatuses.STOP
    ? {
      color: StatusColor.RED,
      label: t('STOP')
    }
    : {
      color: StatusColor.GREEN,
      label: t('DONE')
    };

  const renderStatus = (
    row: GroupMessagesClientInternal
  ): VNode => h(
    NTooltip,
    {
      placement: 'top-start'
    },
    {
      trigger: () => h(
        BaseStatusItem,
        {
          ...getStatusConfig(row),
          type: 'filled'
        }
      ),
      default: () => h(
        BaseProgressPercentageList,
        {
          options: createOptionsByGroupMessage(row)
        }
      )
    }
  );

  const renderProgressOrStatus = (
    row: GroupMessagesClientInternal
  ): VNode => checkIsDoneMailing(row)
    ? renderStatus(row)
    : renderProgress(row);

  return {
    renderProgressOrStatus
  };
}
