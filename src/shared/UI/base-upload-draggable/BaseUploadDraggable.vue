<script setup lang="ts">
import { NUpload } from 'naive-ui';
import BaseIcon from '@/shared/UI/base-icon';
import { BaseUploadDraggableEmits, BaseUploadDraggableProps } from '@/shared/UI/base-upload-draggable/base-upload-draggable.types';
import useBaseUploadDraggable from './useBaseUploadDraggable';

const props = defineProps<BaseUploadDraggableProps>();
const emit = defineEmits<BaseUploadDraggableEmits>();

const {
  accept,
  label,
  maxFilesSize,
  handleChange
} = useBaseUploadDraggable(props, emit);
</script>

<template>
  <n-upload
    :accept="accept"
    :max="props.max"
    @change="handleChange"
  >
    <n-upload-dragger>
      <n-space>
        <div class="icon-wrapper">
          <BaseIcon
            icon="upload"
            size="24"
          />
        </div>

        <div class="text-wrapper">
          <n-text class="label">
            {{ $t('file-upload-placeholder') }}
          </n-text>

          <n-text
            class="description"
          >
            {{ label }} {{ $t('no-more-than') }} {{ maxFilesSize }} MB
          </n-text>
        </div>
      </n-space>
    </n-upload-dragger>
  </n-upload>
</template>

<style scoped lang="scss">
.icon-wrapper {
  background: map-get($color-common, 'gray-lighter');
  border-radius: 8px;
  padding: 12px;
}

.text-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around !important;
}

.label {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.description {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: map-get($color-secondary, 'dark_text');
}

.n-upload-dragger {
  text-align: left !important;
  padding: 18px;
  background-color: unset;
  border-radius: 12px;
  border: 1px dashed map-get($color-common, 'gray-lighter');
  &:hover{
    border: 1px dashed map-get($color-common, 'black');
  }
}

.n-upload {
  :deep(.n-upload-file) {
    padding: 0 28px !important;
  }

  :deep(.n-upload-file-info__name) {
    padding: 0 18px !important;
  }
}
</style>
