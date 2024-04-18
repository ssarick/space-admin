<script setup lang="ts">
import { NDatePicker, NSpace } from 'naive-ui';
import { DATE_FORMAT } from '@/shared/utils/constants/naive-constants';
import {
  GroupMessagesDatePickerEmits,
  GroupMessagesDatePickerProps
} from '@/projects/notification-service/entities/sms/group-messages/group-messages-date-picker/group-messages-date-picker.types';
import useGroupMessagesDatePicker
  from '@/projects/notification-service/entities/sms/group-messages/group-messages-date-picker/useGroupMessagesDatePicker';

const props = defineProps<GroupMessagesDatePickerProps>();
const emit = defineEmits<GroupMessagesDatePickerEmits>();

const {
  dateTo,
  dateFrom
} = useGroupMessagesDatePicker(props, emit);
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
