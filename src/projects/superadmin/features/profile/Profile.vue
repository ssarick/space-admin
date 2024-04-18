<script lang="ts" setup>
import BaseSimpleTable from '@/shared/UI/base-simple-table';
import ProfilePanels from '@/projects/superadmin/entities/profile/profile-panels';
import useProfile from './useProfile';

const {
  profileList,
  loading,
  availablePanels
} = useProfile();
</script>

<template>
  <BaseSimpleTable
    :data="profileList"
    :loading="loading"
  />

  <n-text
    class="mt-4 headline-3_large"
    tag="h3"
  >
    Доступные разделы
  </n-text>

  <ProfilePanels
    class="mt-2"
    :panels="availablePanels"
  />
</template>
