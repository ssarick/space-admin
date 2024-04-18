<script setup lang="ts">
import PageTitle from '@/shared/UI/page-title';
import renderIcon from '@/shared/utils/render-icon';
import ClientUsersAddTable from '@/projects/b2b/features/client-users-add-table/ClientUsersAddTable.vue';
import useClientUsersAddingPage from './useClientUsersAddingPage';

const {
  onCancel,
  onNext
} = useClientUsersAddingPage();
</script>

<template>
  <main class="client-users-page">
    <PageTitle
      :title="$t('Adding-a-user')"
    />

    <ClientUsersAddTable />

    <div class="flex mt-3">
      <n-button
        type="info"
        ghost
        :render-icon="renderIcon('add')"
        @click="onNext"
      >
        {{ $t('New-user') }}
      </n-button>

      <n-button
        class="ml-2"
        ghost
        @click="onCancel"
      >
        {{ $t('Cancel') }}
      </n-button>
    </div>
  </main>
</template>
