import { computed, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVModels } from '@vueuse/core';
import { useDialog, useMessage } from 'naive-ui';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import { ApiCertificate } from '@/projects/b2b/shared/api';
import {
  CertificateState,
  ICertificateRevokingReasonFormModel
} from '@/projects/b2b/shared/types/certificate.types';
import {
  IUserCertificateActionsEmit,
  IUserCertificateActionsProps
} from './user-certificate-actions.types';

export default function useUserCertificateActions(
  props: IUserCertificateActionsProps,
  emit: IUserCertificateActionsEmit
) {
  const toast = useMessage();
  const dialog = useDialog();
  const { t } = useI18n();
  const revokingLoading = ref(false);

  const {
    certificateState,
    certificateRevokedReason,
    certificateDeactivateDate
  } = useVModels(
    props as Required<IUserCertificateActionsProps>,
    emit
  );

  const revokingReasonText = computed<string>({
    get: () => props
      .certificate
      ?.certificateRevokedReason
      || '',
    set: (value: string) => {
      if (!props.certificate) return;

      certificateRevokedReason.value = value;
    }
  });

  const formRef = useFormRef();

  const revokingReason = reactive<ICertificateRevokingReasonFormModel>({
    reasonId: null,
    reasonText: '',
    hasCustomReasonText: false,
    customReasonText: ''
  });

  const onBeforeRevoke = async () => {
    const formHasError = await formValidate(formRef.value);

    formHasError ||
      dialog.warning({
        title: t('Certificate-revoke-confirm'),
        positiveText: t('Revoke'),
        negativeText: t('Cancel'),
        positiveButtonProps: {
          type: 'error',
          ghost: true
        },
        negativeButtonProps: {
          type: 'default'
        },
        onPositiveClick: () => {
          onRevoke();
        }
      });
  };

  const handleRevoke = (isRevoked: boolean) => {
    if (!props.certificate || !isRevoked) return;

    certificateState.value = CertificateState.Revoked;

    certificateRevokedReason.value = revokingReason.customReasonText
      ? revokingReason.customReasonText
      : revokingReason.reasonText;

    certificateDeactivateDate.value = new Date().toISOString();

    toast.success(t('Certificate-revoked'));
  };

  const requestRevoke = async (): Promise<boolean> => {
    const { error } = await ApiCertificate.revokeMobileCertificate({
      certificateSerialNumber: props.certificate?.certificateSerialNumber || '',
      reasonId: revokingReason.reasonId || 0,
      reasonText: revokingReason.hasCustomReasonText
        ? revokingReason.customReasonText
        : revokingReason.reasonText
    });

    return !error;
  };

  const onRevoke = async () => {
    revokingLoading.value = true;

    handleRevoke(await requestRevoke());

    revokingLoading.value = false;
  };

  return {
    revokingLoading,
    onBeforeRevoke,
    onRevoke,
    revokingReason,
    revokingReasonText,
    formRef
  };
}
