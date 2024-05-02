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
    v-model:merchant-id="formModel.merchantId"
    v-model:operation-type="formModel.operationType"
    v-model:partner="formModel.partner"
    v-model:name="formModel.name"
    v-model:port="formModel.port"
    ref="formRef"
    :model="formModel"
    :loading="loading"
    :submit-locale="$t('Create')"
    @submit.prevent="handleSubmit"
  />
</template>
