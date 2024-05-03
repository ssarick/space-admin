<script setup lang="ts">
import PageTitle from '@/shared/UI/page-title';
import BinsCreate from '@/projects/control-panel/features/bins/create';
</script>

<template>
  <PageTitle
    :title="$t('bins-create')"
  />

  <BinsCreate />
</template>
