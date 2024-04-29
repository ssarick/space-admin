<script setup lang='ts'>
import {
  NFormItem,
  NGi,
  NGrid
} from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import BaseModal from '@/shared/UI/base-modal';
import {
  BindedFaceAddModalEmits,
  BindedFaceAddModalProps
} from './binded-face-add-modal.types';
import useBindedFaceAddModal from './useBindedFaceAddModal';

const props = defineProps<BindedFaceAddModalProps>();
const emit = defineEmits<BindedFaceAddModalEmits>();

const {
  contragentId,
  inn,
  pinfl,
  formRules,
  formRef,
  modelValue,
  validateForm,
  restoreFormValidation,
  handleSubmit
} = useBindedFaceAddModal(props, emit);

defineExpose({
  validate: validateForm,
  restoreValidation: restoreFormValidation
});
</script>

<template>
  <BaseModal
    v-model="modelValue"
    title="Добавить связ. лицо"
    size="medium"
  >
    <BaseForm
      ref="formRef"
      no-prevent-route
      :model="props.model"
      :rules="formRules"
      @submit.prevent="handleSubmit"
    >
      <n-grid
        x-gap="8"
        y-gap="8"
        cols="12"
        responsive="screen"
        item-responsive
      >
        <n-gi span="12">
          <n-form-item
            path="contragentId"
            label="ID контрагента"
          >
            <BaseInput v-model="contragentId" />
          </n-form-item>
        </n-gi>

        <n-gi span="12">
          <n-form-item
            path="inn"
            label="ИНН"
          >
            <BaseInput v-model="inn" />
          </n-form-item>
        </n-gi>

        <n-gi span="12">
          <n-form-item
            path="pinfl"
            label="ПИНФЛ"
          >
            <BaseInput v-model="pinfl" />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
          <n-button
            attr-type="submit"
            type="primary"
            block
            :loading="loading"
          >
            Применить
          </n-button>
        </n-gi>
      </n-grid>
    </BaseForm>
  </BaseModal>
</template>