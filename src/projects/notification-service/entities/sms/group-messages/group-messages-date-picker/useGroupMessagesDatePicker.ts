import { useVModels } from '@vueuse/core';
import type {
  GroupMessagesDatePickerEmits,
  GroupMessagesDatePickerProps
} from './group-messages-date-picker.types';

export default function useGroupMessagesDatePicker(
  props: GroupMessagesDatePickerProps,
  emit: GroupMessagesDatePickerEmits
) {
  const models = useVModels(props, emit);

  return {
    ...models
  };
}
