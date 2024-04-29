import {
  onMounted,
  reactive,
  ref
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useDialog, useMessage } from 'naive-ui';
import usePagination from '@/shared/composables/usePagination';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import AmountFormatter from '@/shared/utils/amount-formatter';
import { setTimeAndFormatToUTC } from '@/shared/utils/functions/date';
import downloadFile from '@/shared/utils/functions/downloadFile';
import {
  amountFields,
  dateTimeFields,
  excelValueFields,
  formValueFields,
  formValuesNaming
} from '@/projects/autopay/features/transactions/manual/utils';
import { ApiTransaction } from '@/projects/autopay/shared/api';
import {
  IExcelFormInputs,
  IFilterFormActiveInputs,
  IFilterFormInputs,
  ITransaction,
  ITransactionListFetchPayload,
  ITransactionsImportToExcelPayload,
  TransactionStatus
} from '@/projects/autopay/shared/types/transaction.types';

export default function useTransactionsManual() {
  const modalState = ref<boolean>(false);
  const excelModalState = ref<boolean>(false);
  const transactionsLoading = ref(false);
  const transactions = ref<ITransaction[]>([]);
  const tableRef = useTableRef();
  const formValue = reactive<IFilterFormInputs>({
    ...formValueFields
  });
  const activeFilterValues = reactive<IFilterFormActiveInputs>({
  });
  const dialog = useDialog();
  const { t } = useI18n();
  const message = useMessage();
  const transactionCancelLoading = ref(false);

  const excelValues = reactive<IExcelFormInputs>({
    ...excelValueFields,
    processingTypes: []
  });

  const {
    pageNumber,
    pageSize,
    pageCount
  } = usePagination(tableRef);

  const formatDateFields = <T extends object>(
    formObject: T
  ) => {
    for (const field in dateTimeFields) {
      const dateField = dateTimeFields[field];
      const { timeField } = dateField;
      const time = formObject[timeField];

      if (!time && !formObject[field]) continue;

      time && delete formObject[timeField];

      formObject[field] = setTimeAndFormatToUTC(
        formObject[field] || new Date(),
        time || dateField.timeDefaultValue
      );
    }
  };

  const fetchTransactions = async () => {
    transactionsLoading.value = true;

    const filterOptions: ITransactionListFetchPayload = {
    };
    Object.keys(formValue).forEach(key => {
      if (formValue[key]) {
        filterOptions[key] = formValue[key];
      }
    });

    if (formValue.b2Completed !== null) {
      filterOptions.b2Completed = formValue.b2Completed;
    }

    formatDateFields(filterOptions);

    amountFields.forEach(field => {
      if (filterOptions[field]) {
        filterOptions[field] = AmountFormatter.multiplyAndRound(
          +(filterOptions[field].replace(/\s/g, ''))
        );
      }
    });

    if (filterOptions.b2Completed) {
      filterOptions.b2Completed = filterOptions.b2Completed === 'yes';
    }

    const { items, totalPages } = await ApiTransaction
      .fetchTransactionsManual({
        pageNumber: pageNumber.value,
        pageSize: pageSize.value,
        ...filterOptions
      });
    transactions.value = items || [];
    pageCount.value = totalPages || 0;
    transactionsLoading.value = false;
  };

  const filterTransactions = (_: SubmitEvent) => {
    Object.keys(formValue).forEach(val => {
      if (formValue[val]) {
        activeFilterValues[val] = formValue[val];
      } else {
        delete activeFilterValues[val];
      }
    });
    pageNumber.value = 1;
    closeModal();
    fetchTransactions();
  };

  const importTransactionsToExcel = async (_: SubmitEvent) => {
    const importToExcelPayload: ITransactionsImportToExcelPayload = {
    };

    Object.keys(excelValues).forEach(key => {
      if (excelValues[key]) {
        importToExcelPayload[key] = excelValues[key];
      }
    });

    amountFields.forEach(field => {
      if (excelValues[field]) {
        importToExcelPayload[field] = AmountFormatter.multiplyAndRound(
          +(excelValues[field].replace(/\s/g, ''))
        );
      }
    });

    formatDateFields(importToExcelPayload);

    const data = await ApiTransaction
      .importTransactionsManualToExcel(importToExcelPayload);

    downloadFile(data, 'report.xlsx');
    flushExcelObject();
    closeExcelModal();

  };

  const flushExcelObject = () => {
    Object.keys(excelValues).forEach(key => {
      excelValues[key] = null;
    });
  };

  const removeFilter = (key: string) => {
    delete activeFilterValues[key];
    formValue[key] = null;
    fetchTransactions();
  };

  const showExcelModal = () => {
    excelModalState.value = true;
  };

  const closeExcelModal = () => {
    excelModalState.value = false;
  };

  const showModal = () =>
    modalState.value = true;

  const closeModal = () =>
    modalState.value = false;

  async function onDeleteTransaction(
    payload: ITransaction
  ) {
    dialog.warning({
      title: t('Подтвердите действие'),
      content: t('Вы уверены в этом?'),
      positiveText: t('Да'),
      negativeText: t('Закрыть'),
      positiveButtonProps: {
        get loading() {
          return transactionCancelLoading.value;
        }
      },
      onPositiveClick: async () => {
        const { error } = await ApiTransaction
          .cancelTransaction({
            internalId: payload.internalId
          });

        if (error) return;

        payload.status = TransactionStatus.REVERSED;

        message.success(t('Success'));
      }
    });
  }

  onMounted(() => {
    fetchTransactions();
  });

  return {
    modalState,
    showModal,
    closeModal,
    formValue,
    filterTransactions,
    activeFilterValues,
    formValuesNaming,
    removeFilter,
    fetchTransactions,
    transactionsLoading,
    transactions,
    tableRef,
    excelValues,
    importTransactionsToExcel,
    showExcelModal,
    closeExcelModal,
    excelModalState,
    onDeleteTransaction
  };
}
