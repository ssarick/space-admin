<script setup lang="ts">
import PageTitle from '@/shared/UI/page-title';
import AdminCreation from '@/projects/b2b/features/admin/creation/AdminCreation.vue';
</script>

<template>
  <main class="admin-create--page">
    <header
      :class="[
        'header',
        'mb-3',
        'flex',
        'justify-space-between',
        'align-items-center'
      ]"
    >
      <PageTitle
        class="mr-2"
        no-margin
        :title="$t('admins-create')"
      />
    </header>

    <AdminCreation />
  </main>
</template>
