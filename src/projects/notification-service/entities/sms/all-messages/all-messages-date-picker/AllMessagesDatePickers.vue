<script setup lang="ts">
import { NDatePicker, NSpace } from 'naive-ui';
import { DATE_FORMAT } from '@/shared/utils/constants/naive-constants';
import type {
  AllMessagesDatePickerEmits,
  AllMessagesDatePickerProps
} from '@/projects/notification-service/entities/sms/all-messages/all-messages-date-picker/all-messages-date-picker.types';
import useAllMessagesDatePicker
  from '@/projects/notification-service/entities/sms/all-messages/all-messages-date-picker/useAllMessagesDatePicker';

const props = defineProps<AllMessagesDatePickerProps>();
const emit = defineEmits<AllMessagesDatePickerEmits>();

const {
  dateTo,
  dateFrom
} = useAllMessagesDatePicker(props, emit);
</script>

<template>
  <n-space
    :size="[20, 16]"
  >
    <n-date-picker
      v-model:value="dateFrom"
      type="date"
      class="date-picker"
      clearable
      :placeholder="$t('date-from')"
      :format="`${$t('date-from')} ` + DATE_FORMAT"
    />

    <n-date-picker
      v-model:value="dateTo"
      type="date"
      class="date-picker"
      clearable
      :placeholder="$t('date-to')"
      :format="`$t('date-to') ` + DATE_FORMAT"
    />
  </n-space>
</template>

<style scoped lang="scss">
.date-picker {
  width: 160px;
}
</style>
