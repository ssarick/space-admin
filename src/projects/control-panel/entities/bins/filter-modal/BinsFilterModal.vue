<script setup lang='ts'>
import {
  NGi,
  NGrid
} from 'naive-ui';
import BaseButton from '@/shared/UI/base-button';
import BaseForm from '@/shared/UI/base-form';
import BaseModal from '@/shared/UI/base-modal';
import type {
  AllMessagesFiltersModelEmits,
  AllMessagesFiltersModelProps
} from './bins-filter-modal.types';
import useBinsFilterModal
  from './useBinsFilterModal';

const props = defineProps<AllMessagesFiltersModelProps>();
const emit = defineEmits<AllMessagesFiltersModelEmits>();

const {
  submitFilterModal,
  formRef,
  showModal
} = useBinsFilterModal(props, emit);
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
          <BaseButton
            attr-type="submit"
            type="primary"
            block
          >
            {{ $t('Apply') }}
          </BaseButton>
        </n-gi>
      </n-grid>
    </BaseForm>
  </BaseModal>
</template>
