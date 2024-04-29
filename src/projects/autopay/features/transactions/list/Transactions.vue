<script setup lang='ts'>
import {
  NButton,
  NSpace,
  NTag
} from 'naive-ui';
import BaseIcon from '@/shared/UI/base-icon';
import PageTitle from '@/shared/UI/page-title';
import TransactionExcelModal from '@/projects/autopay/entities/transaction/transaction-excel-modal/TransactionExcelModal.vue';
import TransactionFilterModal from '@/projects/autopay/entities/transaction/transaction-filter-modal/TransactionFilterModal.vue';
import TransactionList from '@/projects/autopay/entities/transaction/transactions-list/TransactionList.vue';
import useTransactions from '@/projects/autopay/features/transactions/list/useTransactions';

const {
  modalState,
  showModal,
  excelModalState,
  closeModal,
  filterTransactions,
  formValue,
  activeFilterValues,
  formValuesNaming,
  removeFilter,
  transactions,
  fetchTransactions,
  transactionsLoading,
  tableRef,
  excelValues,
  importTransactionsToExcel,
  showExcelModal,
  onDeleteTransaction
} = useTransactions();
</script>

<template>
  <div>
    <n-space
      justify="space-between"
      class="mb-4"
    >
      <PageTitle
        no-margin
        :title="$t('Transactions')"
      />

      <n-space>
        <n-button
          class="px-6"
          type="tertiary"
          @click="showExcelModal"
        >
          <template #icon>
            <BaseIcon
              icon="download"
              size="24"
              color="#fff"
            />
          </template>

          Excel
        </n-button>

        <n-button
          class="px-6"
          type="primary"
          @click="showModal"
        >
          <template #icon>
            <BaseIcon
              icon="filter"
              size="24"
            />
          </template>

          {{ $t('Filters') }}
        </n-button>
      </n-space>
    </n-space>

    <n-space class="mb-4">
      <n-tag
        v-for="(_, key) in activeFilterValues"
        :key="key"
        type="warning"
      >
        <div class="flex align-items-center">
          <span class="color-common_black mr-1">{{ formValuesNaming[key] }}</span>

          <div
            class="flex cursor-pointer"
            @click="removeFilter(key)"
          >
            <BaseIcon
              icon="close"
              size="18"
            />
          </div>
        </div>
      </n-tag>
    </n-space>

    <TransactionList
      ref="tableRef"
      :transactions="transactions"
      :loading="transactionsLoading"
      @update="fetchTransactions"
      @delete="onDeleteTransaction"
    />

    <TransactionExcelModal
      v-model:showModal="excelModalState"
      v-model:contractId="excelValues.contractId"
      v-model:amountFrom="excelValues.amountFrom"
      v-model:amountTo="excelValues.amountTo"
      v-model:dateFrom="excelValues.dateFrom"
      v-model:dateTo="excelValues.dateTo"
      v-model:timeFrom="excelValues.timeFrom"
      v-model:timeTo="excelValues.timeTo"
      v-model:processingTypes="excelValues.processingTypes"
      :form-value="excelValues"
      @submit-excel-modal="importTransactionsToExcel"
      @close-modal="closeModal"
    />

    <TransactionFilterModal
      v-model:showModal="modalState"
      v-model:contractId="formValue.contractId"
      v-model:cardHolderId="formValue.cardHolderId"
      v-model:amountFrom="formValue.amountFrom"
      v-model:amountTo="formValue.amountTo"
      v-model:transactionStatus="formValue.transactionStatus"
      v-model:dateFrom="formValue.dateFrom"
      v-model:dateTo="formValue.dateTo"
      v-model:timeFrom="formValue.timeFrom"
      v-model:timeTo="formValue.timeTo"
      v-model:processingType="formValue.processingType"
      v-model:b2Completed="formValue.b2Completed"
      v-model:passport="formValue.passport"
      v-model:panMaskedLastNumbers="formValue.panMaskedLastNumbers"
      :form-value="formValue"
      @submit-filter-modal="filterTransactions"
      @close-modal="closeModal"
    />

  </div>
</template>
