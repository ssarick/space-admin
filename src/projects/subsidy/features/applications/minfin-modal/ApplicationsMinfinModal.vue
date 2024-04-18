<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import BaseModal from '@/shared/UI/base-modal';
import { ApplicationsMinfinModalEmits, ApplicationsMinfinModalProps } from './applications-sent-statuses.types';
import useApplicationsMinfinModal from './useApplicationsMinfinModal';

const props = withDefaults(
  defineProps<ApplicationsMinfinModalProps>(),
  {
    applications: () => []
  }
);

const emit = defineEmits<ApplicationsMinfinModalEmits>();

const {
  showModal,
  tableColumns,
  tableRowKey
} = useApplicationsMinfinModal(props, emit);
</script>

<template>
  <BaseModal
    v-model="showModal"
    size="large"
    title="Статусы отправки"
  >
    <BaseDataTable
      scroll-x="640"
      :columns="tableColumns"
      :data="props.applications"
      :row-key="tableRowKey"
    />
  </BaseModal>
</template>
