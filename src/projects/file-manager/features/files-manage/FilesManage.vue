<script setup lang="ts">
import { NGi, NGrid, NSpace } from 'naive-ui';
import PageTitle from '@/shared/UI/page-title';
import FilesManageDetails from '../../entities/files-manage/details';
import FileManageFilters from '../../entities/files-manage/filters';
import FilesManageTable from '../../entities/files-manage/table';
import useFilesManage from './useFilesManage';

const {
  filtersModel,
  signFactOptions,
  selectedFile,
  loading,
  downloadLoading,
  bucketName,
  entities,
  hideEntitiesTable,
  tableRef,
  onSelectEntity,
  onUpdateTable,
  onDownloadSelectedFile
} = useFilesManage();
</script>

<template>
  <n-space
    justify="space-between"
    class="mb-4"
  >
    <PageTitle
      no-margin
      :title="bucketName || 'Файловый менеджер'"
    />

    <FileManageFilters
      v-model:sign-fact="filtersModel.signFact"
      v-model:updated-date="filtersModel.updatedDate"
      v-model:upload-date="filtersModel.uploadDate"
      :sign-fact-options="signFactOptions"
    />
  </n-space>

  <n-grid
    x-gap="16"
    y-gap="16"
    cols="12"
    responsive="screen"
    item-responsive
  >
    <n-gi
      :span="`12 m:${selectedFile ? 8 : 12}`"
    >
      <FilesManageTable
        ref="tableRef"
        :data="entities"
        :loading="loading"
        :hide-table="hideEntitiesTable"
        @select="onSelectEntity"
        @update="onUpdateTable"
      />
    </n-gi>

    <n-gi
      v-if="selectedFile"
      span="12 m:4"
    >
      <FilesManageDetails
        v-model:selected-file="selectedFile"
        :download-loading="downloadLoading"
        @download="onDownloadSelectedFile"
      />
    </n-gi>
  </n-grid>
</template>
