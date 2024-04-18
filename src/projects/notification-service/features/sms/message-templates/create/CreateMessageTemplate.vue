<script setup lang="ts">
import PageTitle from '@/shared/UI/page-title';
import MessageTemplateCreateForm
  from '@/projects/notification-service/entities/sms/message-templates/message-templates-create-form';
import useCreateMessageTemplate
  from './useCreateMessageTemplate';

const {
  handleSubmitCreateTemplateMessage,
  formModel,
  formRef,
  loading
} = useCreateMessageTemplate();
</script>

<template>
  <n-space
    justify="space-between"
    class="mb-4"
    :size="[20, 16]"
  >
    <PageTitle
      no-margin
      :title="$t('message-templates-create')"
    />
  </n-space>

  <MessageTemplateCreateForm
    v-model:name="formModel.name"
    v-model:description="formModel.description"
    v-model:code="formModel.code"
    v-model:text-ru="formModel.textRu"
    v-model:title-ru="formModel.titleRu"
    v-model:text-uz="formModel.textUz"
    v-model:title-uz="formModel.titleUz"
    ref="formRef"
    :model="formModel"
    :loading="loading"
    @submit.prevent="handleSubmitCreateTemplateMessage"
  />
</template>
