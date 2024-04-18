<script setup lang='ts'>
import {
  NDatePicker,
  NFormItem,
  NGi,
  NGrid
} from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import BaseInputGroup from '@/shared/UI/base-input-group';
import BaseModal from '@/shared/UI/base-modal';
import BaseSelect from '@/shared/UI/base-select';
import { DATE_FORMAT } from '@/shared/utils/constants/naive-constants';
import { inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import { subsidyFieldLimits } from '@/projects/subsidy/shared/utils/constants/field-limits';
import {
  ApplicationFilterModalEmits,
  ApplicationFilterModalProps
} from './application-filter-modal.types';
import useApplicationFilterModal from './useApplicationFilterModal';

const props = defineProps<ApplicationFilterModalProps>();
const emit = defineEmits<ApplicationFilterModalEmits>();

const {
  formRef,
  amountMask,
  accExternal,
  amountPayableTiyinFrom,
  amountPayableTiyinTo,
  minfinStatus,
  paymentDayFrom,
  statusOptions,
  paymentDayTo,
  status,
  modelValue,
  pinfl,
  validateForm,
  restoreFormValidation,
  handleSubmit
} = useApplicationFilterModal(props, emit);

defineExpose({
  validate: validateForm,
  restoreValidation: restoreFormValidation
});
</script>

<template>
  <BaseModal
    v-model="modelValue"
    title="Фильтры"
    size="large"
  >
    <BaseForm
      ref="formRef"
      no-prevent-route
      :model="props.model"
      @submit.prevent="handleSubmit"
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
            path="pinfl"
            label="ПИНФЛ"
          >
            <BaseInput
              v-model="pinfl"
              :maxlength="subsidyFieldLimits.pinfl.length"
              :allow-input="inputAllowOnlyNumber"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
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
        </n-gi>

        <n-gi span="12 m:6">
          <BaseInputGroup title="Сумма к оплате">
            <n-form-item
              path="amountPayableTiyinFrom"
              :show-label="false"
            >
              <BaseInput
                v-model="amountPayableTiyinFrom"
                v-mask:[amountMask]
              />
            </n-form-item>

            <n-form-item
              path="amountPayableTiyinTo"
              :show-label="false"
            >
              <BaseInput
                v-model="amountPayableTiyinTo"
                v-mask:[amountMask]
              />
            </n-form-item>
          </BaseInputGroup>
        </n-gi>

        <n-gi span="12 m:6">
          <n-form-item
            path="status"
            label="Статус"
          >
            <BaseSelect
              v-model:value="status"
              clearable
              :options="statusOptions"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
          <BaseInputGroup title="Дата оплаты">
            <n-form-item
              path="paymentDayFrom"
              :show-label="false"
            >
              <n-date-picker
                v-model:value="paymentDayFrom"
                type="date"
                class="w-100"
                :format="DATE_FORMAT"
              />
            </n-form-item>

            <n-form-item
              path="paymentDayTo"
              :show-label="false"
            >
              <n-date-picker
                v-model:value="paymentDayTo"
                type="date"
                class="w-100"
                :format="DATE_FORMAT"
              />
            </n-form-item>
          </BaseInputGroup>
        </n-gi>

        <n-gi span="12 m:6">
          <n-form-item
            class="form-item"
            label="Статус в Минфин"
            path="minfinStatus"
          >
            <BaseSelect
              v-model:value="minfinStatus"
              label-field="stateMessage"
              value-field="state"
              clearable
              :request="props.requestMinfinStatuses"
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
