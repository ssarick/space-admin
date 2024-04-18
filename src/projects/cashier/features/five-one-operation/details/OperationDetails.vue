<script setup lang="ts">
import { NInputGroup } from 'naive-ui';
import BaseButton from '@/shared/UI/base-button';
import BaseForm from '@/shared/UI/base-form';
import BaseIcon from '@/shared/UI/base-icon';
import BaseInput from '@/shared/UI/base-input';
import BaseModal from '@/shared/UI/base-modal';
import BaseSelect from '@/shared/UI/base-select';
import { BaseSwitchListItem } from '@/shared/UI/base-switch';
import { inputAllowOnlyNumber, inputAllowOnlyZeroAndOne } from '@/shared/utils/input-allow-rules';
import { amountMaskOptions } from '@/shared/utils/mask';
import { OperationTypeEmits } from '@/projects/cashier/features/five-one-operation/details/operation-details.types';
import useOperationDetails from './useOperationDetails';

const emit = defineEmits<OperationTypeEmits>();

const {
  choosenCurrencyLabel,
  paymentTypeOptions,
  currencyOptions,
  rnnTypeOptions,
  isModalActive,
  rrnFieldMask,
  formRef,
  rules,
  operationDetailFormValues,
  isPaidSumShown,
  isPaidSumDisabled,
  validateAndEmitToNextStep,
  emitToPreviousStep,
  closeModal,
  showModal,
  fetchAndPutDataByRRNCode,
  fetchCurrencyAndFillTheSum,
  resetSumFields,
  resetAllRRNData
} = useOperationDetails(emit);
</script>

<template>
  <div class="operation">
    <BaseForm
      ref="formRef"
      no-prevent-route
      :vertical="true"
      :model="operationDetailFormValues"
      :rules="rules"
    >
      <n-form-item
        :label="$t('payment-type')"
      >
        <n-input-group>
          <BaseInput
            v-model:value="operationDetailFormValues.paymentTypeChosenOption"
            class="w-65"
            :allow-input="inputAllowOnlyZeroAndOne"
          />

          <BaseSelect
            v-model:value="operationDetailFormValues.paymentTypeChosenOption"
            class="w-35"
            :options="paymentTypeOptions"
            @update:value="resetSumFields"
          />

        </n-input-group>
      </n-form-item>

      <n-form-item
        :label="$t('currency')"
      >
        <n-input-group>
          <BaseInput
            v-model:value="operationDetailFormValues.currencyChosenOption"
            class="w-65"
          />

          <BaseSelect
            v-model:value="operationDetailFormValues.currencyChosenOption"
            class="w-35"
            :options="currencyOptions"
            @update:model-value="fetchCurrencyAndFillTheSum"
          />
        </n-input-group>
      </n-form-item>

      <n-form-item
        v-if="Number(operationDetailFormValues.paymentTypeChosenOption)"
        :label="$t('rrn-number')"
      >
        <n-input-group>
          <BaseInput
            v-model:value="operationDetailFormValues.rrnNumber"
            v-mask:[rrnFieldMask]
            class="w-65"
            :allow-input="inputAllowOnlyNumber"
            :disabled="Boolean(operationDetailFormValues.manualPayment)"
            @change="fetchAndPutDataByRRNCode"
          />

          <BaseSelect
            v-model:value="operationDetailFormValues.chosenRnnOption"
            class="w-35"
            :options="rnnTypeOptions"
            :disabled="Boolean(operationDetailFormValues.manualPayment)"
            @update:model-value="resetAllRRNData"
          />
        </n-input-group>
      </n-form-item>

      <n-form-item
        v-if="isPaidSumShown"
        path="formattedSellSum"
        :label="$t('sum-curr')"
      >
        <BaseInput
          v-model:value="operationDetailFormValues.paidSum"
          v-mask:[amountMaskOptions]
          :disabled="isPaidSumDisabled"
          @change="fetchCurrencyAndFillTheSum"
        >
          <template
            v-if="choosenCurrencyLabel"
            #suffix
          >
            {{ choosenCurrencyLabel }}
          </template>
        </BaseInput>
      </n-form-item>

      <n-form-item
        path="formattedSellSum"
        :label="$t('paid-sum')"
      >
        <BaseInput
          v-model:value="operationDetailFormValues.formattedSellSum"
          v-mask:[amountMaskOptions]
          disabled
          :style="{
            '--n-text-color-disabled' : '#222222'
          }"
          :placeholder="$t('paid-sum')"
        >
          <template #suffix>
            UZS
          </template>
        </BaseInput>
      </n-form-item>

      <n-form-item
        v-if="Number(operationDetailFormValues.paymentTypeChosenOption)"
        class="operation__wrapper"
        justify="space-between"
        :label="$t('manual-type')"
      >
        <div class="operation__selectbox">
          <BaseSwitchListItem
            v-model="operationDetailFormValues.manualPayment"
            @update:model-value="showModal"
          />
        </div>
      </n-form-item>
    </BaseForm>
  </div>

  <n-space
    justify="space-between"
    :size="[20, 16]"
  >
    <BaseButton
      class="px-3"
      @click="emitToPreviousStep"
    >
      <template #icon>
        <BaseIcon
          icon="collapse-left"
        />
      </template>
      {{ $t('Select-another-operation') }}
    </BaseButton>

    <BaseButton
      type="primary"
      class="px-10 flex-1 w-100"
      @click="validateAndEmitToNextStep"
    >
      {{ $t('continue') }}
    </BaseButton>
  </n-space>

  <BaseModal
    v-model="isModalActive"
    :title="$t('attention')"
  >
    <n-text
      tag="p"
      class="text-caption text-weight-5"
    >
      {{ $t('attention-text') }}
    </n-text>

    <BaseButton
      class="mt-4"
      type="primary"
      block
      @click="closeModal"
    >
      {{ $t('ok') }}
    </BaseButton>
  </BaseModal>
</template>

<style scoped lang="scss">
.operation {
  &__wrapper {
    margin-bottom: 24px;
  }
  &__form-item {
    width: 100%;
  }
}

:deep(.n-base-selection ) {
  margin-left: -1px !important;
  border-left: 1px inherit !important;
  border-top-left-radius: 0 0 !important;
  border-bottom-left-radius: 0 0 !important;
}
</style>
