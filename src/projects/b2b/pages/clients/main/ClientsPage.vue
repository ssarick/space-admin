<script setup lang="ts">
import PageTitle from '@/shared/UI/page-title';
import ClientsTable from '@/projects/b2b/features/clients-table/ClientsTable.vue';
</script>

<template>
  <main class="clients-page">
    <ClientsTable>
      <PageTitle
        no-margin
        :title="$t('Clients')"
      />
    </ClientsTable>
  </main>
</template>

<style scoped lang="scss">
.clients-page {
  .footer {
    margin-top: 20px;
  }
}
</style>
