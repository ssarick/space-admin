import {
  computed,
  h,
  ref
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { NText, useDialog } from 'naive-ui';
import { Type } from 'naive-ui/es/button/src/interface';
import { useClientUserOrganizationSync } from '@/projects/b2b/entities/organization-list';
import OrganizationList from '@/projects/b2b/entities/organization-list/OrganizationList.vue';
import { useUserCertificateCreationVariantDialog } from '@/projects/b2b/entities/user-certificate';
import { ApiCertificate } from '@/projects/b2b/shared/api';
import {
  CertificateState,
  CertificateType,
  ICertificate
} from '@/projects/b2b/shared/types/certificate.types';
import { IUserOrganization } from '@/projects/b2b/shared/types/user.types';
import { IUserCertificateManageProps } from './user-certificate-manage.types';

export default function useUserCertificateManage(
  props: IUserCertificateManageProps
) {
  const selectedCertificate = ref<ICertificate | null>(null);
  const isMobileCertificate = ref(false);
  const certificates = ref<ICertificate[]>([]);
  const router = useRouter();
  const { t } = useI18n();
  const dialog = useDialog();
  const selectedCertificateStateChangingLoading = ref(false);
  const selectedOrganization = ref<IUserOrganization | null>(null);
  const route = useRoute();
  const userId = +(route.params?.userId || 0);

  const certificateBlockableStates: CertificateState[] = [
    CertificateState.Blocked,
    CertificateState.Active
  ];

  const selectedCertificateIsActive = computed(
    () => selectedCertificate.value?.certificateState ===
      CertificateState.Active
  );

  const selectedCertificateIsRevokable = computed(
    () => props.isEdit
      && (selectedCertificate.value?.certificateType ===
        CertificateType.MOBILE_BANK)
      && selectedCertificate.value?.certificateState
      && (selectedCertificate.value?.certificateState ===
        CertificateState.Active));

  const selectedCertificateIsBlockable = computed(
    () => props.isEdit
      && certificateBlockableStates.includes(
        selectedCertificate.value?.certificateState!
      )
  );

  const selectedOrganizationBusinessCode = computed(
    () => selectedOrganization.value?.clientCode || ''
  );

  const selectedCertificateStateChangingButtonText = computed(() =>
    selectedCertificateIsActive.value ? t('Block') : t('Unblock')
  );

  const selectedCertificateStateChangingButtonType = computed<Type>(() =>
    selectedCertificateIsActive.value ? 'error' : 'warning'
  );

  const setCertificateDeactivateDate = (value?: string | null) =>
    selectedCertificate.value &&
    (selectedCertificate.value.certificateDeactivateDate = value);

  const setCertificateRevokedReason = (value?: string | null) =>
    selectedCertificate.value &&
    (selectedCertificate.value.certificateRevokedReason = value);

  const setCertificateState = (value?: CertificateState | null) =>
    selectedCertificate.value &&
    (selectedCertificate.value.certificateState = value);

  const selectOrganization = (value?: IUserOrganization | null) =>
    (selectedOrganization.value = value || null);

  const { dialogIsActive } = useUserCertificateCreationVariantDialog(
    selectedOrganizationBusinessCode,
    () => [
      h(
        NText,
        {
          class: 'my-2',
          tag: 'h4'
        },
        () => t('Select-organization')
      ),
      h(OrganizationList, {
        class: 'mb-2',
        organization: selectedOrganization.value,
        'onUpdate:organization': selectOrganization,
        singleOrganization: !!props.businessCode,
        loading: props.clientUserLoading,
        userId
      })
    ]
  );

  const onAddCertificate = () => (dialogIsActive.value = true);

  const onCloseModule = () => router.go(-1);

  const onBeforeChangeSelectedCertificateState = () => {
    dialog.warning({
      title: t(
        selectedCertificateIsActive.value
          ? 'Confirm-certificate-blocking'
          : 'Confirm-certificate-unblocking'
      ),
      positiveText: selectedCertificateStateChangingButtonText.value,
      negativeText: t('Cancel'),
      positiveButtonProps: {
        type: selectedCertificateIsActive.value
          ? 'error'
          : 'warning',
        ghost: true
      },
      negativeButtonProps: {
        type: 'default'
      },
      onPositiveClick: () => {
        onChangeSelectedCertificateState();
      }
    });
  };

  const onChangeSelectedCertificateState = async () => {
    if (!selectedCertificate.value) return;

    selectedCertificateStateChangingLoading.value = true;

    const certificateNewState = selectedCertificateIsActive.value
      ? CertificateState.Blocked
      : CertificateState.Active;

    const { error } = await (
      isMobileCertificate.value
        ? ApiCertificate.changeMobileCertificateState
        : ApiCertificate.changeInetBankCertificateState
    )({
      certificateSerialNumber: selectedCertificate
        .value
        .certificateSerialNumber,
      certificateState: certificateNewState,
      certificateAnswerId: selectedCertificate
        .value
        .certificateAnswerId
    });

    error || (
      selectedCertificate.value.certificateState = certificateNewState
    );

    selectedCertificateStateChangingLoading.value = false;
  };

  useClientUserOrganizationSync(
    () => props.clientUser,
    selectedOrganization
  );

  return {
    selectedCertificate,
    onAddCertificate,
    onCloseModule,
    selectedCertificateIsRevokable,
    selectedCertificateIsBlockable,
    isMobileCertificate,
    certificates,
    selectedCertificateStateChangingLoading,
    onBeforeChangeSelectedCertificateState,
    selectedCertificateStateChangingButtonText,
    selectedCertificateStateChangingButtonType,
    setCertificateDeactivateDate,
    setCertificateRevokedReason,
    setCertificateState
  };
}
