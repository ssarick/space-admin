<script setup lang="ts">
import BaseStepper from '@/shared/UI/base-stepper';
import PageTitle from '@/shared/UI/page-title';
import OperationBuyer from '@/projects/cashier/features/five-three-operation/buyer';
import OperationDetails from '@/projects/cashier/features/five-three-operation/details';
import OperationDocument from '@/projects/cashier/features/operation-document';
import { FIVE_THREE_OPERATION } from './five-three-operation.types';
import useFiveThreeOperation from './useFiveThreeOperation';

const {
  pageTitle,
  steps,
  activeStep,
  operationFiveThreeData,
  pdfData,
  getPDF,
  moveToSelectOperationPage,
  moveToNextStep,
  moveToPreviousStep,
  fillDataAndGoToNextStep,
  resetToFirstStep
} = useFiveThreeOperation();
</script>

<template>
  <section class="container">
    <PageTitle
      :title="$t(`${ pageTitle as string }`)"
      :no-margin="true"
    />

    <BaseStepper
      v-model:activeStep="activeStep"
      :steps="steps"
    >
      <template #[FIVE_THREE_OPERATION.DETAILS]>
        <OperationDetails
          @move-to-next-step="fillDataAndGoToNextStep"
          @move-to-previous-step="moveToSelectOperationPage"
        />
      </template>

      <template #[FIVE_THREE_OPERATION.BUYER]>
        <OperationBuyer
          :operation-fields="operationFiveThreeData!"
          @pdf-data="getPDF"
          @move-to-previous-step="moveToPreviousStep"
          @move-to-next-step="moveToNextStep"
        />
      </template>

      <template #[FIVE_THREE_OPERATION.DOCUMENT]>
        <OperationDocument
          :pdf-data="pdfData"
          @reset-to-first-step="resetToFirstStep"
        />
      </template>
    </BaseStepper>
  </section>
</template>

<style lang="scss">
.operation__title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}
</style>
