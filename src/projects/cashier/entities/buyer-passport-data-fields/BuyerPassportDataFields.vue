<script setup lang="ts">
import BaseInput from '@/shared/UI/base-input';
import BaseInputGroup from '@/shared/UI/base-input-group';
import BaseSelect from '@/shared/UI/base-select';
import { inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import {
  BuyerPassportDataFormEmits,
  BuyerPassportDataFormProps
} from '@/projects/cashier/entities/buyer-passport-data-fields/buyer-passport-data-fields.types';
import { useBuyerPassportDataFields } from '@/projects/cashier/entities/buyer-passport-data-fields/useBuyerPassportDataFields';

const props = defineProps<BuyerPassportDataFormProps>();
const emit = defineEmits<BuyerPassportDataFormEmits>();

const {
  documentNumber,
  documentSeria,
  currentUser,
  onPassportFilled,
  onClientChoose
} = useBuyerPassportDataFields(
  props,
  emit
);
</script>

<template>
  <BaseInputGroup
    class="buyer__passport-group-row"
    :title="$t('passport-number-and-series')"
  >
    <n-form-item
      path="passportSeries"
      :show-label="false"
    >
      <BaseInput
        v-model:value="documentSeria"
        @change="onPassportFilled"
      />
    </n-form-item>

    <n-form-item
      path="passportNumber"
      :show-label="false"
    >
      <BaseInput
        v-model:value="documentNumber"
        :allow-input="inputAllowOnlyNumber"
        @change="onPassportFilled"
      />
    </n-form-item>
  </BaseInputGroup>

  <div v-if="availableUsers.length">
    <n-form-item
      path="user"
      :label="$t('found-records')"
    >
      <BaseSelect
        v-model:value="currentUser"
        :options="availableUsers"
        @select="onClientChoose"
      />
    </n-form-item>
  </div>
</template>

<style scoped lang="scss">
  .buyer {
    &__passport-group-row {
      :deep(.n-space) {
        & > div {
          &:first-child {
            width: 15%;
          }
          &:last-child {
            width: 85%;
          }
        }
      }
    }
  }
</style>
