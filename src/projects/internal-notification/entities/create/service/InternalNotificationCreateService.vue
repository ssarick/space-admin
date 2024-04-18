<script setup lang="ts">
import BaseButton from '@/shared/UI/base-button';
import BaseCard from '@/shared/UI/base-card';
import BaseIcon from '@/shared/UI/base-icon';
import BaseInput from '@/shared/UI/base-input';
import BaseSelect from '@/shared/UI/base-select';
import BaseUploadDraggable from '@/shared/UI/base-upload-draggable';
import { FileMimeType } from '@/shared/utils/constants/file-mime-types';
import renderIcon from '@/shared/utils/render-icon';
import { InternalNotificationCreateServiceEmits, InternalNotificationCreateServiceProps } from './internal-notification-create-service.types';
import useInternalNotificationCreateService from './useInternalNotificationCreateService';

const props = defineProps<InternalNotificationCreateServiceProps>();
const emit = defineEmits<InternalNotificationCreateServiceEmits>();

const {
  service,
  title,
  text,
  file,
  serviceTitle,
  serviceOptions,
  formRules,
  handleDelete,
  getFormItemPath
} = useInternalNotificationCreateService(props, emit);
</script>

<template>
  <BaseCard
    class="pb-1"
    dense
    bordered
    :title="serviceTitle"
  >
    <n-form-item
      :path="getFormItemPath('service')"
      :show-label="false"
      :rule="formRules.service"
    >
      <BaseSelect
        v-model="service"
        :options="serviceOptions"
      />
    </n-form-item>

    <n-form-item
      label="Заголовок"
      :path="getFormItemPath('title')"
      :rule="formRules.title"
    >
      <BaseInput
        v-model="title"
        placeholder=""
      />
    </n-form-item>

    <n-form-item
      label="Описание"
      :path="getFormItemPath('text')"
      :rule="formRules.text"
    >
      <BaseInput
        v-model="text"
        type="textarea"
        placeholder=""
        :autosize="{
          minRows: 3,
          maxRows: 7
        }"
      />
    </n-form-item>

    <n-form-item
      label="Загрузка файла"
      :path="getFormItemPath('file')"
    >
      <BaseUploadDraggable
        v-model="file"
        list-type="image"
        :accept="[ FileMimeType.pdf ]"
        :max-files-size="15"
        :max="1"
        :render-icon="renderIcon('file-pdf')"
      />
    </n-form-item>

    <template
      v-if="props.deletable"
      #title-append
    >
      <BaseButton
        size="small"
        circle
        quaternary
        @click="handleDelete"
      >
        <template #icon>
          <BaseIcon
            icon="trash-filled"
            size="24"
            color="#808080"
          />
        </template>
      </BaseButton>
    </template>
  </BaseCard>
</template>
