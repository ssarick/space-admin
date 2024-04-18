<script setup lang="ts">
import { NAvatar, NSpace } from 'naive-ui';
import BaseIcon from '@/shared/UI/base-icon';
import { BaseSkeletonProfile } from '@/shared/UI/base-skeleton';
import useAppProfile from './useAppProfile';

const {
  user,
  userLoading,
  goToProfile
} = useAppProfile();
</script>

<template>
  <n-space
    justify="center"
    align="center"
    class="app-profile"
    :size="[ 10, 10 ]"
    :wrap-item="false"
    @click="goToProfile"
  >
    <n-avatar
      :size="48"
    >
      <BaseIcon
        icon="user"
        size="24"
      />
    </n-avatar>

    <BaseSkeletonProfile
      v-if="userLoading"
    />

    <div v-else>
      <n-text
        tag="p"
        class="text-caption text-weight-6"
      >
        {{ user?.name }}
      </n-text>

      <n-text
        :class="[
          'text-caption2',
          'text-weight-5',
          'color-secondary_dark_text'
        ]"
      >
        {{ user?.email }}
      </n-text>
    </div>
  </n-space>
</template>

<style lang="scss" scoped>
// .app-profile {
  // cursor: pointer;
// }
</style>
