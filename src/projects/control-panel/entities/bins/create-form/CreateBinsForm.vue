<script setup lang="ts">
import { NFormItem, NGrid } from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import BaseSelect from '@/shared/UI/base-select/BaseSelect.vue';
import { inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import {
  CreateBinsFormEmits,
  CreateBinsFormProps
} from '@/projects/control-panel/entities/bins/create-form/create-bins-form.types';
import useCreateBinsForm from './useCreateBinsForm';

const props = defineProps<CreateBinsFormProps>();
const emit = defineEmits<CreateBinsFormEmits>();

const {
  cardTypeOptions,
  legalTypeOptions,
  processingTypeOptions,
  cardBin,
  cardType,
  processing,
  processingBankId,
  bankId,
  legalType,
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
    :model="props.model"
    :rules="formRules"
  >
    <n-grid
      x-gap="32"
      y-gap="12"
      cols="2"
      responsive="screen"
      item-responsive
    >
      <n-gi span="1">
        <n-form-item
          path="bankId"
          :label="$t('bankId')"
        >
          <BaseSelect
            v-model:value="bankId"
            :options="cardTypeOptions"
            @update:model-value="() => {}"
          />
        </n-form-item>
      </n-gi>

      <n-gi span="1">
        <n-form-item
          path="cardType"
          :label="$t('cardType')"
        >
          <BaseSelect
            v-model="cardType"
            :options="cardTypeOptions"
          />
        </n-form-item>
      </n-gi>

      <n-gi span="1">
        <n-form-item
          path="cardBin"
          :label="$t('cardBin')"
        >
          <BaseInput
            v-model="cardBin"
            :allow-input="inputAllowOnlyNumber"
          />
        </n-form-item>
      </n-gi>

      <n-gi span="1">
        <n-form-item
          path="legalType"
          :label="$t('legalType')"
        >
          <BaseSelect
            v-model="legalType"
            :options="legalTypeOptions"
          />
        </n-form-item>
      </n-gi>

      <n-gi span="1">
        <n-form-item
          path="processing"
          :label="$t('processing')"
        >
          <BaseSelect
            v-model="processing"
            :options="processingTypeOptions"
          />
        </n-form-item>
      </n-gi>

      <n-gi span="1">
        <n-form-item
          path="processingBankId"
          :label="$t('processingBankId')"
        >
          <BaseInput
            v-model="processingBankId"
          />
        </n-form-item>
      </n-gi>
    </n-grid>

    <n-space justify="end">
      <n-button
        attr-type="submit"
        type="primary"
        class="px-10"
        :loading="props.loading"
      >
        {{ props.submitLocale }}
      </n-button>
    </n-space>
  </BaseForm>
</template>
