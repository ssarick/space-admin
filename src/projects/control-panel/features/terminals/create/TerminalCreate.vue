<script setup lang="ts">
import CreateTerminalForm from '@/projects/control-panel/entities/terminals/create-form';
import useTerminalCreate from './useTerminalCreate';

const {
  formRef,
  formModel,
  loading,
  handleSubmit
} = useTerminalCreate();
</script>

<template>
  <CreateTerminalForm
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
