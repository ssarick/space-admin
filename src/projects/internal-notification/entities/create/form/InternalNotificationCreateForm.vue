<script setup lang="ts">
import BaseButton from '@/shared/UI/base-button';
import BaseCard from '@/shared/UI/base-card';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import { semverMaskOptions } from '@/shared/utils/mask';
import {
  InternalNotificationCreateFormEmits,
  InternalNotificationCreateFormProps
} from './internal-notification-create-form.types';
import useInternalNotificationCreateForm from './useInternalNotificationCreateForm';

const props = defineProps<InternalNotificationCreateFormProps>();
const emit = defineEmits<InternalNotificationCreateFormEmits>();

const {
  formRef,
  rules,
  handleSubmit,
  handleAddService,
  version,
  restoreFormValidation,
  validateForm
} = useInternalNotificationCreateForm(props, emit);

defineExpose({
  validate: validateForm,
  restoreValidation: restoreFormValidation
});
</script>

<template>
  <BaseForm
    ref="formRef"
    no-prevent-route
    :model="props.model"
    :rules="rules"
    @submit.prevent="handleSubmit"
  >
    <BaseCard
      title="Версия обновления"
      class="pb-1 mb-4"
      bordered
      dense
    >
      <n-form-item
        path="version"
        :show-label="false"
      >
        <BaseInput
          v-model="version"
          v-mask:[semverMaskOptions]
          placeholder=""
        />
      </n-form-item>
    </BaseCard>

    <slot />

    <n-space
      class="mt-4"
      :size="[ 24, 16 ]"
    >
      <BaseButton
        type="tertiary"
        @click="handleAddService"
      >
        Добавить раздел
      </BaseButton>

      <BaseButton
        attr-type="submit"
        type="primary"
        :loading="props.loading"
      >
        Создать
      </BaseButton>
    </n-space>
  </BaseForm>
</template>
