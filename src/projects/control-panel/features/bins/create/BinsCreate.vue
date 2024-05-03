<script setup lang="ts">
import CreateBinsForm from '@/projects/control-panel/entities/bins/create-form';
import useBinsCreate from './useBinsCreate';

const {
  formRef,
  formModel,
  loading,
  handleSubmit
} = useBinsCreate();
</script>

<template>
  <CreateBinsForm
    v-model:bank-id="formModel.bankId"
    v-model:card-bin="formModel.cardBin"
    v-model:processing="formModel.processing"
    v-model:legal-type="formModel.legalType"
    v-model:card-type="formModel.cardType"
    v-model:processing-bank-id="formModel.processingBankId"
    ref="formRef"
    :model="formModel"
    :loading="loading"
    :submit-locale="$t('Create')"
    @submit.prevent="handleSubmit"
  />
</template>
