<script lang="ts" setup>
import { useSlots } from 'vue';
import { NLayout, NLayoutContent } from 'naive-ui';
import AppLayoutHeader from '@/app/components/app-layout-header/AppLayoutHeader.vue';

const slot = useSlots();
</script>

<template>
  <NLayout class="layout">
    <AppLayoutHeader
      disable-auth-features
    />

    <NLayoutContent class="layout__content">
      <slot v-if="slot.default" />

      <router-view v-else />
    </NLayoutContent>
  </NLayout>
</template>
