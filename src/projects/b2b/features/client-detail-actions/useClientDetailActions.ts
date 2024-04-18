import { computed, reactive, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useVModel } from '@vueuse/core';
import { useDialog, useMessage } from 'naive-ui';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import { ApiClient } from '@/projects/b2b/shared/api';
import { ClientStateId } from '@/projects/b2b/shared/types/client.types';
import {
  IBlockingReasonParams,
  IReasonFormModel
} from '@/projects/b2b/shared/types/reason.types';
import {
  ClientStateTextMap,
  IClientDetailActionsEmit,
  IClientDetailActionsProps
} from './client-detail-actions.types';

export default function useClientDetailActions(
  props: IClientDetailActionsProps,
  emit: IClientDetailActionsEmit
) {
  const toast = useMessage();
  const dialog = useDialog();
  const { t } = useI18n();
  const router = useRouter();
  const clientBlockingLoading = ref(false);
  const clientUnblockingLoading = ref(false);

  const afterClientStatusChangedMessages: ClientStateTextMap = {
    [ClientStateId.ACTIVE]: 'Client-unblocked',
    [ClientStateId.BLOCKED]: 'Client-blocked'
  };

  const client = useVModel(props, 'client', emit);

  const blockingReasonText = computed<string>({
    get: () => client.value?.stateReason || '',
    set: (value: string) => {
      if (!client.value) return;

      client.value.stateReason = value;
    }
  });

  const blockingReasonFormRef = useFormRef();

  const blockingReasonParams: IBlockingReasonParams = {
    entityName: 'clients'
  };

  const blockingReason = reactive<IReasonFormModel>({
    reasonId: null
  });

  const clientStateId = computed<ClientStateId>(() =>
    typeof client.value?.stateId === 'number'
      ? client.value?.stateId
      : ClientStateId.ACTIVE
  );

  const showMessageAfterChangeClientStatus = (state: ClientStateId) => {
    const afterMessage = afterClientStatusChangedMessages[state];

    afterMessage && toast.success(t(afterMessage));
  };

  const changeClientStatus = async (
    state: ClientStateId,
    loadingRef?: Ref<boolean>
  ): Promise<boolean> => {
    if (loadingRef) loadingRef.value = true;

    const { error } = await ApiClient
      .changeClientStatus({
        clientBlockingReasonId: blockingReason
          .reasonId || 0,
        state
      });

    if (loadingRef) loadingRef.value = false;

    if (client.value && !error) {
      client.value.stateId = state;

      showMessageAfterChangeClientStatus(state);
    }

    return !error;
  };

  const onBeforeBlockClient = async () => {
    const formHasError = await formValidate(blockingReasonFormRef.value);

    formHasError ||
      dialog.warning({
        title: t('Confirm-client-blocking'),
        positiveText: t('Block'),
        negativeText: t('Cancel'),
        positiveButtonProps: {
          type: 'error',
          ghost: true
        },
        negativeButtonProps: {
          type: 'default'
        },
        onPositiveClick: () => {
          onBlockClient();
        }
      });
  };

  const onBlockClient = async () =>
    changeClientStatus(ClientStateId.BLOCKED, clientBlockingLoading);

  const onBeforeUnblockClient = () => {
    dialog.warning({
      title: t('Confirm-client-unblocking'),
      positiveText: t('Unblock'),
      negativeText: t('Cancel'),
      positiveButtonProps: {
        type: 'warning',
        ghost: true
      },
      negativeButtonProps: {
        type: 'default'
      },
      onPositiveClick: () => {
        onUnblockClient();
      }
    });
  };

  const onUnblockClient = async () => {
    blockingReason.reasonId = null;
    blockingReasonText.value = '';

    return changeClientStatus(ClientStateId.ACTIVE, clientUnblockingLoading);
  };

  const redirectToUsers = () => {
    router.push({
      name: 'client-users',
      params: {
        businessCode: props.businessCode
      }
    });
  };

  return {
    clientStateId,
    clientBlockingLoading,
    clientUnblockingLoading,
    onBeforeBlockClient,
    onBlockClient,
    onBeforeUnblockClient,
    onUnblockClient,
    redirectToUsers,
    blockingReason,
    blockingReasonText,
    blockingReasonParams,
    blockingReasonFormRef
  };
}
