import {
  computed,
  ref,
  watch
} from 'vue';
import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import type BaseSelect from '@/shared/UI/base-select';
import { ruleRequired } from '@/shared/utils/validation-rules';
import {
  ICertificateRevokingReason,
  ICertificateRevokingReasonsFetchingPayload
} from '@/projects/b2b/shared/types/certificate.types';
import {
  IUserCertificateRevokingFormEmit,
  IUserCertificateRevokingFormProps
} from './user-certificate-revoking-form.types';

export default function useUserCertificateRevoking(
  props: IUserCertificateRevokingFormProps,
  emit: IUserCertificateRevokingFormEmit
) {
  const {
    formRef,
    validateForm,
    restoreFormValidation
  } =
    useFormRefWithValidate();

  const {
    reasonId,
    reasonText,
    customReasonText,
    hasCustomReasonText
  } =
    useVModels(props,
      emit);

  const reasonsRef = ref<InstanceType<typeof BaseSelect> | null>(null);

  const reasonsFetchingParams =
    computed<ICertificateRevokingReasonsFetchingPayload>(() => ({
      certificateType: props.certificate?.certificateType!
    }));

  const revokingReasonFormRules: FormRules = {
    reasonId: {
      trigger: [ 'change', 'blur' ],
      validator: ruleRequired
    },
    customReasonText: {
      trigger: [ 'input' ],
      validator: ruleRequired
    }
  };

  const onSelectRevokingReason = (reason?: ICertificateRevokingReason) => {
    reasonText.value = reason?.name || '';
    customReasonText.value = '';

    hasCustomReasonText.value = reason?.isNeedWriteReason || false;
  };

  watch(
    () => props.certificate?.certificateType,
    () => {
      reasonsRef.value?.onReset();
      onSelectRevokingReason();
    }
  );

  return {
    revokingReasonFormRules,
    onSelectRevokingReason,
    validateForm,
    formRef,
    restoreFormValidation,
    reasonsFetchingParams,
    reasonsRef,
    reasonId,
    hasCustomReasonText,
    customReasonText
  };
}
