import { useI18n } from 'vue-i18n';
import { ProgressOption } from '@/shared/types/progress.types';
import { GroupMessagesClientInternal, MessagesStatusGroupMap } from '@/projects/notification-service/shared/types/group-messages.types';
import { MessageStatuses } from '@/projects/notification-service/shared/utils/constants/enums';
import { messagesStatusGroupsMap } from '@/projects/notification-service/shared/utils/constants/status-groups-map';
import { messagesProgressMap } from '../utils/constants/progress-map';

export default function useCalcAndOptions() {
  const { t } = useI18n();

  const calcCountByStatuses = (
    row: GroupMessagesClientInternal,
    statuses: MessageStatuses[]
  ): number => row.messageStatuses?.reduce(
    (acc, message) => {
      const isInGroup = statuses.includes(
        message.status
      );

      return isInGroup
        ? acc + message.count
        : acc;
    },
    0
  ) || 0;

  const calcPercentage = (
    row: GroupMessagesClientInternal,
    mapKey: keyof MessagesStatusGroupMap,
    totalCount: number
  ): number => {
    const count = calcCountByStatuses(
      row, messagesStatusGroupsMap[mapKey]
    );

    return Math.round(
      count * 100 / totalCount
    );
  };

  const calcTotalCount = (
    row: GroupMessagesClientInternal
  ): number => row.messageStatuses?.reduce(
    (acc, message) => acc + message.count,
    0
  ) || 0;

  const createCommonCalc = (
    row: GroupMessagesClientInternal
  ) => {
    const totalCount = calcTotalCount(row);

    return (
      mapKey: keyof MessagesStatusGroupMap
    ) => ({
      color: messagesProgressMap[mapKey].color,
      percentage: calcPercentage(
        row, mapKey, totalCount
      )
    });
  };

  const createOptionsByGroupMessage = (
    row: GroupMessagesClientInternal
  ): ProgressOption[] => {
    const calcCommonKeys = createCommonCalc(row);

    return [
      {
        ...calcCommonKeys('done'),
        isDone: true,
        label: t('DONE')
      },
      {
        ...calcCommonKeys('inProgress'),
        processing: true,
        label: t('IN_PROGRESS')
      },
      {
        ...calcCommonKeys('error'),
        label: t('FAILED')
      }
    ];
  };

  return {
    calcCountByStatuses,
    createOptionsByGroupMessage
  };
}
