<script setup lang="ts">
import ApplicationForm from '@/projects/subsidy/entities/applications/form';
import { ApiSubsidyApplication } from '@/projects/subsidy/shared/api';
import { ApplicationEditProps } from './application-edit.types';
import useApplicationEdit from './useApplicationEdit';

const props = defineProps<ApplicationEditProps>();

const {
  dataLoading,
  formModel,
  formRef,
  application,
  onSubmit
} = useApplicationEdit(props);
</script>

<template>
  <ApplicationForm
    v-model:acc-external="formModel.accExternal"
    v-model:amount-this-month-tiyin="formModel.amountThisMonthTiyin"
    v-model:contract-payment-start-date="formModel.contractPaymentStartDate"
    v-model:contract-type="formModel.contractType"
    v-model:mfo="formModel.mfo"
    v-model:decision="formModel.decision"
    v-model:percentage-payment-date="formModel.percentagePaymentDate"
    v-model:pinfl="formModel.pinfl"
    v-model:rest-amount-tiyin="formModel.restAmountTiyin"
    v-model:credit-amount-tiyin="formModel.creditAmountTiyin"
    ref="formRef"
    :contract-type-name="application?.contractTypeName"
    :request-contracts="ApiSubsidyApplication.fetchContractTypes"
    :model="formModel"
    :data-loading="dataLoading"
    @submit.prevent="onSubmit"
  />
</template>
