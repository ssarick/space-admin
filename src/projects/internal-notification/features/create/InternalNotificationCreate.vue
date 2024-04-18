<script setup lang="ts">
import InternalNotificationCreateForm from '../../entities/create/form';
import InternalNotificationCreateService from '../../entities/create/service';
import useInternalNotificationCreate from './useInternalNotificationCreate';

const {
  formModel,
  formRef,
  submitLoading,
  servicesDeletable,
  handleSubmit,
  handleAddService,
  handleDeleteService
} = useInternalNotificationCreate();
</script>

<template>
  <InternalNotificationCreateForm
    v-model:version="formModel.version"
    ref="formRef"
    :model="formModel"
    :loading="submitLoading"
    @add-service="handleAddService"
    @submit="handleSubmit"
  >
    <InternalNotificationCreateService
      v-for="(item, index) in formModel.services"
      v-model:file="item.file"
      v-model:service="item.service"
      v-model:text="item.text"
      v-model:title="item.title"
      :key="`service-${index}`"
      class="mt-4"
      :index="index"
      :deletable="servicesDeletable"
      @delete="handleDeleteService(index)"
    />
  </InternalNotificationCreateForm>
</template>
