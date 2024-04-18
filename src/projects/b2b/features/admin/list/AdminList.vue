<script setup lang="ts">
import AdminFilters from '@/projects/b2b/entities/admin/filters';
import AdminTable from '@/projects/b2b/entities/admin/table';
import useAdminList from './useAdminList';

const {
  admins,
  loading,
  fetchAdmins,
  tableRef,
  onBeforeDeleteAdmin,
  searchValues,
  roles,
  rolesLoading
} = useAdminList();
</script>

<template>
  <AdminFilters
    v-model:fio="searchValues.Fio"
    v-model:login="searchValues.Login"
    v-model:phone="searchValues.Phone"
    v-model:role-id="searchValues.RoleId"
    class="mb-3"
    :roles-loading="rolesLoading"
    :roles="roles"
  />

  <AdminTable
    ref="tableRef"
    :data="admins"
    :loading="loading"
    @on-update="fetchAdmins"
    @delete="onBeforeDeleteAdmin"
  />
</template>
