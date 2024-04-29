import { Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { IResponseData } from '@/shared/types/api.types';
import { IPagination } from '@/shared/types/pagination.types';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { ApiCertificate } from '@/projects/b2b/shared/api';
import { ICertificate } from '@/projects/b2b/shared/types/certificate.types';

export default function useUserCertificateFetch(
  certificates: Ref<ICertificate[]>,
  isMobileCertificates?: Ref<boolean>
) {
  const loading = ref(false);
  const route = useRoute();
  const { user } = useAuthStore();
  const userId = route.params.userId as string;

  const loadInetBankCertificates = async (
    pagination?: IPagination
  ): Promise<IResponseData<ICertificate>> =>
    ApiCertificate.fetchInetBankCertificates({
      branch: user?.branch!,
      userId,
      ...(pagination || {
      })
    });

  const loadMobileCertificates = async (
    pagination?: IPagination
  ): Promise<IResponseData<ICertificate>> =>
    ApiCertificate.fetchMobileCertificates({
      userId,
      ...(pagination || {
      })
    });

  const loadCertificates = async (pagination?: IPagination) => {
    loading.value = true;

    const response = await (isMobileCertificates?.value
      ? loadMobileCertificates
      : loadInetBankCertificates)(pagination);

    response.error || (certificates.value = response.items);

    loading.value = false;

    return response;
  };

  return {
    loading,
    loadCertificates
  };
}
