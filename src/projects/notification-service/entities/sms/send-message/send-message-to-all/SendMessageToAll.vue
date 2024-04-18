<script setup lang="ts">
import BaseButton from '@/shared/UI/base-button';
import BaseForm from '@/shared/UI/base-form';
import BaseSelect from '@/shared/UI/base-select';
import BaseUploadDraggable from '@/shared/UI/base-upload-draggable';
import renderIcon from '@/shared/utils/render-icon';
import type {
  SendMessageToAllEmits,
  SendMessageToAllProps
} from './send-message-to-all.types';
import useSendMessageToAll from './useSendMessageToAll';

const props = defineProps<SendMessageToAllProps>();
const emit = defineEmits<SendMessageToAllEmits>();

const {
  formRef,
  rules,
  validateForm,
  restoreFormValidation,
  handleFileUpload,
  acceptFileTypes,
  priority,
  langOptions,
  priorityOptions,
  language
} = useSendMessageToAll(props, emit);

defineExpose({
  validate: validateForm,
  restoreValidation: restoreFormValidation
});
</script>

<template>
  <BaseForm
    ref="formRef"
    class="form-width"
    no-prevent-route
    :model="formValue"
    :rules="rules"
  >
    <n-grid
      x-gap="16"
      y-gap="8"
      cols="4"
    >
      <n-gi
        span="4"
      >
        <n-form-item
          path="file"
          :label="$t('upload-file')"
        >
          <BaseUploadDraggable
            list-type="image"
            :accept="acceptFileTypes"
            :max-files-size="100"
            :max="1"
            :render-icon="renderIcon('file-excel')"
            @change="handleFileUpload"
          />
        </n-form-item>
      </n-gi>

      <n-gi
        span="2"
      >
        <n-form-item
          path="priority"
          :label="$t('Priority')"
        >
          <BaseSelect
            v-model="priority"
            :placeholder="$t('Select')"
            :options="priorityOptions"
          />
        </n-form-item>
      </n-gi>

      <n-gi
        span="2"
      >
        <n-form-item
          path="language"
          :label="$t('Language')"
        >
          <BaseSelect
            v-model="language"
            :placeholder="$t('Select')"
            :options="langOptions"
          />
        </n-form-item>
      </n-gi>

      <n-gi
        span="4"
        class="mb-3"
      >
        <slot />
      </n-gi>

      <n-gi
        span="1"
      >
        <BaseButton
          attr-type="submit"
          type="primary"
          block
          :loading="loading"
        >
          {{ $t('send') }}
        </BaseButton>
      </n-gi>
    </n-grid>
  </BaseForm>
</template>

<style scoped lang="scss">
.form-width{
  width: 800px;
}
</style>
