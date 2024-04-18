<script setup lang="ts">
import { NFormItem } from 'naive-ui';
import BaseCard from '@/shared/UI/base-card';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import BaseSelect from '@/shared/UI/base-select';
import { inventoryFieldLimits } from '@/projects/inventory/shared/utils/constants/field-limits';
import type { SessionFormEmits, SessionFormProps } from './session-form.types';
import useSessionForm from './useSessionForm';

const props = defineProps<SessionFormProps>();
const emit = defineEmits<SessionFormEmits>();

const {
  name,
  inventoryUserIds,
  officeId,
  formRef,
  formRules,
  officeOptions,
  validateForm,
  restoreFormValidation
} = useSessionForm(props, emit);

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
          placeholder="Сессия"
          :maxlength="inventoryFieldLimits.sessionName.maxLength"
        />
      </n-form-item>

      <n-form-item
        path="officeId"
        :label="$t('selected-office')"
      >
        <BaseSelect
          v-model="officeId"
          value-field="value"
          label-field="label"
          filterable
          clearable
          :placeholder="$t('available-offices')"
          :options="officeOptions"
        />
      </n-form-item>

      <n-form-item
        path="inventoryUserIds"
        :label="$t('Inventory-taker')"
      >
        <BaseSelect
          v-model="inventoryUserIds"
          placeholder=" "
          multiple
          :request="props.requestUsersOptions"
        />
      </n-form-item>
    </BaseCard>

    <n-button
      attr-type="submit"
      type="primary"
      class="px-7"
      :loading="props.loading"
    >
      {{ $t('Create') }}
    </n-button>
  </BaseForm>
</template>
