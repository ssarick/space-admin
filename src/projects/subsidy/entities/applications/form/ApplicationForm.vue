<script setup lang="ts">
import { NDatePicker, NFormItem } from 'naive-ui';
import BaseCard from '@/shared/UI/base-card';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import BaseSelect from '@/shared/UI/base-select';
import { DATE_FORMAT } from '@/shared/utils/constants/naive-constants';
import { inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import { subsidyFieldLimits } from '@/projects/subsidy/shared/utils/constants/field-limits';
import { ApplicationFormEmits, ApplicationFormProps } from './application-form.types';
import useApplicationForm from './useApplicationForm';

const props = defineProps<ApplicationFormProps>();
const emit = defineEmits<ApplicationFormEmits>();

const {
  pinfl,
  accExternal,
  amountThisMonthTiyin,
  restAmountTiyin,
  percentagePaymentDate,
  contractPaymentStartDate,
  contractType,
  mfo,
  formRules,
  amountMask,
  decision,
  formRef,
  contractTypeDefaultOptions,
  creditAmountTiyin,
  validateForm,
  restoreFormValidation
} = useApplicationForm(props, emit);

defineExpose({
  validate: validateForm,
  restoreValidation: restoreFormValidation
});
</script>

<template>
  <BaseForm
    ref="formRef"
    no-prevent-route
    vertical
    :model="props.model"
    :rules="formRules"
  >
    <BaseCard
      class="mb-4 pb-0 px-2 pt-4"
      hide-header
      bordered
      :loading="props.dataLoading"
    >
      <n-form-item
        path="decision"
        label="Номер документа"
      >
        <BaseInput
          v-model="decision"
          :allow-input="inputAllowOnlyNumber"
        />
      </n-form-item>

      <n-form-item
        path="pinfl"
        label="ПИНФЛ"
      >
        <BaseInput
          v-model="pinfl"
          :maxlength="subsidyFieldLimits.pinfl.length"
          :allow-input="inputAllowOnlyNumber"
        />
      </n-form-item>

      <n-form-item
        path="accExternal"
        label="Счет"
      >
        <BaseInput
          v-model="accExternal"
          :maxlength="subsidyFieldLimits.account.maxLength"
          :allow-input="inputAllowOnlyNumber"
        />
      </n-form-item>

      <n-form-item
        path="amountThisMonthTiyin"
        label="Сумма к оплате"
      >
        <BaseInput
          v-model="amountThisMonthTiyin"
          v-mask:[amountMask]
        >
          <template #suffix>UZS</template>
        </BaseInput>
      </n-form-item>

      <n-form-item
        path="restAmountTiyin"
        label="Остаток кредита"
      >
        <BaseInput
          v-model="restAmountTiyin"
          v-mask:[amountMask]
        >
          <template #suffix>UZS</template>
        </BaseInput>
      </n-form-item>

      <n-form-item
        path="creditAmountTiyin"
        label="Сумма кредита"
      >
        <BaseInput
          v-model="creditAmountTiyin"
          v-mask:[amountMask]
        >
          <template #suffix>UZS</template>
        </BaseInput>
      </n-form-item>

      <n-form-item
        path="contractPaymentStartDate"
        label="День оплаты"
      >
        <n-date-picker
          v-model:value="contractPaymentStartDate"
          type="date"
          class="w-100"
          :format="DATE_FORMAT"
        />
      </n-form-item>

      <n-form-item
        path="percentagePaymentDate"
        label="Дата выдачи"
      >
        <n-date-picker
          v-model:value="percentagePaymentDate"
          type="date"
          class="w-100"
          :format="DATE_FORMAT"
        />
      </n-form-item>

      <n-form-item
        path="contractType"
        label="Тип контракта"
      >
        <BaseSelect
          v-model:value="contractType"
          label-field="description"
          value-field="code"
          :options-is-reactive="false"
          :options="contractTypeDefaultOptions"
          :request="props.requestContracts"
        />
      </n-form-item>

      <n-form-item
        path="mfo"
        label="МФО"
      >
        <BaseInput
          v-model="mfo"
          :maxlength="subsidyFieldLimits.mfo.maxLength"
          :allow-input="inputAllowOnlyNumber"
        />
      </n-form-item>
    </BaseCard>

    <n-button
      attr-type="submit"
      type="primary"
      :loading="props.saveLoading"
      :disabled="props.dataLoading"
    >
      Применить изменения
    </n-button>
  </BaseForm>
</template>
