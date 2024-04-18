<script setup lang="ts">
import { NFormItem, NTable } from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import BaseSelect from '@/shared/UI/base-select';
import { fieldLimits } from '@/shared/utils/constants/field-limits';
import { formatPhoneNumber } from '@/shared/utils/functions';
import { inputAllowEmail, inputAllowLatinicAndNumber, inputAllowLogin, inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import { ApiDictionary } from '@/projects/b2b/shared/api';
import { stateMap } from '@/projects/b2b/shared/utils/constants';
import { IUserInfoCardProps } from './user-info-card.types';
import useUserInfoCard from './useUserInfoCard';

const props = defineProps<IUserInfoCardProps>();

const {
  userIsBlocked,
  formRef,
  validateForm,
  restoreFormValidation,
  isForm,
  documentTypeDefault,
  userEditableData,
  getFormData,
  formRules,
  phoneFieldMask
} = useUserInfoCard(props);

defineExpose({
  validate: validateForm,
  restoreValidation: restoreFormValidation,
  getFormData
});
</script>

<template>
  <BaseForm
    ref="formRef"
    class="user-info-card"
    :rules="formRules"
    :model="userEditableData"
  >
    <n-table
      striped
      :single-line="false"
    >
      <thead>
        <tr>
          <th></th>

          <th>{{ $t('User-data') }}</th>
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
                v-model="userEditableData.fio"
                :maxlength="fieldLimits.fio.maxLength"
              />
            </n-form-item>

            <span v-else>{{ data?.fio }}</span>
          </td>
        </tr>

        <tr>
          <td>{{ $t('Document-type') }}</td>

          <td>
            <n-form-item
              v-if="isForm"
              path="pidTypeId"
            >
              <BaseSelect
                v-model:value="userEditableData.pidTypeId"
                label-field="name"
                value-field="id"
                class="document-type-dropdown"
                :request="ApiDictionary.fetchDocumentTypes"
                :default-option="documentTypeDefault"
              />
            </n-form-item>

            <span v-else>{{ data?.pidTypeName }}</span>
          </td>
        </tr>

        <tr>
          <td>{{ $t('Document-series') }}</td>

          <td>
            <n-form-item
              v-if="isForm"
              path="pidSn"
            >
              <BaseInput
                v-model="userEditableData.pidSn"
                uppercase
                :allow-input="inputAllowLatinicAndNumber"
                :maxlength="fieldLimits.pidSnOther.maxLength"
              />
            </n-form-item>

            <span v-else>{{ data?.pidSn }}</span>
          </td>
        </tr>

        <tr>
          <td>{{ $t('Document-number') }}</td>

          <td>
            <n-form-item
              v-if="isForm"
              path="pidNum"
            >
              <BaseInput
                v-model="userEditableData.pidNum"
                :allow-input="inputAllowOnlyNumber"
                :maxlength="fieldLimits.pidNum.maxLength"
              />
            </n-form-item>

            <span v-else>{{ data?.pidNum }}</span>
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
                v-model="userEditableData.phone"
                v-mask:[phoneFieldMask]
              />
            </n-form-item>

            <span v-else>
              {{ formatPhoneNumber(data?.phone || '') }}
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
                v-model="userEditableData.email"
                :maxlength="fieldLimits.email.maxLength"
                :allow-input="inputAllowEmail"
              />
            </n-form-item>

            <span v-else>{{ data?.email }}</span>
          </td>
        </tr>

        <tr>
          <td>{{ $t('The-secret-word') }}</td>

          <td>
            <n-form-item
              v-if="isForm"
              path="phrase"
            >
              <BaseInput
                v-model="userEditableData.phrase"
                uppercase
                :maxlength="fieldLimits.phrase.maxLength"
              />
            </n-form-item>

            <span v-else>{{ data?.phrase }}</span>
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
                v-model="userEditableData.login"
                uppercase
                disabled
                :maxlength="fieldLimits.login.maxLength"
                :allow-input="inputAllowLogin"
              />
            </n-form-item>

            <span v-else>{{ data?.login }}</span>
          </td>
        </tr>

        <tr>
          <td>{{ $t('Status') }}</td>

          <td>
            <span
              :style="{
                color: userIsBlocked ? 'red' : '',
              }"
            >
              {{ stateMap[data?.stateId!] || '-' }}
            </span>
          </td>
        </tr>

        <tr v-if="data?.stateReason">
          <td>{{ $t('Reason-for-blocking') }}</td>

          <td>{{ data?.stateReason }}</td>
        </tr>
      </tbody>
    </n-table>
  </BaseForm>
</template>

<style lang="scss">
.user-info-card {
  td:first-child {
    vertical-align: text-top;
  }

  .n-form-item {
    display: block;
  }
}
</style>

<style lang="scss" scoped>
.document-type-dropdown {
  width: 280px;
  max-width: 100%;
  min-width: 100%;
}
</style>
