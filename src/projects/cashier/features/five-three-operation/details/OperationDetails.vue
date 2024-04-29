<script setup lang="ts">
import { NInputGroup } from 'naive-ui';
import BaseButton from '@/shared/UI/base-button';
import BaseForm from '@/shared/UI/base-form';
import BaseIcon from '@/shared/UI/base-icon';
import BaseInput from '@/shared/UI/base-input';
import BaseSelect from '@/shared/UI/base-select';
import { inputAllowOnlyZeroAndOne } from '@/shared/utils/input-allow-rules';
import { amountMaskOptions } from '@/shared/utils/mask';
import { OperationTypeEmits } from '@/projects/cashier/features/five-three-operation/details/operation-details.types';
import useOperationDetails from './useOperationDetails';

const emit = defineEmits<OperationTypeEmits>();

const {
  choosenCurrencyLabel,
  paymentTypeOptions,
  currencyOptions,
  formRef,
  rules,
  operationDetailFormValues,
  validateAndEmitToNextStep,
  emitToPreviousStep,
  fetchCurrencyAndFillTheSum,
  resetSumFields
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
        path="paidSum"
        :label="$t('sum-curr')"
      >
        <BaseInput
          v-model:value="operationDetailFormValues.paidSum"
          v-mask:[amountMaskOptions]
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
        path="convertedSum"
        :label="$t('owed-sum')"
      >
        <BaseInput
          v-model:value="operationDetailFormValues.convertedSum"
          v-mask:[amountMaskOptions]
          disabled
          :style="{
            '--n-text-color-disabled' : '#222222'
          }"
          :placeholder="$t('owed-sum')"
        >
          <template #suffix>
            UZS
          </template>
        </BaseInput>
      </n-form-item>
    </BaseForm>
  </div>

  <n-space
    justify="space-between"
    :size="[ 20, 16 ]"
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
