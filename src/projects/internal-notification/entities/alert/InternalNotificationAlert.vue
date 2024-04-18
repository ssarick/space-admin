<script setup lang="ts">
import Alert from '@/shared/components/alert';
import useInternalNotificationAlert from './useInternalNotificationAlert';

const {
  isAlertVisible,
  lastVersionNotification,
  handleClose,
  handleUpdate
} = useInternalNotificationAlert();
</script>

<template>
  <Alert
    :class="[
      'notification-alert',
      {
        visible: isAlertVisible
      }
    ]"
    :action-text="$t('update')"
    :text="lastVersionNotification?.text"
    :title="lastVersionNotification?.title"
    @action-click="handleUpdate"
    @close="handleClose"
  />
</template>

<style lang="scss" scoped>
.notification-alert {
  position: fixed;
  right: 32px;
  bottom: -16px;
  max-width: 248px;
  opacity: 0;
  visibility: hidden;
  z-index: 10;
  transition: 300ms cubic-bezier(0.53, 1.86, 1, 0.99);

  &.visible {
    opacity: 1;
    bottom: 32px;
    visibility: visible;
  }
}
</style>
