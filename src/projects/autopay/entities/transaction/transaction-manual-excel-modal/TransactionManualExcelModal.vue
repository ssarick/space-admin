<script setup lang='ts'>
import {
  NDatePicker,
  NFormItem,
  NGi,
  NGrid,
  NInput,
  NSpace,
  NTag,
  NTimePicker
} from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseInputGroup from '@/shared/UI/base-input-group';
import BaseModal from '@/shared/UI/base-modal';
import BaseSelect from '@/shared/UI/base-select';
import { DATE_FORMAT } from '@/shared/utils/constants/naive-constants';
import { inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import {
  ITransactionManualExcelModalEmits,
  ITransactionManualExcelModalProps
} from '@/projects/autopay/entities/transaction/transaction-manual-excel-modal/transaction-manual-excel-modal.types';
import useTransactionManualExcelModal from '@/projects/autopay/entities/transaction/transaction-manual-excel-modal/useTransactionManualExcelModal';

const props = defineProps<ITransactionManualExcelModalProps>();
const emit = defineEmits<ITransactionManualExcelModalEmits>();

const {
  isModalOpen,
  rules,
  sourceOptions,
  submitFilterModal,
  formRef,
  maskOptions,
  onRemoveProcessingType
} = useTransactionManualExcelModal(props, emit);
</script>

<template>
  <BaseModal
    v-model="isModalOpen"
    size="large"
    :title="$t('Import Excel')"
  >
    <n-space
      align="center"
      class="mb-5"
    >
      <n-text
        tag="h3"
        class="tag-group__label"
      >
        {{ $t('Selected-sources') }}
      </n-text>

      <n-space>
        <template
          v-if="formValue.processingTypes?.length"
        >
          <n-tag
            v-for="item in formValue.processingTypes"
            :key="item"
            closable
            @close="onRemoveProcessingType(item)"
          >
            {{ $t(item) }}
          </n-tag>
        </template>

        <n-tag
          v-else
          class="pl-1"
        >{{ $t('All') }}</n-tag>
      </n-space>
    </n-space>

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
            label="Источник"
            path="user.age"
          >
            <BaseSelect
              placeholder=""
              multiple
              :value="formValue.processingTypes"
              :options="sourceOptions"
              @update:value="emit('update:processingTypes', $event)"
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
          <BaseInputGroup title="Дата транзакции">
            <n-form-item
              path="dateFrom"
              :show-label="false"
            >
              <n-date-picker
                class="w-100"
                type="date"
                placeholder="От"
                :value="formValue.dateFrom"
                :format="DATE_FORMAT"
                @update:value="emit('update:dateFrom', $event)"
              />
            </n-form-item>

            <n-form-item
              path="dateTo"
              :show-label="false"
            >
              <n-date-picker
                class="w-100"
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

        <n-gi span="12 m:6" />

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
