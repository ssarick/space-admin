<script setup lang="ts">
import { NSpace } from 'naive-ui';
import BaseButton from '@/shared/UI/base-button';
import PageTitle from '@/shared/UI/page-title';
import UsersList from '@/projects/inventory/features/users/list';
</script>

<template>
  <main>
    <n-space
      justify="space-between"
      class="mb-4"
    >
      <PageTitle
        no-margin
        :title="$t('Users')"
      />

      <BaseButton
        type="primary"
        link
        :to="{ name: 'inventory-users-create' }"
      >
        {{ $t('Add-user') }}
      </BaseButton>
    </n-space>

    <UsersList />
  </main>
</template>
