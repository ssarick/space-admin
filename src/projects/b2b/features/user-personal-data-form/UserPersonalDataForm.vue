<script setup lang="ts">
import {
  NCard,
  NFormItem,
  NGrid,
  NGridItem,
  NSpace
} from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseLoading from '@/shared/UI/base-loading';
import BaseSelect from '@/shared/UI/base-select';
import UserInfoCard from '@/projects/b2b/entities/user-info-card/UserInfoCard.vue';
import { ApiDictionary } from '@/projects/b2b/shared/api';
import { IUserPersonalDataFormProps } from './user-personal-data-form.types';
import useUserPersonalDataForm from './useUserPersonalDataForm';

const props = defineProps<IUserPersonalDataFormProps>();

const {
  userData,
  clientUserBlockingForm,
  onChangeUserStatus,
  clientUserBlockingRules,
  clientUserBlockingFormRef,
  userIsBlocked,
  isLoadingClientUserChangeStatus,
  onSaveUserData,
  formRef,
  saveIsLoading,
  onBeforeResetPassword,
  passwordResetIsLoading,
  onCloseModule,
  isLoading,
  userStateChangeable
} = useUserPersonalDataForm(props);
</script>

<template>
  <n-grid
    x-gap="22"
    y-gap="22"
    responsive="screen"
    item-responsive
    :cols="9"
  >
    <n-grid-item span="9 m:6">
      <BaseLoading v-if="isLoading" />

      <UserInfoCard
        v-else
        ref="formRef"
        :data="userData"
        :is-edit="props.isEdit"
      />
    </n-grid-item>

    <n-grid-item
      span="9 m:3"
      style="display: flex; flex-direction: column"
    >
      <n-card
        size="small"
        :title="$t('Changing-the-user-status')"
      >
        <div
          v-if="userIsBlocked"
          style="height: 58px"
        />

        <BaseForm
          v-else
          ref="clientUserBlockingFormRef"
          :show-label="false"
          :rules="clientUserBlockingRules"
          :model="clientUserBlockingForm"
        >
          <n-form-item path="reasonId">
            <BaseSelect
              v-model:value="clientUserBlockingForm.reasonId"
              value-field="entityId"
              label-field="reasonDesc"
              :disabled="!props.isEdit"
              :request="ApiDictionary.fetchBlockingReasons"
              :params="{ EntityName: 'users' }"
            />
          </n-form-item>
        </BaseForm>

        <div class="flex">
          <n-button
            class="ml-auto"
            ghost
            :type="userIsBlocked ? 'default' : 'warning'"
            :disabled="!userStateChangeable"
            :loading="isLoadingClientUserChangeStatus"
            @click="onChangeUserStatus"
          >
            {{ $t(userIsBlocked ? 'Unblock' : 'Block') }}
          </n-button>
        </div>
      </n-card>

      <n-card
        size="small"
        class="mt-3"
        :title="$t('Reset-the-users-password')"
      >
        <p>
          {{ $t('Reset-password-desc') }}
        </p>

        <div class="flex">
          <n-button
            type="default"
            class="ml-auto mt-2"
            ghost
            :loading="passwordResetIsLoading"
            @click="onBeforeResetPassword"
          >
            {{ $t('Reset-password') }}
          </n-button>
        </div>
      </n-card>

      <NSpace
        v-if="props.isEdit"
        justify="end"
        class="mt-auto"
      >
        <n-button
          type="default"
          ghost
          :loading="saveIsLoading"
          @click="onSaveUserData"
        >
          {{ $t('Save') }}
        </n-button>

        <n-button
          type="default"
          ghost
          @click="onCloseModule"
        >
          {{ $t('Close') }}
        </n-button>
      </NSpace>
    </n-grid-item>
  </n-grid>
</template>
