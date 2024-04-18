<script lang="ts" setup>
import { NCard, NFormItem, NSpace, NSpin } from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseSelect from '@/shared/UI/base-select';
import { ApiDictionary } from '@/projects/b2b/shared/api';
import {
  IAdminStateFormEmits,
  IAdminStateFormProps } from './admin-state-form.types';
import useAdminStateForm from './useAdminStateForm';

const props = defineProps<IAdminStateFormProps>();
const emit = defineEmits<IAdminStateFormEmits>();

const {
  formRef,
  formRules,
  validateForm,
  restoreFormValidation,
  stateBlockingReasonId,
  onChangeState
} = useAdminStateForm(props, emit);

defineExpose({
  validate: validateForm,
  restoreValidation: restoreFormValidation
});
</script>

<template>
  <n-card
    size="small"
    :title="$t('Changing-the-admin-status')"
  >
    <n-space
      v-if="props.loading"
      justify="center"
      class="p-2"
    >
      <n-spin :size="24" />
    </n-space>

    <template v-else>
      <BaseForm
        v-if="!props.adminIsBlocked"
        ref="formRef"
        :show-label="false"
        :rules="formRules"
        :model="props.data"
      >
        <n-form-item path="stateBlockingReasonId">
          <BaseSelect
            v-model:value="stateBlockingReasonId"
            value-field="id"
            label-field="name"
            :request="ApiDictionary.fetchAdminBlockingReasons"
          />
        </n-form-item>
      </BaseForm>

      <div
        :class="[
          'flex',
          {
            'mt-4': props.adminIsBlocked,
            'mt-1': !props.adminIsBlocked
          }
        ]"
      >
        <n-button
          attr-type="submit"
          class="ml-auto"
          ghost
          :type="props.adminIsBlocked
            ? 'default'
            : 'warning'"
          :loading="props.loading"
          @click="onChangeState"
        >
          {{ $t(props.adminIsBlocked ? 'Unblock' : 'Block') }}
        </n-button>
      </div>
    </template>
  </n-card>
</template>
