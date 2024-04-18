import { computed, reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useVModel } from '@vueuse/core';
import { useDialog, useMessage } from 'naive-ui';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { ApiCertificate } from '@/projects/b2b/shared/api';
import {
  CertificateType,
  ICertificate,
  ICertificateTypeAndSerialFormModel
} from '@/projects/b2b/shared/types/certificate.types';
import {
  IUserCertificateCreationActionEmit,
  IUserCertificateCreationActionProps
} from './user-certificate-creation-actions.types';

export default function useUserCertificateCreationActions(
  props: IUserCertificateCreationActionProps,
  emit: IUserCertificateCreationActionEmit
) {
  const loading = ref(false);
  const { t } = useI18n();
  const toast = useMessage();
  const { user } = useAuthStore();
  const route = useRoute();
  const dialog = useDialog();
  const userId = String(route.params.userId || '');
  const businessCode = String(route.params.businessCode || '');
  const formRef = useFormRef();

  const newCertificateModel = reactive<ICertificateTypeAndSerialFormModel>({
    certificateType: CertificateType.INTER_BANK,
    certificateSerial: ''
  });

  const isMobileCertificate = useVModel(
    props, 'isMobileCertificate', emit
  );

  const submitButtonLabel = computed(() =>
    t(
      newCertificateModel.certificateType === CertificateType.MOBILE_BANK
        ? 'Create'
        : 'Add'
    )
  );

  const popCertificate = () => emit('popCertificate');

  const unshiftCertificate = (certificate: ICertificate) =>
    emit('unshiftCertificate', certificate);

  const showMessageAfterCertificateCreated = () =>
    toast.success(
      t(
        newCertificateModel.certificateType === CertificateType.MOBILE_BANK
          ? 'Mobile-certificate-created'
          : 'USB-token-added'
      )
    );

  const resetCertificateForm = () => {
    formRef.value?.restoreValidation();
    showMessageAfterCertificateCreated();

    newCertificateModel.certificateSerial = '';
  };

  const requestCreateCertificate = async (): Promise<ICertificate | null> => {
    const { item, error } = await ApiCertificate.createCertificate({
      certificateType: newCertificateModel.certificateType,
      branch: user?.branch!,
      userId,
      businessCode,
      password: newCertificateModel.certificateSerial
    });

    return error ? null : item;
  };

  const handleCreateCertificate = (certificate: ICertificate | null) => {
    if (
      isMobileCertificate.value &&
      certificate?.certificateType !== CertificateType.MOBILE_BANK
    )
      return;

    certificate && unshiftCertificate(certificate);

    props.maxCount &&
      props.certificates.length > props.maxCount &&
      popCertificate();
  };

  const onCreate = async () => {
    const formHasError = await formValidate(formRef.value);

    if (formHasError) return;

    loading.value = true;

    const certificate = await requestCreateCertificate();

    handleCreateCertificate(certificate);
    certificate && resetCertificateForm();

    loading.value = false;
  };

  const onBeforeCreate = () => {
    if (newCertificateModel.certificateType === CertificateType.INTER_BANK)
      return onCreate();

    dialog.warning({
      title: t('Old-certficate-will-replaced'),
      positiveText: t('Create'),
      negativeText: t('Cancel'),
      positiveButtonProps: {
        type: 'warning',
        ghost: true
      },
      negativeButtonProps: {
        type: 'default'
      },
      onPositiveClick: () => {
        onCreate();
      }
    });
  };

  watch(
    () => newCertificateModel.certificateType,
    () => isMobileCertificate.value = newCertificateModel
      .certificateType === CertificateType.MOBILE_BANK
  );

  return {
    loading,
    newCertificateModel,
    formRef,
    onBeforeCreate,
    submitButtonLabel
  };
}
