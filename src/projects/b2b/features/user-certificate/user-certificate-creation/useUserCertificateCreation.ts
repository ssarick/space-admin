import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserCertificateFullTable } from '@/projects/b2b/entities/user-certificate';
import { ICertificate } from '@/projects/b2b/shared/types/certificate.types';

export default function useUserCertificateCreation() {
  const certificates = ref<ICertificate[]>([]);
  const isMobileCertificate = ref(false);
  const router = useRouter();

  const userCertificateTableRef = ref<InstanceType<
    typeof UserCertificateFullTable
  > | null>(null);

  const pagination = computed(() => userCertificateTableRef.value?.pagination);

  const visibleKeys: (keyof ICertificate)[] = [
    'certificateSerialNumber',
    'certificateActivateDate',
    'certificateDeactivateDate'
  ];

  const onCloseModule = () => router.go(-1);

  const popCertificate = () => certificates.value.pop();

  const unshiftCertificate = (certificate: ICertificate) =>
    certificates.value.unshift({ ...certificate });

  const onChangeIsMobileCertificate = (value: boolean) => {
    isMobileCertificate.value = value;
  };

  return {
    onCloseModule,
    visibleKeys,
    certificates,
    isMobileCertificate,
    pagination,
    userCertificateTableRef,
    unshiftCertificate,
    popCertificate,
    onChangeIsMobileCertificate
  };
}
