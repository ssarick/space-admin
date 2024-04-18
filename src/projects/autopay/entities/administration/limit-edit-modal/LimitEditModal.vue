<script lang="ts" setup>
import { NFormItem } from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseModal from '@/shared/UI/base-modal';
import { IEmits, IProps } from './limit-edit-modal.types';
import useLimitEditModal from './useLimitEditModal';

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const {
  isOpen,
  closeModal,
  amountMask,
  rules,
  onSubmit,
  formModel,
  formRef
} = useLimitEditModal(props, emit);
</script>

<template>
  <BaseModal
    v-model="isOpen"
    :title="$t(props.limit?.type || '')"
  >
    <BaseForm
      ref="formRef"
      :model="formModel"
      :rules="rules"
      @submit.prevent="onSubmit"
    >
      <n-form-item
        path="limit"
        label="Сумма"
      >
        <n-input
          v-model:value="formModel.limit"
          v-mask:[amountMask]
          placeholder=""
          block
        />
      </n-form-item>

      <n-button
        type="tertiary"
        class="mt-1"
        block
        @click="closeModal"
      >
        {{ $t('Cancel') }}
      </n-button>

      <n-button
        attr-type="submit"
        class="mt-2"
        block
      >
        {{ $t('Edit') }}
      </n-button>
    </BaseForm>
  </BaseModal>
</template>
