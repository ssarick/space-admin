<script setup lang="ts">
import { NFormItem } from 'naive-ui';
import BaseCard from '@/shared/UI/base-card';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import { inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import {
  CreateBinsFormEmits,
  CreateBinsFormProps
} from '@/projects/control-panel/entities/bins/create-form/create-bins-form.types';
import { inventoryFieldLimits } from '@/projects/inventory/shared/utils/constants/field-limits';
import useCreateBinsForm from './useCreateBinsForm';

const props = defineProps<CreateBinsFormProps>();
const emit = defineEmits<CreateBinsFormEmits>();

const {
  partner,
  port,
  name,
  operationType,
  merchantId,
  validateForm,
  formRef,
  formRules,
  restoreFormValidation
} = useCreateBinsForm(props, emit);

defineExpose({
  validate: validateForm,
  restoreValidation: restoreFormValidation
});
</script>

<template>
  <BaseForm
    ref="formRef"
    no-prevent-route
    vertical
    :model="props.model"
    :rules="formRules"
  >
    <BaseCard
      class="mb-4 pb-0 px-2 pt-4"
      hide-header
      bordered
    >
      <n-form-item
        path="name"
        :label="$t('Name2')"
      >
        <BaseInput
          v-model="name"
          :maxlength="inventoryFieldLimits.fullName.maxLength"
        />
      </n-form-item>

      <n-form-item
        path="port"
        :label="$t('port')"
      >
        <BaseInput
          v-model="port"
          :allow-input="inputAllowOnlyNumber"
        />
      </n-form-item>

      <n-form-item
        path="partner"
        :label="$t('partner')"
      >
        <BaseInput
          v-model="partner"
        />
      </n-form-item>

      <n-form-item
        path="operationType"
        :label="$t('operationType')"
      >
        <BaseInput
          v-model="operationType"
        />
      </n-form-item>

      <n-form-item
        path="merchantId"
        label="merchantId"
      >
        <BaseInput
          v-model="merchantId"
        />
      </n-form-item>
    </BaseCard>

    <n-button
      attr-type="submit"
      type="primary"
      class="px-7"
      :loading="props.loading"
    >
      {{ props.submitLocale }}
    </n-button>
  </BaseForm>
</template>
