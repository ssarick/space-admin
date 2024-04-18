<script lang="ts" setup>
import { NFormItem } from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import BaseSelect from '@/shared/UI/base-select';
import { ApiDictionary } from '@/projects/b2b/shared/api';
import {
  IUserCertificateRevokingFormEmit,
  IUserCertificateRevokingFormProps
} from './user-certificate-revoking-form.types';
import useUserCertificateRevokingForm from './useUserCertificateRevokingForm';

const props = defineProps<IUserCertificateRevokingFormProps>();
const emit = defineEmits<IUserCertificateRevokingFormEmit>();

const {
  formRef,
  revokingReasonFormRules,
  onSelectRevokingReason,
  validateForm,
  restoreFormValidation,
  reasonsRef,
  reasonsFetchingParams,
  reasonId,
  hasCustomReasonText,
  customReasonText
} = useUserCertificateRevokingForm(props, emit);

defineExpose({
  validate: validateForm,
  restoreValidation: restoreFormValidation
});
</script>

<template>
  <BaseForm
    ref="formRef"
    :show-label="false"
    :rules="revokingReasonFormRules"
    :model="props.model"
  >
    <n-form-item path="reasonId">
      <BaseSelect
        v-model:value="reasonId"
        ref="reasonsRef"
        :key="`reason-${props.certificate?.certificateType}`"
        label-field="name"
        value-field="id"
        :placeholder="$t('Revoke-reason')"
        :disabled="props.disabled"
        :request="ApiDictionary.fetchCertificateRevokingReasons"
        :params="reasonsFetchingParams"
        @select="onSelectRevokingReason"
      />
    </n-form-item>

    <n-form-item
      v-if="hasCustomReasonText"
      path="customReasonText"
    >
      <BaseInput
        v-model="customReasonText"
        class="mt-1"
        :placeholder="$t('Enter-other-revoke-reason')"
        :disabled="props.disabled"
      />
    </n-form-item>
  </BaseForm>
</template>
