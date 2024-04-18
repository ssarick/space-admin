<script setup lang="ts">
import { NSpace, NTag } from 'naive-ui';
import type {
  AllMessagesActiveFiltersEmits,
  AllMessagesActiveFiltersProps
} from '@/projects/notification-service/entities/sms/all-messages/all-messages-active-filters/all-messages-active-filters.types';
import useAllMessagesActiveFilters
  from '@/projects/notification-service/entities/sms/all-messages/all-messages-active-filters/useAllMessagesActiveFilters';

const props = defineProps<AllMessagesActiveFiltersProps>();
const emit = defineEmits<AllMessagesActiveFiltersEmits>();

const { filterItems } = useAllMessagesActiveFilters(props, emit);
</script>

<template>
  <n-space
    class="mb-3"
  >
    <n-tag
      v-for="item in filterItems"
      :key="item?.key"
      closable
      :bordered="false"
      @close="emit('handleClose', item)"
    >
      {{ item?.value }}
    </n-tag>
  </n-space>
</template>
