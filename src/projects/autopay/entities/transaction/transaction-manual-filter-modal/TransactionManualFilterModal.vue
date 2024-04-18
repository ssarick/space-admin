<script setup lang='ts'>
import {
  NDatePicker,
  NFormItem,
  NGi,
  NGrid,
  NInput,
  NTimePicker
} from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseInputGroup from '@/shared/UI/base-input-group';
import BaseModal from '@/shared/UI/base-modal';
import BaseSelect from '@/shared/UI/base-select';
import { DATE_FORMAT } from '@/shared/utils/constants/naive-constants';
import { inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import {
  ITransactionManualFilterModalEmits,
  ITransactionManualFilterModalProps
} from '@/projects/autopay/entities/transaction/transaction-manual-filter-modal/transaction-manual-filter-modal.types';
import useTransactionManualFilterModal from './useTransactionManualFilterModal';

const props = defineProps<ITransactionManualFilterModalProps>();
const emit = defineEmits<ITransactionManualFilterModalEmits>();

const {
  isModalOpen,
  rules,
  statusOptions,
  sourceOptions,
  checkOptions,
  submitFilterModal,
  formRef,
  maskOptions
} = useTransactionManualFilterModal(props, emit);
</script>

<template>
  <BaseModal
    v-model="isModalOpen"
    title="Фильтры"
    size="large"
  >
    <BaseForm
      ref="formRef"
      :model="formValue"
      :rules="rules"
      @submit.prevent="submitFilterModal"
    >
      <n-grid
        x-gap="32"
        y-gap="8"
        cols="12"
        responsive="screen"
        item-responsive
      >
        <n-gi span="12 m:6">
          <n-form-item
            class="form-item"
            label="Договор ID"
            path="contractId"
          >
            <n-input
              placeholder=""
              :allow-input="inputAllowOnlyNumber"
              :value="formValue.contractId as string"
              @update:value="emit('update:contractId', $event)"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
          <n-form-item
            class="form-item"
            label="Клиент ID"
            path="cardHolderId"
          >
            <n-input
              placeholder=""
              :allow-input="inputAllowOnlyNumber"
              :value="formValue.cardHolderId as string"
              @update:value="emit('update:cardHolderId', $event)"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
          <BaseInputGroup title="Сумма">
            <n-form-item :show-label="false">
              <n-input
                v-mask:[maskOptions]
                placeholder=""
                :value="formValue.amountFrom"
                @update:value="emit('update:amountFrom', $event)"
              />
            </n-form-item>

            <n-form-item :show-label="false">
              <n-input
                v-mask:[maskOptions]
                placeholder=""
                :value="formValue.amountTo"
                @update:value="emit('update:amountTo', $event)"
              />
            </n-form-item>
          </BaseInputGroup>
        </n-gi>

        <n-gi span="12 m:6">
          <n-form-item
            class="form-item"
            label="Статус"
            path="status"
          >
            <BaseSelect
              placeholder=""
              :value="formValue.transactionStatus"
              :options="statusOptions"
              @update:value="emit('update:transactionStatus', $event)"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
          <BaseInputGroup title="Дата транзакции">
            <n-form-item
              path="phone"
              :show-label="false"
            >
              <n-date-picker
                type="date"
                placeholder="От"
                :value="formValue.dateFrom"
                :format="DATE_FORMAT"
                @update:value="emit('update:dateFrom', $event)"
              />
            </n-form-item>

            <n-form-item
              path="user.name"
              :show-label="false"
            >
              <n-date-picker
                type="date"
                placeholder="До"
                :value="formValue.dateTo"
                :format="DATE_FORMAT"
                @update:value="emit('update:dateTo', $event)"
              />
            </n-form-item>
          </BaseInputGroup>
        </n-gi>

        <n-gi span="12 m:6">
          <BaseInputGroup :title="$t('Transaction-time')">
            <n-form-item
              :show-label="false"
            >
              <n-time-picker
                placeholder="От"
                class="w-100"
                :formatted-value="formValue.timeFrom"
                :actions="null"
                @update:formatted-value="emit('update:timeFrom', $event)"
              />
            </n-form-item>

            <n-form-item
              :show-label="false"
            >
              <n-time-picker
                placeholder="До"
                class="w-100"
                :formatted-value="formValue.timeTo"
                :actions="null"
                @update:formatted-value="emit('update:timeTo', $event)"
              />
            </n-form-item>
          </BaseInputGroup>
        </n-gi>

        <n-gi span="12 m:6">
          <n-form-item
            class="form-item"
            label="Источник"
            path="user.age"
          >
            <BaseSelect
              placeholder=""
              :value="formValue.processingType"
              :options="sourceOptions"
              @update:value="emit('update:processingType', $event)"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
          <n-form-item
            class="form-item"
            label="АБС B2"
            path="phone"
          >
            <BaseSelect
              placeholder=""
              :value="formValue.b2Completed as string"
              :options="checkOptions"
              @update:value="emit('update:b2Completed', $event)"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
          <n-form-item
            class="form-item"
            label="Серия и номер паспорта"
            path="passport"
          >
            <n-input
              placeholder=""
              :value="formValue.passport"
              @update:value="emit('update:passport', $event)"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
          <n-form-item
            class="form-item"
            label="После 4 цифры номера карты"
            path="panMaskedLastNumbers"
          >
            <n-input
              placeholder=""
              :allow-input="inputAllowOnlyNumber"
              :value="formValue.panMaskedLastNumbers"
              @update:value="emit('update:panMaskedLastNumbers', $event)"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
          <n-button
            attr-type="submit"
            type="primary"
            block
          >
            Применить
          </n-button>
        </n-gi>
      </n-grid>
    </BaseForm>
  </BaseModal>
</template>
