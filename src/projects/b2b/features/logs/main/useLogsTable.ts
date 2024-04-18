import { computed, Ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { globalConfig } from '@/shared/config/global-config';
import { fieldLimits } from '@/shared/utils/constants/field-limits';
import { ILogsModel, LogsClientFieldLength } from '@/projects/b2b/pages/logs/logs-page.types';
import { IClient } from '@/projects/b2b/shared/types/client.types';
import { LogEntityType } from '@/projects/b2b/shared/types/log.types';
import { IUser } from '@/projects/b2b/shared/types/user.types';
import useClientFetcher from './useClientFetcher';
import useUserFetcher from './useUserFetcher';

export default function useLogsTable(
  model: ILogsModel,
  clientSelected: Ref<IClient | null>,
  userSelected: Ref<IUser | null>
) {
  const logsClientModelKeys: LogsClientFieldLength = {
    userLogin: 'login',
    userName: 'fio',
    userPhone: 'phone',
    userPidNumber: 'pidNum',
    userPidSN: 'pidSnOther'
  };

  const clientFetcher = useClientFetcher(model);
  const userFetcher = useUserFetcher(model);

  const checkClientTableVisibility = (
    model: ILogsModel
  ): boolean => {
    const anyCodeLength = model.anyCode?.length || 0;

    return anyCodeLength >= fieldLimits.inn.minLength;
  };

  const checkUserTableVisibility = (
    model: ILogsModel
  ): boolean => {
    for (const key in logsClientModelKeys) {
      const valueLength = model[key]?.length || 0;
      const { min } = fieldLimits[logsClientModelKeys[key]];

      if (valueLength >= min) return true;
    }

    return false;
  };

  const tableIsVisible = computed<boolean>(() => {
    if (model.logEntityType === null
      || model.logType === null)
      return false;

    return (model.logEntityType ===
      LogEntityType.CLIENT
      ? checkClientTableVisibility
      : checkUserTableVisibility)(model);
  });

  const fetchTableData = async () => {
    if (!tableIsVisible.value) return;

    clientSelected.value = null;
    userSelected.value = null;

    if (model.logEntityType ===
      LogEntityType.CLIENT) {
      await clientFetcher.fetchClients();
    } else {
      userFetcher.resetUsersPagination();
      await userFetcher.fetchUsers();
    }
  };

  const debounceFetchTableData = useDebounceFn(
    fetchTableData, globalConfig.debounceInMS
  );

  watch(
    () => ({
      userLogin: model.userLogin,
      userName: model.userName,
      userPhone: model.userPhone,
      userPidNumber: model.userPidNumber,
      userPidSN: model.userPidSN,
      anyCode: model.anyCode
    }),
    debounceFetchTableData
  );

  return {
    ...clientFetcher,
    ...userFetcher,
    tableIsVisible,
    fetchTableData
  };
}
