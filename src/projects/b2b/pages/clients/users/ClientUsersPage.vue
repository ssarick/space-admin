<script setup lang="ts">
import { NSpace } from 'naive-ui';
import pageTitle from '@/shared/UI/page-title';
import ClientUsersTable from '@/projects/b2b/features/client-users-table/ClientUsersTable.vue';
import useClientUsers from './useClientUsers';

const {
  onAddUser,
  client
} = useClientUsers();
</script>

<template>
  <main class="client-users-page">
    <pageTitle
      :title="client?.clientName || ''"
    />

    <div class="subtitle">{{ $t('Users') }}</div>

    <ClientUsersTable class="mt-2" />

    <NSpace class="mt-3">
      <n-button
        type="info"
        ghost
        @click="onAddUser"
      >
        {{ $t('Adding-a-user') }}
      </n-button>
    </NSpace>
  </main>
</template>

<style scoped lang="scss">
.subtitle {
  font-size: 16px;
}
</style>
