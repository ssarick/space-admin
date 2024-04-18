<script lang="ts" setup>
import { NLayout, NLayoutContent } from 'naive-ui';
import BaseLoading from '@/shared/UI/base-loading';
import AppLayoutBreadcrumbs from '@/app/components/app-layout-breadcrumbs/AppLayoutBreadcrumbs.vue';
import AppLayoutHeader from '@/app/components/app-layout-header/AppLayoutHeader.vue';
import AppLayoutSider from '@/app/components/app-layout-sider/AppLayoutSider.vue';
import ErrorGuard from '@/app/guards/error/ErrorGuard.vue';
import { useAuthStore } from '../store/auth/useAuthStore';

const authStore = useAuthStore();
</script>

<template>
  <NLayout has-sider>
    <AppLayoutSider />

    <NLayout>
      <AppLayoutHeader />

      <AppLayoutBreadcrumbs />

      <NLayoutContent class="layout-content p-4">
        <ErrorGuard>
          <BaseLoading v-if="authStore.userLoading" />

          <router-view v-else />
        </ErrorGuard>
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
