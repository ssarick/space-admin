<script setup lang="ts">
import BaseInput from '@/shared/UI/base-input';
import BaseInputGroup from '@/shared/UI/base-input-group';
import BaseSelect from '@/shared/UI/base-select';
import { DATE_FORMAT } from '@/shared/utils/constants/naive-constants';
import {
  BuyerPassportDetailsFieldsEmit,
  BuyerPassportDetailsFieldsProps
} from '@/projects/cashier/entities/buyer-passport-details-fields/buyer-passport-details-fields.types';
import {
  useBuyerPassportDetailsFields
} from '@/projects/cashier/entities/buyer-passport-details-fields/useBuyerPassportDetailsFields';

const props = defineProps<BuyerPassportDetailsFieldsProps>();
const emit = defineEmits<BuyerPassportDetailsFieldsEmit>();

const {
  documentType,
  documentDateBegin,
  documentDateEnd,
  documentGivePlace,
  countryId
} = useBuyerPassportDetailsFields(
  props,
  emit
);
</script>

<template>
  <div class="form-group">

    <BaseInputGroup
      class="buyer__passport-group-row"
      :title="$t('document_type')"
    >
      <n-form-item
        path="document_number"
        :show-label="false"
      >
        <BaseInput
          v-model:value="documentType"
        />
      </n-form-item>

      <n-form-item
        path="document_name"
        :show-label="false"
      >
        <BaseSelect
          v-model:value="documentType"
          :options="documentTypes"
        />
      </n-form-item>
    </BaseInputGroup>

    <div class="buyer__form-group-row">
      <div class="buyer__halfscreen-form-item">
        <n-form-item
          path="birthday"
          :label="$t('passport-given-date')"
        >
          <n-date-picker
            v-model:value="documentDateBegin"
            type="date"
            :format="DATE_FORMAT"
          />
        </n-form-item>
      </div>

      <div class="buyer__halfscreen-form-item">
        <n-form-item
          path="passport-given-place"
          :label="$t('passport-given-place')"
        >
          <BaseInput
            v-model:value="documentGivePlace"
          />
        </n-form-item>
      </div>
    </div>

    <div class="buyer__form-group-row">
      <div class="buyer__halfscreen-form-item">
        <n-form-item
          path="passport-is-available-until"
          :label="$t('passport-is-available-until')"
        >
          <n-date-picker
            v-model:value="documentDateEnd"
            type="date"
            :format="DATE_FORMAT"
          />
        </n-form-item>
      </div>

      <div class="buyer__halfscreen-form-item">
        <n-form-item
          path="country"
          :label="$t('country')"
        >
          <BaseSelect
            v-model:value="countryId"
            filterable
            :options="countries"
          />
        </n-form-item>
      </div>
    </div>

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

  :global(.n-base-selection-overlay__wrapper) {
    font-weight: 600 !important;
  }
}
</style>
