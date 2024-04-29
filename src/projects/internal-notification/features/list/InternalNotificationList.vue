<script setup lang="ts">
import { AuthPanel } from '@/shared/types/auth.types';
import BaseButton from '@/shared/UI/base-button';
import BaseIcon from '@/shared/UI/base-icon';
import PageTitle from '@/shared/UI/page-title';
import InternalNotificationCollapseList from '../../entities/list';
import useInternalNotificationList from './useInternalNotificationList';

const {
  notifications,
  isPlaceholderVisible,
  notificationsLoading,
  handleReadAll,
  readAllLoading,
  fetchNotifications,
  handleReadById,
  selectedPanel
} = useInternalNotificationList();
</script>

<template>
  <n-space
    align="end"
    justify="space-between"
    class="mb-4"
  >
    <PageTitle
      no-margin
      :title="$t('notifications')"
    />

    <BaseButton
      v-if="notifications.length"
      class="color-quaternary_dark notification__read-all"
      text
      :loading="readAllLoading"
      @click="handleReadAll"
    >
      {{ $t('read-all') }}
    </BaseButton>
  </n-space>

  <InternalNotificationCollapseList
    :list="notifications"
    @fetch="fetchNotifications"
    @read="handleReadById"
  />

  <n-result
    v-if="isPlaceholderVisible"
    status="404"
    :description="$t('notifications-empty', {
      service: $t(AuthPanel[selectedPanel!])
    })"
  >
    <template #icon>
      <BaseIcon
        icon="warning-alt"
        size="48"
        color="#999999"
      />
    </template>
  </n-result>

  <n-space
    v-if="notificationsLoading"
    justify="center"
    class="mt-3"
  >
    <n-spin />
  </n-space>
</template>

<style lang="scss" scoped>
.notification {
  &__read-all {
    height: 30px;
  }
}
</style>
