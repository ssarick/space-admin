<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import type {
  MessageTemplateTableEmits,
  MessageTemplateTableProps
} from '@/projects/notification-service/entities/sms/message-templates/message-templates-list/messages-templates-table.types';
import useMessageTemplatesTable
  from '@/projects/notification-service/entities/sms/message-templates/message-templates-list/useMessageTemplatesTable';

const props = withDefaults(
  defineProps<MessageTemplateTableProps>(),
  {
    data: () => []
  }
);
const emit = defineEmits<MessageTemplateTableEmits>();

const {
  columns,
  rowKey,
  tableRef
} = useMessageTemplatesTable(emit);

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
    :data="props.data"
  />
</template>
