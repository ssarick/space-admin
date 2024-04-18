<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import type {
  SendMessageTemplateTableEmits,
  SendMessageTemplateTableProps
} from '@/projects/notification-service/entities/sms/send-message/send-message-template-list/send-messages-templates-table.types';
import useSendMessageTemplatesTable
  from '@/projects/notification-service/entities/sms/send-message/send-message-template-list/useSendMessageTemplatesTable';

const props = withDefaults(
  defineProps<SendMessageTemplateTableProps>(),
  {
    data: () => []
  }
);
const emit = defineEmits<SendMessageTemplateTableEmits>();

const {
  columns,
  onSearchValueChanged,
  rowKey,
  rowProps,
  tableRef
} = useSendMessageTemplatesTable(emit);

defineExpose({
  tableRef
});
</script>

<template>
  <BaseDataTable
    ref="tableRef"
    has-filtering-input
    :search-input-props="{
      placeholder: $t('search-by-template-code')
    }"
    :columns="columns"
    :loading="props.loading"
    :row-key="rowKey"
    :row-props="rowProps"
    :data="props.data"
    @update="onSearchValueChanged"
  />
</template>
