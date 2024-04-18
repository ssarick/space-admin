<script setup lang="ts">
import { NFormItem } from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseSelect from '@/shared/UI/base-select';
import { ApiDictionary } from '@/projects/b2b/shared/api';
import {
  IBlockingReasonFormEmits,
  IBlockingReasonFormProps
} from './blocking-reason-form.types';
import useBlockingReasonForm from './useBlockingReasonForm';

const props = defineProps<IBlockingReasonFormProps>();
const emit = defineEmits<IBlockingReasonFormEmits>();

const {
  blockingReasonFormRules,
  onSelectBlockingReason,
  formRef,
  validateForm,
  restoreFormValidation,
  reasonId
} = useBlockingReasonForm(props, emit);

defineExpose({
  validate: validateForm,
  restoreValidation: restoreFormValidation
});
</script>

<template>
  <BaseForm
    ref="formRef"
    :show-label="false"
    :rules="blockingReasonFormRules"
    :model="props.model"
  >
    <n-form-item path="reasonId">
      <BaseSelect
        v-model:value="reasonId"
        label-field="reasonDesc"
        value-field="entityId"
        class="min-field-width"
        :placeholder="$t('Reason-for-blocking')"
        :disabled="props.disabled"
        :request="ApiDictionary.fetchBlockingReasons"
        :params="props.params"
        @select="onSelectBlockingReason"
      />
    </n-form-item>
  </BaseForm>
</template>
