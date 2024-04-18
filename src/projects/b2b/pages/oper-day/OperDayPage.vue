<script lang="ts" setup>
import PageTitle from '@/shared/UI/page-title';
import OperDay from '@/projects/b2b/features/oper-day';
</script>

<template>
  <main>
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
        :title="$t('oper-day')"
      />
    </header>

    <OperDay />
  </main>
</template>
