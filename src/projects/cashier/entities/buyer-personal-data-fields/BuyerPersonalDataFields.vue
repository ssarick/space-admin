<script setup lang="ts">
import { NFormItem } from 'naive-ui';
import BaseInput from '@/shared/UI/base-input';
import { DATE_FORMAT } from '@/shared/utils/constants/naive-constants';
import {
  BuyerPersonalDataFormEmits,
  BuyerPersonalDataFormProps
} from '@/projects/cashier/entities/buyer-personal-data-fields/buyer-personal-data-fields.types';
import {
  useBuyerPersonalDataFields
} from '@/projects/cashier/entities/buyer-personal-data-fields/useBuyerPersonalDataFields';

const props = defineProps<BuyerPersonalDataFormProps>();
const emit = defineEmits<BuyerPersonalDataFormEmits>();

const {
  lastNameLat,
  firstName,
  patronymName,
  birthPlace,
  birthDate,
  address
} = useBuyerPersonalDataFields(
  props,
  emit
);
</script>

<template>
  <div class="form-group">
    <div class="buyer__form-group-row">
      <div class="buyer__halfscreen-form-item">
        <n-form-item
          path="secondName"
          :label="$t('second-name')"
        >
          <BaseInput
            v-model:value="lastNameLat"
          />
        </n-form-item>
      </div>

      <div class="buyer__halfscreen-form-item">
        <n-form-item
          path="name"
          :label="$t('name')"
        >
          <BaseInput
            v-model:value="firstName"
          />
        </n-form-item>
      </div>
    </div>

    <div class="buyer__form-group-row">
      <div class="buyer__halfscreen-form-item">
        <n-form-item
          path="surname"
          :label="$t('surname')"
        >
          <BaseInput
            v-model:value="patronymName"
          />
        </n-form-item>
      </div>

      <div class="buyer__halfscreen-form-item">
        <n-form-item
          path="birthday"
          :label="$t('birthday')"
        >
          <n-date-picker
            v-model:value="birthDate"
            type="date"
            :format="DATE_FORMAT"
          />
        </n-form-item>
      </div>
    </div>

    <div class="buyer__form-group-row">
      <div class="buyer__halfscreen-form-item">
        <n-form-item
          path="birthplace"
          :label="$t('birthplace')"
        >
          <BaseInput
            v-model:value="birthPlace"
          />
        </n-form-item>
      </div>

      <div class="buyer__halfscreen-form-item">
        <n-form-item
          path="address"
          :label="$t('address')"
        >
          <BaseInput
            v-model:value="address"
          />
        </n-form-item>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.buyer {
  &__title {
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    color: map-get($color-common, 'black');
  }

  &__halfscreen-form-item {
    width: 50%;
  }

  &__form-group-row {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    :deep(.n-date-picker) {
      width: 100%;
    }
  }

  &__form-item-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: -15px;
  }

  &__form-control__large {
    width: 492px;
  }

  &__form-control__small {
    width: 100px;
  }

}
</style>
