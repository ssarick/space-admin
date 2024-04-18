<script setup lang="ts">
import { NFormItem, NGi, NGrid } from 'naive-ui';
import BaseButton from '@/shared/UI/base-button';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import type {
  MessageTemplateCreateFormEmits,
  MessageTemplateCreateFormProps
} from './message-template-create-form.types';
import useMessageTemplateCreateForm
  from './useMessageTemplateCreateForm';

const props = defineProps<MessageTemplateCreateFormProps>();
const emit = defineEmits<MessageTemplateCreateFormEmits>();

const {
  formRef,
  formRules,
  validateForm,
  restoreFormValidation,
  loading,
  name,
  description,
  code,
  textRu,
  textUz,
  titleRu,
  titleUz
} = useMessageTemplateCreateForm(props, emit);

defineExpose({
  validate: validateForm,
  restoreValidation: restoreFormValidation
});
</script>

<template>
  <BaseForm
    ref="formRef"
    no-prevent-route
    :model="model"
    :rules="formRules"
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
          path="code"
          :label="$t('template-code')"
        >
          <BaseInput
            v-model="code"
            :placeholder="$t('input-placeholder')"
          />
        </n-form-item>
      </n-gi>

      <n-gi span="12 m:6">
        <n-form-item
          path="name"
          :label="$t('Name2')"
        >
          <BaseInput
            v-model="name"
            :placeholder="$t('input-placeholder')"
          />
        </n-form-item>
      </n-gi>

      <n-gi span="12 m:12">
        <n-form-item
          path="description"
          :label="$t('template-description')"
        >
          <BaseInput
            v-model="description"
            :placeholder="$t('input-placeholder')"
          />
        </n-form-item>
      </n-gi>

      <n-gi span="12 m:12">
        <n-form-item
          path="titleRu"
          :label="$t('input-template-title') + ' RU'"
        >
          <BaseInput
            v-model="titleRu"
            :placeholder="$t('input-placeholder')"
          />
        </n-form-item>
      </n-gi>

      <n-gi span="12 m:12">
        <n-form-item
          path="textRu"
          :label="$t('input-template-text') + ' RU'"
        >
          <BaseInput
            v-model="textRu"
            type="textarea"
            :placeholder="$t('input-placeholder')"
            :autosize="{
              minRows: 5
            }"
          />
        </n-form-item>
      </n-gi>

      <n-gi span="12 m:12">
        <n-form-item
          path="titleUz"
          :label="$t('input-template-title') + ' UZ'"
        >
          <BaseInput
            v-model="titleUz"
            :placeholder="$t('input-placeholder')"
          />
        </n-form-item>
      </n-gi>

      <n-gi span="12 m:12">
        <n-form-item
          path="textUz"
          :label="$t('input-template-text') + ' UZ'"
        >
          <BaseInput
            v-model="textUz"
            type="textarea"
            :placeholder="$t('input-placeholder')"
            :autosize="{
              minRows: 5
            }"
          />
        </n-form-item>
      </n-gi>

      <n-gi span="12 m:3">
        <BaseButton
          attr-type="submit"
          type="primary"
          block
          :loading="loading"
        >
          {{ $t('Create') }}
        </BaseButton>
      </n-gi>
    </n-grid>
  </BaseForm>
</template>
