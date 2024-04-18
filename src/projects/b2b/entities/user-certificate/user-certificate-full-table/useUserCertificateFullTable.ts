import { computed, h, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVModels } from '@vueuse/core';
import { DataTableColumns, NRadio } from 'naive-ui';
import { TableBaseColumn } from 'naive-ui/es/data-table/src/interface';
import { useAutoSelectData } from '@/shared/composables';
import useTablePagination from '@/shared/UI/base-data-table/composables/useTablePagination';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { formatDate } from '@/shared/utils/functions/date';
import { ICertificate } from '@/projects/b2b/shared/types/certificate.types';
import {
  IUserCertificateFullTableEmit,
  IUserCertificateFullTableProps
} from './user-certificate-full-table.types';
import useUserCertificateLoader from './useUserCertificateFetch';

export default function useUserCertificateFullTable(
  props: IUserCertificateFullTableProps,
  emit: IUserCertificateFullTableEmit
) {
  const { t } = useI18n();
  const tableRef = useTableRef();

  const pagination = computed(() => tableRef.value?.pagination);

  const { selectedCertificate, certificates, isMobileCertificates } =
    useVModels(props as Required<IUserCertificateFullTableProps>, emit);

  const { loadCertificates, loading } = useUserCertificateLoader(
    certificates,
    isMobileCertificates
  );

  const { loadPaginatedData, onPageNumberUpdated, onPageSizeUpdated } =
    useTablePagination(tableRef, loadCertificates);

  const onRowClick = (row: ICertificate) => (selectedCertificate.value = row);

  const formatCertificateState = (certificate: ICertificate) => {
    let status: string = '-';

    if (certificate.certificateState) {
      certificate.certificateState && (
        status = t(certificate.certificateState)
      );
    }

    return status;
  };

  const columns = computed<DataTableColumns<ICertificate>>(() => {
    let columns: TableBaseColumn<ICertificate>[] = [
      {
        title: t('Serial-number'),
        key: 'certificateSerialNumber'
      },
      {
        title: t('Client-code'),
        key: 'clientCode'
      },
      {
        title: t('INN'),
        key: 'clientInn'
      },
      {
        title: t('Name-of-the-client'),
        key: 'clientName'
      },
      {
        title: t('Data-of-creation'),
        key: 'certificateActivateDate',
        render: (row: ICertificate) =>
          formatDate(row.certificateActivateDate || '')
      },
      {
        title: t('Expiry-date'),
        key: 'certificateDeactivateDate',
        render: (row: ICertificate) =>
          formatDate(row.certificateDeactivateDate || '')
      },
      {
        title: t('Status'),
        key: 'certificateState',
        render: formatCertificateState
      },
      {
        title: t('Reason-for-revoke'),
        key: 'certificateRevokedReason'
      }
    ];

    if (props.visibleKeys?.length) {
      columns = columns.filter(
        (column) => column.key
          && props.visibleKeys?.includes(column.key as string)
      );
    }

    if (props.selectable) {
      columns.unshift({
        key: 'radio',
        render: (row: ICertificate) =>
          h(NRadio, {
            checked:
              selectedCertificate.value?.certificateAnswerId ===
                row.certificateAnswerId
          }),
        width: 36
      });
    }

    return columns;
  });

  const rowKey = (row: ICertificate) =>
    row.certificateAnswerId || Math.random();

  useAutoSelectData(selectedCertificate, certificates);

  watch([ isMobileCertificates ], async () => {
    tableRef.value?.pagination?.onReset();

    await loadPaginatedData();

    selectedCertificate.value = certificates.value[0] || null;
  });

  onMounted(() => loadPaginatedData());

  return {
    columns,
    rowKey,
    onRowClick,
    isMobileCertificates,
    loading,
    certificates,
    tableRef,
    onPageNumberUpdated,
    onPageSizeUpdated,
    pagination
  };
}
