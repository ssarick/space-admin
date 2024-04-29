<script setup lang="ts">
import {
  NFormItem,
  NGi,
  NGrid
} from 'naive-ui';
import { DomainShortcuts } from '@/shared/types/common.types';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import BaseSelect from '@/shared/UI/base-select';
import { fieldLimits } from '@/shared/utils/constants/field-limits';
import {
  inputAllowLogin,
  inputDisallowEmail
} from '@/shared/utils/input-allow-rules';
import { ApiDictionary } from '@/projects/b2b/shared/api';
import {
  IAdminCreationFormEmits,
  IAdminCreationFormProps
} from './admin-creation-form.types';
import useAdminCreationForm from './useAdminCreationForm';

const props = defineProps<IAdminCreationFormProps>();
const emit = defineEmits<IAdminCreationFormEmits>();

const {
  formRules,
  validateForm,
  restoreFormValidation,
  branch,
  branches,
  branchesLoading,
  fio,
  formRef,
  email,
  login,
  phone,
  phoneFieldMask,
  roleId
} = useAdminCreationForm(props, emit);

defineExpose({
  validate: validateForm,
  restoreValidation: restoreFormValidation
});
</script>

<template>
  <BaseForm
    ref="formRef"
    :model="props.data"
    :rules="formRules"
  >
    <n-grid
      x-gap="32"
      y-gap="12"
      cols="12"
      responsive="screen"
      item-responsive
    >
      <n-gi span="12 m:6">
        <n-form-item
          path="fio"
          label="ФИО"
        >
          <BaseInput
            v-model="fio"
            :maxlength="fieldLimits.fio.maxLength"
          />
        </n-form-item>
      </n-gi>

      <n-gi span="12 m:6">
        <n-form-item
          path="login"
          label="Логин"
        >
          <BaseInput
            v-model="login"
            uppercase
            :allow-input="inputAllowLogin"
            :maxlength="fieldLimits.login.maxLength"
          />
        </n-form-item>
      </n-gi>

      <n-gi span="12 m:6">
        <n-form-item
          path="phone"
          label="Номер телефона"
        >
          <BaseInput
            v-model="phone"
            v-mask:[phoneFieldMask]
          />
        </n-form-item>
      </n-gi>

      <n-gi span="12 m:6">
        <n-form-item
          path="email"
          label="Почта"
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
      </n-gi>

      <n-gi span="12 m:6">
        <n-form-item
          path="branch"
          label="МФО"
        >
          <BaseSelect
            v-model:value="branch"
            value-field="code"
            label-field="code"
            :options="branches"
            :loading="branchesLoading"
          />
        </n-form-item>
      </n-gi>

      <n-gi span="12 m:6">
        <n-form-item
          path="roleId"
          label="Роль"
        >
          <BaseSelect
            v-model:value="roleId"
            value-field="id"
            label-field="name"
            :request="ApiDictionary.fetchAdminRoles"
          />
        </n-form-item>
      </n-gi>

      <n-gi span="12">
        <n-button
          attr-type="submit"
          type="primary"
          secondary
          :loading="props.loading"
        >
          Создать
        </n-button>
      </n-gi>
    </n-grid>
  </BaseForm>
</template>
