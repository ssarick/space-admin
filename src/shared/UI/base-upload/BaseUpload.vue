<script setup lang="ts">
import { NUpload } from 'naive-ui';
import { BaseUploadProps } from './base-upload.types';
import useBaseUpload from './useBaseUpload';

const props = defineProps<BaseUploadProps>();

const {
  accept
} = useBaseUpload(props);
</script>

<template>
  <n-upload
    :accept="accept"
  >
    <template
      v-for="slot in Object.keys($slots)"
      #[slot]="data"
      :key="slot"
    >
      <slot
        :key="slot"
        :name="slot"
        v-bind="data"
      />
    </template>
  </n-upload>
</template>
