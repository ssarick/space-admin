<script lang="ts" setup>
import BaseSimpleTable from '@/shared/UI/base-simple-table';
import useNotificationsMain from './useNotificationsMain';

const {
  loading,
  notificationsList
} = useNotificationsMain();
</script>

<template>
  <BaseSimpleTable
    :loading="loading"
    :data="notificationsList"
  />
</template>
