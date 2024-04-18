<script lang="ts" setup>
import { NFormItem } from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import BaseSelect from '@/shared/UI/base-select';
import {
  IUserCertificateCreationFormEmit,
  IUserCertificateCreationFormProps
} from './user-certificate-creation-form.types';
import useUserCertificateCreationForm from './useUserCertificateCreationForm';

const props = defineProps<IUserCertificateCreationFormProps>();
const emit = defineEmits<IUserCertificateCreationFormEmit>();

const {
  formRef,
  formRules,
  validateForm,
  restoreFormValidation,
  certificateTypes,
  serialFieldLabel,
  certificateType,
  certificateSerial,
  certificateSerialMaxLength
} = useUserCertificateCreationForm(props, emit);

defineExpose({
  validate: validateForm,
  restoreValidation: restoreFormValidation
});
</script>

<template>
  <BaseForm
    ref="formRef"
    :show-label="false"
    :rules="formRules"
    :model="props.model"
  >
    <n-form-item path="type">
      <BaseSelect
        v-model:value="certificateType"
        :placeholder="$t('Key-type')"
        :disabled="props.disabled"
        :options="certificateTypes"
      />
    </n-form-item>

    <n-form-item path="certificateSerial">
      <BaseInput
        v-model="certificateSerial"
        class="mt-1"
        :placeholder="serialFieldLabel"
        :disabled="props.disabled"
        :maxlength="certificateSerialMaxLength"
      />
    </n-form-item>
  </BaseForm>
</template>
