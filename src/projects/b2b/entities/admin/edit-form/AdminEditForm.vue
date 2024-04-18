<script setup lang="ts">
import { NFormItem, NTable } from 'naive-ui';
import { DomainShortcuts } from '@/shared/types/common.types';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import BaseSelect from '@/shared/UI/base-select';
import { fieldLimits } from '@/shared/utils/constants/field-limits';
import { formatPhoneNumber } from '@/shared/utils/functions';
import {
  inputAllowLogin,
  inputDisallowEmail
} from '@/shared/utils/input-allow-rules';
import { ApiDictionary } from '@/projects/b2b/shared/api';
import { stateMap } from '@/projects/b2b/shared/utils/constants';
import {
  IAdminEditFormEmits,
  IAdminEditFormProps
} from './admin-edit-form.types';
import useAdminEditForm from './useAdminEditForm';

const props = defineProps<IAdminEditFormProps>();
const emit = defineEmits<IAdminEditFormEmits>();

const {
  validateForm,
  restoreFormValidation,
  formRules,
  isForm,
  phoneFieldMask,
  fio,
  login,
  branch,
  email,
  phone,
  formRef,
  roleId,
  currentRole,
  branches,
  branchesLoading
} = useAdminEditForm(props, emit);

defineExpose({
  validate: validateForm,
  restoreValidation: restoreFormValidation
});
</script>

<template>
  <BaseForm
    ref="formRef"
    class="admin-edit-form"
    :rules="formRules"
    :model="props.data"
  >
    <n-table
      striped
      :single-line="false"
    >
      <thead>
        <tr>
          <th></th>

          <th>{{ $t('Admin-data') }}</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>{{ $t('Full-name-short') }}</td>

          <td>
            <n-form-item
              v-if="isForm"
              path="fio"
            >
              <BaseInput
                v-model="fio"
                :maxlength="fieldLimits.fio.maxLength"
              />
            </n-form-item>

            <span v-else>{{ props.data?.fio }}</span>
          </td>
        </tr>

        <tr>
          <td>{{ $t('Login') }}</td>

          <td>
            <n-form-item
              v-if="isForm"
              path="login"
            >
              <BaseInput
                v-model="login"
                uppercase
                disabled
                :allow-input="inputAllowLogin"
                :maxlength="fieldLimits.login.maxLength"
              />
            </n-form-item>

            <span v-else>{{ props.data?.login }}</span>
          </td>
        </tr>

        <tr>
          <td>{{ $t('role') }}</td>

          <td>
            <n-form-item
              v-if="isForm"
              path="login"
            >
              <BaseSelect
                v-model:value="roleId"
                value-field="id"
                label-field="name"
                :request="ApiDictionary.fetchAdminRoles"
                :default-option="currentRole"
              />
            </n-form-item>

            <span v-else>{{ props.data?.userRoleName }}</span>
          </td>
        </tr>

        <tr>
          <td>{{ $t('Phone') }}</td>

          <td>
            <n-form-item
              v-if="isForm"
              path="phone"
            >
              <BaseInput
                v-model="phone"
                v-mask:[phoneFieldMask]
              />
            </n-form-item>

            <span v-else>
              {{ formatPhoneNumber(props.data?.phone || '') }}
            </span>
          </td>
        </tr>

        <tr>
          <td>{{ $t('E-mail') }}</td>

          <td>
            <n-form-item
              v-if="isForm"
              path="email"
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

            <span v-else>{{ props.data?.email }}</span>
          </td>
        </tr>

        <tr>
          <td>{{ $t('Mfo') }}</td>

          <td>
            <n-form-item
              v-if="isForm"
              path="branch"
            >
              <BaseSelect
                v-model:value="branch"
                label-field="code"
                value-field="code"
                :options="branches"
                :loading="branchesLoading"
              />
            </n-form-item>

            <span v-else>{{ props.data?.branch }}</span>
          </td>
        </tr>

        <tr>
          <td>{{ $t('Status') }}</td>

          <td>
            <span
              :style="{
                color: props.adminIsBlocked ? 'red' : '',
              }"
            >
              {{ stateMap[props.admin?.stateId!] || '-' }}
            </span>
          </td>
        </tr>

        <tr v-if="props.admin?.stateBlockingReason">
          <td>{{ $t('Reason-for-blocking') }}</td>

          <td>{{ props.admin?.stateBlockingReason }}</td>
        </tr>
      </tbody>
    </n-table>
  </BaseForm>
</template>

<style lang="scss">
.admin-edit-form {
  td {
    &:first-child {
      width: 220px;
      vertical-align: text-top;
    }
  }

  .n-form-item {
    display: block;
  }
}
</style>
