<script setup lang="ts">
import PageTitle from '@/shared/UI/page-title';
import AdminEdit from '@/projects/b2b/features/admin/edit/AdminEdit.vue';
import useAdminEditPage from './useAdminEditPage';

const { adminId } = useAdminEditPage();
</script>

<template>
  <main class="admin-edit--page">
    <header
      :class="[
        'header',
        'mb-4',
        'flex',
        'justify-space-between',
        'align-items-center'
      ]"
    >
      <PageTitle
        class="mr-2"
        no-margin
        :title="$t('admins-edit')"
      />
    </header>

    <AdminEdit
      :admin-id="adminId"
    />
  </main>
</template>
