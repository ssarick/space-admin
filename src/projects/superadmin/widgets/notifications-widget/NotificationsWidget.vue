<script lang="ts" setup>
import { NTabPane } from 'naive-ui';
import BaseTabs from '@/shared/UI/base-tabs';
import NotificationsErrors from '@/projects/superadmin/features/notifications/notifications-errors';
import NotificationsMain from '@/projects/superadmin/features/notifications/notifications-main';
import { NotificationType } from '@/projects/superadmin/shared/types/notifications.types';
</script>

<template>
  <BaseTabs
    :default-value="NotificationType.NOTIFICATIONS"
  >
    <n-tab-pane
      tab="Уведомления"
      :name="NotificationType.NOTIFICATIONS"
    >
      <NotificationsMain />
    </n-tab-pane>

    <n-tab-pane
      tab="Ошибки"
      :name="NotificationType.ERRORS"
    >
      <NotificationsErrors />
    </n-tab-pane>
  </BaseTabs>
</template>
