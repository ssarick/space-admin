<script setup lang="ts">
import { NFormItem } from 'naive-ui';
import { DomainShortcuts } from '@/shared/types/common.types';
import BaseCard from '@/shared/UI/base-card';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import { fieldLimits } from '@/shared/utils/constants/field-limits';
import { inputDisallowEmail } from '@/shared/utils/input-allow-rules';
import { inventoryFieldLimits } from '@/projects/inventory/shared/utils/constants/field-limits';
import type { UserFormEmits, UserFormProps } from './user-form.types';
import useSessionForm from './useUserForm';

const props = defineProps<UserFormProps>();
const emit = defineEmits<UserFormEmits>();

const {
  phoneFieldMask,
  email,
  fullName,
  userName,
  password,
  phoneNumber,
  validateForm,
  formRef,
  formRules,
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
        path="fullName"
        :label="$t('Full-name-short')"
      >
        <BaseInput
          v-model="fullName"
          :maxlength="inventoryFieldLimits.fullName.maxLength"
        />
      </n-form-item>

      <n-form-item
        path="phoneNumber"
        :label="$t('Phone-number')"
      >
        <BaseInput
          v-model="phoneNumber"
          v-mask:[phoneFieldMask]
        />
      </n-form-item>

      <n-form-item
        path="userName"
        :label="$t('Login')"
      >
        <BaseInput
          v-model="userName"
          :maxlength="inventoryFieldLimits.userName.maxLength"
        />
      </n-form-item>

      <n-form-item
        path="password"
        :label="$t('Password')"
      >
        <BaseInput
          v-model="password"
          :maxlength="inventoryFieldLimits.password.maxLength"
        />
      </n-form-item>

      <n-form-item
        path="email"
        label="E-mail"
      >
        <BaseInput
          v-model="email"
          :allow-input="inputDisallowEmail"
          :maxlength="fieldLimits.email.maxLength"
        >
          <template #suffix>
            @{{ DomainShortcuts.KAPITALBANK }}
          </template>
        </BaseInput>
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
