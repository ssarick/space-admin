<script setup lang="ts">
import BaseCard from '@/shared/UI/base-card';
import BaseSimpleTable from '@/shared/UI/base-simple-table';
import { IFilesManageDetailsEmits, IFilesManageDetailsProps } from './files-manage-details.types';
import useFilesManageDetails from './useFilesManageDetails';

const props = defineProps<IFilesManageDetailsProps>();
const emit = defineEmits<IFilesManageDetailsEmits>();

const {
  fileDetailsList,
  fileIcon,
  onDownload
} = useFilesManageDetails(props, emit);
</script>

<template>
  <BaseCard
    class="files-manage-details"
    bordered
    is-icon-reactive
    :icon="fileIcon"
    :title="props.selectedFile?.name"
  >
    <BaseSimpleTable
      column
      no-border-x
      :data="fileDetailsList"
    />

    <n-button
      class="mt-2"
      type="primary"
      block
      :loading="props.downloadLoading"
      @click="onDownload"
    >
      Скачать
    </n-button>
  </BaseCard>
</template>

<style scoped lang="scss">
.files-manage-details {
  min-height: auto;
}
</style>
