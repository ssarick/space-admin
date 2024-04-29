import { Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoadingMessage from '@/shared/composables/useLoadingMessage';
import { IResponseData } from '@/shared/types/api.types';
import { DownloadType } from '@/shared/types/download.types';
import DATE_SHORTCUTS from '@/shared/utils/constants/date-shortcuts';
import { downloadFile } from '@/shared/utils/download';
import { formatDate, formatDateToUTC } from '@/shared/utils/functions/date';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { ILogsModel } from '@/projects/b2b/pages/logs/logs-page.types';
import { ApiLog } from '@/projects/b2b/shared/api';
import { IClient } from '@/projects/b2b/shared/types/client.types';
import {
  ILogsCreatedReport,
  ILogsFilter,
  LogEntityType
} from '@/projects/b2b/shared/types/log.types';
import { IUser } from '@/projects/b2b/shared/types/user.types';
import useUserFetcher from './useUserFetcher';

export default function useLogsUpload(
  model: ILogsModel,
  selectedClient: Ref<IClient | null>,
  selectedUser: Ref<IUser | null>
) {
  const { t } = useI18n();
  const { user } = useAuthStore();
  const organizationsModal = ref(false);
  const usersModal = ref(false);
  const organizationsModalLoading = ref(false);
  const usersModalLoading = ref(false);
  const reportPingDelayInSeconds = 3;
  let reportPingId = 0;

  const {
    usersTableRef: clientUsersTableRef,
    users: clientUsers,
    usersLoading: clientUsersLoading,
    fetchUsers: clientUsersFetch
  } = useUserFetcher(
    model, selectedClient, true
  );

  const createReportLoadingMessage = (
    onDestroy?: () => void
  ) => {
    const { loadingMessage } = useLoadingMessage(
      () => t('Download-logs-for-period', [
        formatDate(model.datePeriod[0]) +
          ' - ' +
          formatDate(model.datePeriod[1])
      ]),
      onDestroy
    );

    return () => {
      onDestroy && onDestroy();
      loadingMessage?.destroy();
    };
  };

  const pingReport = async (
    reportId: string
  ): Promise<boolean> => {
    const { item } = await ApiLog
      .fetchReport(reportId);

    if (item?.base64String) {
      downloadFile(
        DownloadType.EXCEL_BASE64,
        item.base64String
      );

      return true;
    }

    return false;
  };

  const stopPingReport = () =>
    reportPingId && clearTimeout(
      reportPingId
    );

  const startPingReport = async (
    reportId: string
  ): Promise<boolean> => {
    const reportIsReady = await pingReport(
      reportId
    );

    return reportIsReady
      ? reportIsReady
      : new Promise(resolve => {
        reportPingId = setTimeout(
          async () => resolve(
            await startPingReport(reportId)
          ),
          DATE_SHORTCUTS.MS_IN_SEC * reportPingDelayInSeconds
        );
      });
  };

  const handleReportCreationResponse = async (
    { item }: IResponseData<ILogsCreatedReport>
  ) => {
    if (!item?.reportId) return;

    const destroyReportLoadingMessage =
      createReportLoadingMessage(
        stopPingReport
      );

    const reportIsReady = await startPingReport(
      item.reportId
    );

    reportIsReady
      && destroyReportLoadingMessage();
  };

  const getReportCreationCommonData =
    (): Partial<ILogsFilter> => ({
      logType: model.logType!,
      branch: user?.branch,
      intervalStart: formatDateToUTC(
        model.datePeriod[0]
      ),
      intervalEnd: formatDateToUTC(
        model.datePeriod[1], true
      )
    });

  const getClientReportCreationData = (
    userIds: IUser['userId'][]
  ): ILogsFilter => ({
    clientIds: [
      selectedClient.value?.clientCode || ''
    ],
    userIds: userIds.map(id => +(id || 0)),
    ...getReportCreationCommonData()
  } as ILogsFilter);

  const getUserReportCreationData = (
    organizationIds: string[]
  ): ILogsFilter => ({
    clientIds: organizationIds.map(
      id => id || ''
    ),
    userIds: [
      +(selectedUser.value?.userId || 0)
    ],
    ...getReportCreationCommonData()
  } as ILogsFilter);

  const onBeforeUploadClientLogs = () =>
    organizationsModal.value = true;

  const onBeforeUploadUserLogs = () => {
    clientUsersFetch();

    usersModal.value = true;
  };

  const onBeforeUploadLogs = () => (model.logEntityType ===
    LogEntityType.USER
    ? onBeforeUploadClientLogs
    : onBeforeUploadUserLogs)();

  const onUploadClientLogs = async (
    userIds: IUser['userId'][]
  ) => {
    usersModalLoading.value = true;

    const response = await ApiLog
      .createReport(
        getClientReportCreationData(userIds)
      );

    handleReportCreationResponse(response);

    usersModalLoading.value = false;
    usersModal.value = false;
  };

  const onUploadUserLogs = async (
    organizationIds: string[]
  ) => {
    organizationsModalLoading.value = true;

    const response = await ApiLog
      .createReport(
        getUserReportCreationData(
          organizationIds
        )
      );

    handleReportCreationResponse(response);

    organizationsModalLoading.value = false;
    organizationsModal.value = false;
  };

  return {
    organizationsModal,
    usersModal,
    onBeforeUploadLogs,
    onUploadClientLogs,
    onUploadUserLogs,
    organizationsModalLoading,
    usersModalLoading,
    clientUsersTableRef,
    clientUsersLoading,
    clientUsersFetch,
    clientUsers
  };
}
