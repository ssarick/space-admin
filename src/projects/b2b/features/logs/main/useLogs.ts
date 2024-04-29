import {
  computed,
  reactive,
  ref
} from 'vue';
import { ILogsModel } from '@/projects/b2b/pages/logs/logs-page.types';
import { IClient } from '@/projects/b2b/shared/types/client.types';
import { LogEntityType } from '@/projects/b2b/shared/types/log.types';
import { IUser } from '@/projects/b2b/shared/types/user.types';
import useLogsTable from './useLogsTable';
import useLogsUpload from './useLogsUpload';

export default function useLogs() {
  const now = Date.now();

  const logsModel = reactive<ILogsModel>({
    logType: null,
    logEntityType: null,
    userLogin: null,
    userName: null,
    userPhone: null,
    userPidNumber: null,
    userPidSN: null,
    anyCode: null,
    datePeriod: [
      now, now
    ]
  });

  const logsClientSelected = ref<IClient | null>(null);
  const logsUserSelected = ref<IUser | null>(null);

  const logsTable = useLogsTable(
    logsModel,
    logsClientSelected,
    logsUserSelected
  );

  const logsUploadable = computed<boolean>(() => !!(
    logsTable.tableIsVisible.value
      && (logsModel.logEntityType ===
        LogEntityType.CLIENT
        ? logsClientSelected.value
        : logsUserSelected.value)
  ));

  const logsUpload = useLogsUpload(
    logsModel,
    logsClientSelected,
    logsUserSelected
  );

  return {
    ...logsTable,
    ...logsUpload,
    logsModel,
    logsClientSelected,
    logsUserSelected,
    logsUploadable
  };
}
