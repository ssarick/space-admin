import { useVModels } from '@vueuse/core';
import type {
  AllMessagesDatePickerEmits,
  AllMessagesDatePickerProps
} from './all-messages-date-picker.types';

export default function useAllMessagesDatePicker(
  props: AllMessagesDatePickerProps,
  emit: AllMessagesDatePickerEmits
) {
  const models = useVModels(props, emit);

  return {
    ...models
  };
}
