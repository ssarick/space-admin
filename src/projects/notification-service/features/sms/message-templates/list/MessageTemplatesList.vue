<script setup lang="ts">
import BaseButton from '@/shared/UI/base-button';
import PageTitle from '@/shared/UI/page-title';
import DeleteTemplateConfirmModal
  from '@/projects/notification-service/entities/sms/message-templates/confirm-modal';
import MessageTemplatesTable
  from '@/projects/notification-service/entities/sms/message-templates/message-templates-list';
import useMessageTemplatesList
  from '@/projects/notification-service/features/sms/message-templates/list/useMessageTemplatesList';

const {
  tableRef,
  templates,
  templatesLoading,
  confirmModalShow,
  confirmModalData,
  fetchTemplates,
  onTemplateSearch,
  sendToCreatePage,
  handleTemplateDelete,
  setTemplateData,
  openTemplatesModal
} = useMessageTemplatesList();
</script>

<template>
  <n-space
    justify="space-between"
    class="mb-4"
    :size="[20, 16]"
  >
    <PageTitle
      no-margin
      :title="$t('message-templates')"
    />

    <BaseButton
      class="px-6"
      type="primary"
      @click="sendToCreatePage"
    >
      {{ $t('message-templates-create') }}
    </BaseButton>
  </n-space>

  <MessageTemplatesTable
    ref="tableRef"
    :data="templates"
    :loading="templatesLoading"
    @update="fetchTemplates"
    @confirm-modal-data="setTemplateData"
    @confirm-modal-show="openTemplatesModal"
    @search-value-change="onTemplateSearch"
  />

  <DeleteTemplateConfirmModal
    v-model:confirm-modal="confirmModalShow"
    :confirm-data="confirmModalData"
    :loading="templatesLoading"
    @handle-confirm="handleTemplateDelete"
  />
</template>
