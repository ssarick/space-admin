import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { ApiCertificate } from '@/projects/b2b/shared/api';
import { ICertificate } from '@/projects/b2b/shared/types/certificate.types';

export default function useUserCertificateAddExisting() {
  const certificates = ref<ICertificate[]>([]);
  const isMobileCertificate = ref(true);
  const selectedCertificate = ref<ICertificate | null>(null);
  const saveIsLoading = ref(false);
  const toast = useMessage();
  const { user } = useAuthStore();
  const { t } = useI18n();
  const router = useRouter();

  const onCloseModule = () => router.go(-1);

  const onSave = async () => {
    saveIsLoading.value = true;

    const { error } = await ApiCertificate.attachMobileCertificate({
      branch: user?.branch!,
      businessCode: String(selectedCertificate.value?.clientCode || ''),
      userId: String(selectedCertificate.value?.userId || ''),
      serialNumber: String(
        selectedCertificate.value?.certificateSerialNumber || ''
      )
    });

    error || toast.success(t('Certificate-added'));

    saveIsLoading.value = false;
  };

  const visibleKeys: (keyof ICertificate)[] = [
    'certificateSerialNumber',
    'certificateActivateDate',
    'certificateState',
    'certificateDeactivateDate'
  ];

  return {
    onCloseModule,
    visibleKeys,
    selectedCertificate,
    isMobileCertificate,
    onSave,
    certificates,
    saveIsLoading
  };
}
