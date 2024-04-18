<script setup lang="ts">
import { NSpace, NText } from 'naive-ui';
import BaseDataTable from '@/shared/UI/base-data-table';
import BaseSwitchBar from '@/shared/UI/base-switch-bar';
import {
  IUserCertificateFullTableEmit,
  IUserCertificateFullTableProps
} from './user-certificate-full-table.types';
import useUserCertificateFullTable from './useUserCertificateFullTable';

const props = withDefaults(defineProps<IUserCertificateFullTableProps>(), {
  selectable: true
});

const emit = defineEmits<IUserCertificateFullTableEmit>();

const {
  columns,
  rowKey,
  onRowClick,
  isMobileCertificates,
  certificates,
  loading,
  tableRef,
  onPageNumberUpdated,
  onPageSizeUpdated,
  pagination
} = useUserCertificateFullTable(props, emit);

defineExpose({
  pagination
});
</script>

<template>
  <n-space
    align="center"
    class="mb-3 mt-2"
  >
    <n-text tag="h3">
      {{ props.title || $t('Added-certificats') }}
    </n-text>

    <BaseSwitchBar
      v-if="!props.hideSwitch"
      v-model="isMobileCertificates"
      :left-label="$t('USB-tokens')"
      :right-label="$t('Mobile-certificats')"
    />
  </n-space>

  <BaseDataTable
    ref="tableRef"
    :columns="columns"
    :loading="loading"
    :row-key="rowKey"
    :row-click="props.selectable ? onRowClick : undefined"
    :data="certificates"
    @update-page="onPageNumberUpdated"
    @update-page-size="onPageSizeUpdated"
  />
</template>
