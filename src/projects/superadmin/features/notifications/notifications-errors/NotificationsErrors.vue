<script lang="ts" setup>
import BaseSimpleTable from '@/shared/UI/base-simple-table';
import useNotificationsErrors from './useNotificationsErrors';

const {
  loading,
  checkedNotificationIds,
  notificationsList,
  loadingSubmit,
  onSubmitCheckedNotifications
} = useNotificationsErrors();
</script>

<template>
  <div>
    <BaseSimpleTable
      v-model:checked-ids="checkedNotificationIds"
      checkable
      :loading="loading"
      :data="notificationsList"
    />

    <n-button
      type="primary"
      class="mt-4"
      :loading="loadingSubmit"
      :disabled="!checkedNotificationIds.length"
      @click="onSubmitCheckedNotifications"
    >
      Сообщить администратору
    </n-button>
  </div>
</template>
