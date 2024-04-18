<script setup lang="ts">
import PageTitle from '@/shared/UI/page-title';
import AdminList from '@/projects/b2b/features/admin/list';
import useAdminsListPage from './useAdminsListPage';

const {
  goCreationPage
} = useAdminsListPage();
</script>

<template>
  <main class="admins-list--page">
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
        :title="$t('Administrators')"
      />

      <n-button
        type="primary"
        class="ml-2"
        ghost
        @click="goCreationPage"
      >
        Создать
      </n-button>
    </header>

    <AdminList />
  </main>
</template>
