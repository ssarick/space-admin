import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVModels } from '@vueuse/core';
import { DataTableColumns } from 'naive-ui';
import { useRowSelect } from '@/shared/composables';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { formatPhoneNumber } from '@/shared/utils/functions';
import { formatDate } from '@/shared/utils/functions/date';
import { IUser } from '@/projects/b2b/shared/types/user.types';
import { stateMap } from '@/projects/b2b/shared/utils/constants';
import { ILogsUserModalEmits, ILogsUserModalProps } from './logs-user-modal.types';

export default function useLogsUserModal(
  props: ILogsUserModalProps,
  emit: ILogsUserModalEmits
) {
  const models = useVModels(props, emit);
  const selectedUserIds = ref<IUser['userId'][]>([]);
  const { t } = useI18n();
  const tableRef = useTableRef();

  const uploadable = computed<boolean>(() =>
    !!selectedUserIds.value.length);

  const { toggleSelectedRow } = useRowSelect(selectedUserIds);

  const columns = computed<
    DataTableColumns<IUser>
  >(() => [
    {
      type: 'selection'
    },
    {
      title: t('Full-name-short'),
      key: 'fio'
    },
    {
      title: t('Login'),
      key: 'login'
    },
    {
      title: t('Phone'),
      key: 'phone',
      render: (row: IUser) =>
        formatPhoneNumber(row.phone || '')
    },
    {
      title: t('E-mail'),
      key: 'email'
    },
    {
      title: t('Data-of-creation'),
      key: 'createDate',
      render: (row: IUser) => formatDate(
        row.createDate || ''
      )
    },
    {
      title: t('Status'),
      key: 'stateId',
      render: (row: IUser) =>
        stateMap.value[row.stateId!]
    }
  ]);

  const rowKey = (row: IUser) => row.userId
    || Math.random();

  const onToggleModal = () => models.modelValue
    && (models.modelValue.value =
      !models.modelValue.value);

  const onUpload = () => emit(
    'upload', selectedUserIds.value
  );

  const onUploadAll = () => emit(
    'upload', []
  );

  const emitFetchUsers = () => emit(
    'fetch-users'
  );

  const onRowClick = (
    row: IUser, _, event: Event
  ) => {
    const target = event
      .target as (HTMLElement | null);

    target?.closest('.n-checkbox')
      || toggleSelectedRow(row.userId);
  };

  const onCloseModal = () =>
    selectedUserIds.value = [];

  return {
    ...models,
    onToggleModal,
    uploadable,
    onUpload,
    rowKey,
    columns,
    tableRef,
    emitFetchUsers,
    selectedUserIds,
    onRowClick,
    onCloseModal,
    onUploadAll
  };
}
