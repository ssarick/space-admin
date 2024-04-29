<script setup lang="ts">
import BaseButton from '@/shared/UI/base-button';
import BaseModal from '@/shared/UI/base-modal';
import PageTitle from '@/shared/UI/page-title';
import SendMessageTemplatesTable
  from '@/projects/notification-service/entities/sms/send-message/send-message-template-list';
import SendMessageTemplatesList
  from '@/projects/notification-service/entities/sms/send-message/send-message-templates';
import SendMessageToAll
  from '@/projects/notification-service/entities/sms/send-message/send-message-to-all';
import SendMessageToOne
  from '@/projects/notification-service/entities/sms/send-message/send-message-to-one';
import useSendMessage from './useSendMessage';

const {
  formRef,
  tableRef,
  pageTitle,
  sendingLoading,
  sendingType,
  sendingTypes,
  sendingToAllModel,
  sendingToOneModel,
  selectedTemplate,
  templates,
  templatesLoading,
  templateModalShow,
  confirmModalToOne,
  confirmModalToAll,
  startSendingMessageToAll,
  submitSendingToAll,
  submitSendingToOne,
  onConfirmSubmitSendingToAll,
  onConfirmSubmitSendingToOne,
  selectTemplate,
  onTemplateSearch,
  showTemplatesModal,
  fetchSendMessageTemplates,
  handleCheckedChange,
  handleValuesForParameters
} = useSendMessage();
</script>

<template>
  <n-space
    justify="space-between"
    class="mb-4"
    :size="[ 20, 16 ]"
  >
    <PageTitle
      no-margin
      :title="pageTitle"
    />
  </n-space>

  <n-space
    class="mb-3"
    :size="[ 20, 16 ]"
  >
    <n-radio-group
      v-model:value="sendingType"
    >
      <n-space class="radio-list">
        <n-radio
          v-for="item in sendingTypes"
          :key="`switch-sender-${item.id}`"
          class="radio-color"
          :value="item.id"
          :label="item.name"
        />
      </n-space>
    </n-radio-group>
  </n-space>

  <n-space
    v-if="!sendingType"
    class="mb-3"
  >
    <SendMessageToAll
      v-model:priority="sendingToAllModel.priority"
      v-model:language="sendingToAllModel.language"
      v-model:file="sendingToAllModel.file"
      ref="formRef"
      :form-value="sendingToAllModel"
      :loading="sendingLoading"
      @submit.prevent="onConfirmSubmitSendingToAll"
    >
      <send-message-templates-list
        :lang="sendingToAllModel.language"
        :selected-template="selectedTemplate"
        @handle-template-select-modal="showTemplatesModal"
        @sending-template-code="selectTemplate"
      />
    </SendMessageToAll>
  </n-space>

  <n-space
    v-else
    class="mb-3"
  >
    <SendMessageToOne
      v-model:to="sendingToOneModel.to"
      v-model:priority="sendingToOneModel.priority"
      v-model:language="sendingToOneModel.language"
      v-model:parameters="sendingToOneModel.parameters"
      ref="formRef"
      :form-value="sendingToOneModel"
      :loading="sendingLoading"
      :selected-template="selectedTemplate"
      @change-values-for-parameters="handleValuesForParameters"
      @submit.prevent="onConfirmSubmitSendingToOne"
    >
      <send-message-templates-list
        :lang="sendingToOneModel.language"
        :selected-template="selectedTemplate"
        @handle-template-select-modal="showTemplatesModal"
        @sending-template-code="selectTemplate"
      />
    </SendMessageToOne>
  </n-space>

  <BaseModal
    v-model="templateModalShow"
    class="templateList"
    size="large"
    close-on-esc
    :title="$t('select-sms-template')"
    :mask-closable="false"
  >
    <SendMessageTemplatesTable
      ref="tableRef"
      :data="templates"
      :loading="templatesLoading"
      @update="fetchSendMessageTemplates"
      @search-value-change="onTemplateSearch"
      @confirm-modal-data="selectTemplate"
    />
  </BaseModal>

  <BaseModal
    v-model="confirmModalToOne"
    close-on-esc
    :title="$t('Confirm-action')"
    :mask-closable="false"
  >
    <BaseButton
      class="w-100"
      type="primary"
      @click="submitSendingToOne"
    >
      {{ $t('Confirm') }}
    </BaseButton>
  </BaseModal>

  <BaseModal
    v-model="confirmModalToAll"
    close-on-esc
    :title="$t('Confirm-action')"
    :mask-closable="false"
  >
    <n-checkbox
      v-model:checked="startSendingMessageToAll"
      class="mb-4"
      :label="$t('start-mass-mailing')"
      @update:checked="handleCheckedChange"
    />

    <BaseButton
      class="w-100"
      type="primary"
      @click="submitSendingToAll"
    >
      {{ $t('Confirm') }}
    </BaseButton>
  </BaseModal>
</template>

<style lang="scss" scoped>
.radio-list {
  gap: 12px 16px!important;
}

.radio-color {
  background: map-get($color-common, 'white-grey');
  padding: 12px 16px;
  border-radius: 6px;
}

:global(.templateList.n-card > .n-card__content) {
  padding: 30px 20px !important;
}
</style>
