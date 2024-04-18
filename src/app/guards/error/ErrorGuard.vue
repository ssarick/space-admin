<script setup lang="ts">
import { NResult } from 'naive-ui';
import useErrorGuard from './useErrorGuard';

const {
  error,
  onClickBtn
} = useErrorGuard();
</script>

<template>
  <div
    v-if="error"
    :class="[
      'error-guard',
      'flex',
      'align-items-center',
      'justify-content-center'
    ]"
  >
    <n-result
      :status="error.status"
      :title="error.title"
      :description="error.description"
    >
      <template #footer>
        <n-button
          @click="onClickBtn(error)"
        >
          {{ error.btnText || $t('To-main') }}
        </n-button>
      </template>
    </n-result>
  </div>

  <slot v-else />
</template>

<style lang="scss">
.error-guard {
  min-height: 90vh;
}
</style>
