<script lang="ts" setup>
import { NSpace } from 'naive-ui';
import { AuthPanel } from '@/shared/types/auth.types';
import BaseIcon from '@/shared/UI/base-icon';
import { IProfilePanelsProps } from './profile-panels.types';

const props = withDefaults(
  defineProps<IProfilePanelsProps>(),
  {
    panels: () => []
  }
);
</script>

<template>
  <n-space :size="16">
    <n-button
      v-for="item in props.panels"
      :key="item"
      class="pr-2 pl-3 readonly"
    >
      <template #icon>
        <BaseIcon
          class="color-primary_main mr-1"
          icon="logo"
          size="24"
        />
      </template>

      {{ $t(AuthPanel[item]) }}
    </n-button>
  </n-space>
</template>
