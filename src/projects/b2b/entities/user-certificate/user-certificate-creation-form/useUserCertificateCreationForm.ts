import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { fieldLimits } from '@/shared/utils/constants/field-limits';
import { ruleRequired } from '@/shared/utils/validation-rules';
import { CertificateType } from '@/projects/b2b/shared/types/certificate.types';
import {
  IUserCertificateCreationFormEmit,
  IUserCertificateCreationFormProps
} from './user-certificate-creation-form.types';

export default function useUserCertificateCreationForm(
  props: IUserCertificateCreationFormProps,
  emit: IUserCertificateCreationFormEmit
) {
  const { t } = useI18n();

  const { certificateType, certificateSerial } = useVModels(props, emit);

  const certificateTypes = computed(() => [
    {
      label: t('USB-token'),
      value: CertificateType.INTER_BANK
    },
    {
      label: t('Mobile-app'),
      value: CertificateType.MOBILE_BANK
    }
  ]);

  const certificateSerialMaxLength = computed<
    number | undefined
  >(() => certificateType.value === CertificateType.MOBILE_BANK
    ? fieldLimits.certificatePin.maxLength
    : undefined
  );

  const { formRef, validateForm, restoreFormValidation } =
    useFormRefWithValidate();

  const formRules: FormRules = {
    certificateType: {
      trigger: [ 'change', 'blur' ],
      validator: ruleRequired
    },
    certificateSerial: {
      trigger: [ 'input' ],
      validator: ruleRequired
    }
  };

  const serialFieldLabel = computed(() =>
    t(
      certificateType.value === CertificateType.MOBILE_BANK
        ? 'PIN'
        : 'Serial-number'
    )
  );

  return {
    formRules,
    validateForm,
    formRef,
    serialFieldLabel,
    restoreFormValidation,
    certificateTypes,
    certificateType,
    certificateSerial,
    certificateSerialMaxLength
  };
}
