<script setup lang="ts">
import {
  NBreadcrumb,
  NBreadcrumbItem,
  NCard
} from 'naive-ui';
import useAppLayoutBreadcrumbs from './useAppLayoutBreadcrumbs';

const {
  breadcrumbRoutes,
  getRouteText,
  openRoute
} = useAppLayoutBreadcrumbs();
</script>

<template>
  <n-card
    v-if="breadcrumbRoutes.length"
    class="breadcrumbs-card"
    content-style="padding: 12px 24px"
    :bordered="false"
  >
    <n-breadcrumb>
      <n-breadcrumb-item
        v-for="route in breadcrumbRoutes"
        :key="route.name"
        separator=">"
        @click="openRoute(route)"
      >
        {{ getRouteText(route) }}
      </n-breadcrumb-item>
    </n-breadcrumb>
  </n-card>
</template>

<style lang="scss">
.breadcrumbs-card {
  border-radius: 0;
  border-bottom: 1px solid map-get($color-quaternary, 'main');

  .n-card {
    &__content {
      padding: 1rem 1.875rem!important;
    }
  }
}
</style>
