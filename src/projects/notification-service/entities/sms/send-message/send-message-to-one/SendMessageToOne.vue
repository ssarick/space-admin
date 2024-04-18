<script setup lang="ts">
import BaseButton from '@/shared/UI/base-button';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import BaseSelect from '@/shared/UI/base-select';
import type {
  SendMessageToOneEmits,
  SendMessageToOneProps
} from './send-message-to-one.types';
import useSendMessageToOne
  from './useSendMessageToOne';

const props = defineProps<SendMessageToOneProps>();
const emit = defineEmits<SendMessageToOneEmits>();

const {
  formRef,
  rules,
  validateForm,
  restoreFormValidation,
  handleEventForParams,
  to,
  priority,
  language,
  phoneFieldMask,
  langOptions,
  priorityOptions
} = useSendMessageToOne(props, emit);

defineExpose({
  validate: validateForm,
  restoreValidation: restoreFormValidation
});
</script>

<template>
  <BaseForm
    ref="formRef"
    class="form-width"
    no-prevent-route
    :model="formValue"
    :rules="rules"
  >
    <n-grid
      x-gap="16"
      y-gap="8"
      cols="4"
    >
      <n-gi
        span="2"
      >
        <n-form-item
          path="to"
          :label="$t('Phone')"
        >
          <BaseInput
            v-model="to"
            v-mask:[phoneFieldMask]
            :placeholder="$t('Phone')"
          />
        </n-form-item>
      </n-gi>

      <n-gi
        span="2"
      />

      <n-gi
        span="2"
      >
        <n-form-item
          path="priority"
          :label="$t('Priority')"
        >
          <BaseSelect
            v-model="priority"
            :placeholder="$t('Select')"
            :options="priorityOptions"
          />
        </n-form-item>
      </n-gi>

      <n-gi
        span="2"
      >
        <n-form-item
          path="language"
          :label="$t('Language')"
        >
          <BaseSelect
            v-model="language"
            :placeholder="$t('Select')"
            :options="langOptions"
          />
        </n-form-item>
      </n-gi>

      <n-gi
        span="4"
        class="mb-3"
      >
        <slot />
      </n-gi>

      <template v-if="parameters">
        <n-gi
          v-for="(item, key) in parameters"
          :key="`parameter-`+ key"
          class="mb-3"
          :span="2"
        >
          <n-form-item
            :path="`parameters.${key}`"
            :label="$t(`${key}`)"
          >
            <BaseInput
              :model-value="item[key]"
              @update:model-value="handleEventForParams(key, $event)"
            />
          </n-form-item>
        </n-gi>
      </template>

      <n-gi span="4" />

      <n-gi
        span="1"
      >
        <BaseButton
          attr-type="submit"
          type="primary"
          block
          :loading="loading"
        >
          {{ $t('send') }}
        </BaseButton>
      </n-gi>
    </n-grid>
  </BaseForm>
</template>

<style scoped lang="scss">
.form-width{
  width: 800px;
}
</style>

