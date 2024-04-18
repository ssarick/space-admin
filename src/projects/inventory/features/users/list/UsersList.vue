<script setup lang="ts">
import UsersMainTable from '@/projects/inventory/entities/users/main-table';
import useUsersList from './useUsersList';

const {
  fetchUsers,
  users,
  usersLoading,
  tableRef
} = useUsersList();
</script>

<template>
  <UsersMainTable
    ref="tableRef"
    :data="users"
    :loading="usersLoading"
    @update="fetchUsers"
  />
</template>
