<script setup lang='ts'>
import {
  NFormItem,
  NGi,
  NGrid
} from 'naive-ui';
import BaseButton from '@/shared/UI/base-button';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import BaseModal from '@/shared/UI/base-modal';
import BaseSelect from '@/shared/UI/base-select';
import { inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import type {
  AllMessagesFiltersModelEmits,
  AllMessagesFiltersModelProps
} from './all-messages-filter-modal.types';
import useAllMessagesFilterModal
  from './useAllMessagesFilterModal';

const props = defineProps<AllMessagesFiltersModelProps>();
const emit = defineEmits<AllMessagesFiltersModelEmits>();

const {
  statusOptions,
  submitFilterModal,
  formRef,
  showModal,
  statuses,
  recipientAddress,
  messageSnippet
} = useAllMessagesFilterModal(props, emit);
</script>

<template>
  <BaseModal
    v-model="showModal"
    size="large"
    :title="$t('Filters')"
  >
    <BaseForm
      ref="formRef"
      :model="formValue"
      @submit.prevent="submitFilterModal"
    >
      <n-grid
        x-gap="32"
        y-gap="8"
        cols="12"
        responsive="screen"
        item-responsive
      >
        <n-gi span="12 m:6">
          <n-form-item
            path="recipientAddress"
            :label="$t('Phone')"
          >
            <BaseInput
              v-model="recipientAddress"
              :allow-input="inputAllowOnlyNumber"
              :placeholder="$t('Phone')"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
          <n-form-item
            path="status"
            :label="$t('Status')"
          >
            <BaseSelect
              v-model="statuses"
              :placeholder="$t('Select')"
              :options="statusOptions"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
          <n-form-item
            path="messageSnippet"
            :label="$t('snippet')"
          >
            <BaseInput
              v-model="messageSnippet"
              type="textarea"
              :placeholder="$t('message-snippet')"
              :autosize="{
                minRows: 3
              }"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12" />

        <n-gi span="12 m:6">
          <BaseButton
            attr-type="submit"
            type="primary"
            block
          >
            {{ $t('Apply')}}
          </BaseButton>
        </n-gi>
      </n-grid>
    </BaseForm>
  </BaseModal>
</template>
