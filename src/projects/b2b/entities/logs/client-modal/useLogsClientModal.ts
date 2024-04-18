import { computed, ref } from 'vue';
import { useVModels } from '@vueuse/core';
import { ILogsClientModalEmits, ILogsClientModalProps } from './logs-client-modal.types';

export default function useLogsClientModal(
  props: ILogsClientModalProps,
  emit: ILogsClientModalEmits
) {
  const models = useVModels(props, emit);
  const organizationIds = ref<string[]>([]);

  const uploadable = computed<boolean>(() =>
    !!organizationIds.value.length);

  const selectOrganizationIds = (
    newOrganizations?: string[] | null
  ) => organizationIds.value = newOrganizations || [];

  const onToggleModal = () => models.modelValue
    && (models.modelValue.value =
      !models.modelValue.value);

  const onUpload = () => emit(
    'upload', organizationIds.value
  );

  const onUploadAll = () => emit(
    'upload', []
  );

  const onCloseModal = () =>
    selectOrganizationIds();

  return {
    ...models,
    organizationIds,
    selectOrganizationIds,
    onToggleModal,
    uploadable,
    onUpload,
    onCloseModal,
    onUploadAll
  };
}
