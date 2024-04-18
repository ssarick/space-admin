<script setup lang="ts">
import BaseButton from '@/shared/UI/base-button';
import BaseForm from '@/shared/UI/base-form';
import BaseIcon from '@/shared/UI/base-icon';
import BaseInput from '@/shared/UI/base-input';
import BaseLoading from '@/shared/UI/base-loading';
import BuyerPassportDataFields
  from '@/projects/cashier/entities/buyer-passport-data-fields';
import BuyerPassportDetailsFields
  from '@/projects/cashier/entities/buyer-passport-details-fields';
import BuyerPersonalDataFields
  from '@/projects/cashier/entities/buyer-personal-data-fields';
import {
  OperationTypeEmits,
  OperationTypeProps
} from '@/projects/cashier/features/five-one-operation/buyer/operation-buyer.types';
import useOperationBuyer from '@/projects/cashier/features/five-one-operation/buyer/useOperationBuyer';

const props = defineProps<OperationTypeProps>();
const emit = defineEmits<OperationTypeEmits>();

const {
  isAmountValid,
  formValue,
  countries,
  documentTypes,
  currentUser,
  availableUsers,
  isLoading,
  checkForFillingOfDocumentDataAndFetchClient,
  validateAndEmitToNextStep,
  emitToPreviousStep,
  fillTheDataFromClient
} = useOperationBuyer(props, emit);
</script>

<template>
  <div class="buyer">
    <template v-if="isLoading">
      <BaseLoading />
    </template>

    <template v-else>
      <BaseForm
        no-prevent-route
      >
        <template v-if="isAmountValid">
          <div class="form-group">
            <n-space
              class="operation__wrapper"
              align="center"
              justify="space-between"
            >
              <div class="buyer__title">
                {{ $t('residental') }}
              </div>

              <div class="buyer__radio-group">
                <n-radio-group
                  v-model:value="formValue.isResident"
                  name="radiogroup"
                >
                  <n-space>
                    <n-radio
                      key="resident"
                      class="mr-4"
                      :value="true"
                      :label="$t('resident')"
                    />

                    <n-radio
                      key="resident"
                      :value="false"
                      :label="$t('non-resident')"
                    />
                  </n-space>
                </n-radio-group>
              </div>
            </n-space>
          </div>

          <BuyerPassportDataFields
            v-model:documentNumber="formValue.documentNumber"
            v-model:documentSeria="formValue.documentSeria"
            v-model:currentUser="currentUser"
            :available-users="availableUsers"
            @passport-filled="checkForFillingOfDocumentDataAndFetchClient"
            @client-choose="fillTheDataFromClient"
          />

          <BuyerPersonalDataFields
            v-model:lastNameLat="formValue.lastNameLat"
            v-model:firstName="formValue.firstName"
            v-model:patronymName="formValue.patronymName"
            v-model:birthDate="formValue.birthDate"
            v-model:birthPlace="formValue.birthPlace"
            v-model:address="formValue.address"
          />

          <BuyerPassportDetailsFields
            v-model:documentType="formValue.documentType"
            v-model:documentDateBegin="formValue.documentDateBegin"
            v-model:documentGivePlace="formValue.documentGivePlace"
            v-model:documentDateEnd="formValue.documentDateEnd"
            v-model:countryId="formValue.countryId"
            :countries="countries"
            :document-types="documentTypes"
          />

          <div class="form-group">
            <div class="buyer__form-item-title">
              {{ $t('phone-number') }}
            </div>

            <div>
              <div>
                <n-form-item
                  path="phoneNumber"
                >
                  <BaseInput
                    v-model:value="formValue.phoneNumber"
                  />

                </n-form-item>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <n-alert
            type="info"
            class="mb-4"
            :title="$t('Confirm-payment-text')"
            :bordered="false"
          />
        </template>

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
            {{ $t('Back') }}
          </BaseButton>

          <BaseButton
            type="primary"
            class="px-10 flex-1 w-100"
            @click="validateAndEmitToNextStep"
          >
            {{ $t('approve-and-print') }}
          </BaseButton>
        </n-space>
      </BaseForm>
    </template>
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

.form-group {
  margin-bottom: 32px;
}
</style>
