import { useVModels } from '@vueuse/core';
import { ApplicationsMinfinModalEmits, ApplicationsMinfinModalProps } from './applications-sent-statuses.types';
import useTableControls from './composables/useTableControls';

export default function useApplicationsMinfinModal(
  props: ApplicationsMinfinModalProps,
  emit: ApplicationsMinfinModalEmits
) {
  const models = useVModels(props, emit);
  const tableControls = useTableControls(emit);

  return {
    ...models,
    ...tableControls
  };
}
