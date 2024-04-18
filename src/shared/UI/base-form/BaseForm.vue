<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useAttrs, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { onBeforeRouteLeave } from 'vue-router';
import { FormInst, NForm } from 'naive-ui';
import { IBaseFormProps } from './base-form.types';

const props = defineProps<IBaseFormProps>();

const { t } = useI18n();
const formRef = ref<FormInst | null>(null);
const attrs = useAttrs();
let canceled = false;
let firstLoad = true;
let isModelChanged = false;

function cancel() {
  window.onbeforeunload = null;
  canceled = true;
}

if (!props.noPreventRoute) {
  watch(
    () => attrs.model,
    () => {
      if (firstLoad) return;

      window.onbeforeunload = () => true;
      isModelChanged = true;
    },
    { deep: true }
  );

  onBeforeRouteLeave((_, __, next) => {
    if (!canceled && isModelChanged) {
      const answer = window.confirm(t('Do-you-want-to-leave'));
      // cancel the navigation and stay on the same page
      if (!answer) return false;
    }
    next();
  });
}

onMounted(() => {
  setTimeout(() => {
    firstLoad = false;
  }, 2000);
});

onBeforeUnmount(() => {
  cancel();
});

defineExpose({
  validate: () => formRef.value?.validate(),
  restoreValidation: () => formRef.value?.restoreValidation(),
  cancel
});
</script>

<template>
  <n-form
    v-bind="$attrs"
    ref="formRef"
    :class="{
      'form-control_vertical': props.vertical
    }"
  >
    <slot />
  </n-form>
</template>
