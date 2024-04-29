import {
  onBeforeUnmount,
  onMounted,
  reactive
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useDialog, useMessage } from 'naive-ui';
import {
  blockQueue,
  getInfo,
  startProcessing,
  unblockQueue
} from '@/projects/autopay/shared/api/administration';
import { AdministrationFunction, IAdministationTypes } from '@/projects/autopay/shared/types/administration.types';
import useLimitsManage from './limits/useLimitsManage';
import useDebitControl from './useDebitControl';
import useHumoInterval from './useHumoInterval';

export default function useAdministration() {
  const { t } = useI18n();
  const administrationInfo = reactive<IAdministationTypes>({
  });
  const dialog = useDialog();
  const message = useMessage();
  let interval = 0;
  const humoInterval = useHumoInterval();
  const debitControl = useDebitControl();
  const limitsManage = useLimitsManage();

  const getAdministartionInfo = async () => {
    const { item } = await getInfo();

    administrationInfo.code = item.code;
    administrationInfo.status = item.status;
    administrationInfo.batchInfo = item.batchInfo;
    administrationInfo.queueInfo = item.queueInfo;
  };

  const turnOn = () =>
    makeAdministrativeAction(startProcessing);

  const pause = () =>
    makeAdministrativeAction(blockQueue);

  const renew = () =>
    makeAdministrativeAction(unblockQueue);

  onMounted(() => {
    interval = setInterval(() => {
      getAdministartionInfo();
    }, 3000);

    getAdministartionInfo();
  });

  onBeforeUnmount(() => {
    clearInterval(interval);
  });

  const makeAdministrativeAction = (
    adminProcessingFunction: AdministrationFunction
  ) => {
    dialog.warning({
      title: t('Подтвердите действие'),
      content: t('Вы уверены в этом?'),
      positiveText: t('Да'),
      negativeText: t('Закрыть'),
      onPositiveClick: async () => {
        const { error } = await adminProcessingFunction();
        error || message.success(t('Success'));
        getAdministartionInfo();
      }
    });
  };

  return {
    ...humoInterval,
    ...debitControl,
    ...limitsManage,
    administrationInfo,
    turnOn,
    pause,
    renew,
    stop
  };
}
