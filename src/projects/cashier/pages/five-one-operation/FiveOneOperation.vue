<script setup lang="ts">
import BaseStepper from '@/shared/UI/base-stepper';
import PageContainer from '@/shared/UI/page-container';
import PageTitle from '@/shared/UI/page-title';
import OperationBuyer from '@/projects/cashier/features/five-one-operation/buyer';
import OperationDetails from '@/projects/cashier/features/five-one-operation/details';
import OperationDocument from '@/projects/cashier/features/operation-document';
import { FIVE_ONE_OPERATION } from './five-one-operation.types';
import useFiveOneOperation from './useFiveOneOperation';

const {
  pageTitle,
  steps,
  activeStep,
  RRNFields,
  pdfData,
  getPDF,
  moveToSelectOperationPage,
  moveToNextStep,
  moveToPreviousStep,
  fillRRNDataAndGoToNextStep,
  resetToFirstStep
} = useFiveOneOperation();
</script>

<template>
  <PageContainer>
    <PageTitle
      :title="$t(`${ pageTitle as string }`)"
      :no-margin="true"
    />

    <BaseStepper
      v-model:activeStep="activeStep"
      :steps="steps"
    >
      <template #[FIVE_ONE_OPERATION.DETAILS]>
        <OperationDetails
          @move-to-next-step="fillRRNDataAndGoToNextStep"
          @move-to-previous-step="moveToSelectOperationPage"
        />
      </template>

      <template #[FIVE_ONE_OPERATION.BUYER]>
        <OperationBuyer
          :rrn-fields="RRNFields!"
          @pdf-data="getPDF"
          @move-to-previous-step="moveToPreviousStep"
          @move-to-next-step="moveToNextStep"
        />
      </template>

      <template #[FIVE_ONE_OPERATION.DOCUMENT]>
        <OperationDocument
          :pdf-data="pdfData"
          @reset-to-first-step="resetToFirstStep"
        />
      </template>
    </BaseStepper>
  </PageContainer>
</template>

<style lang="scss">
.operation__title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}
</style>
