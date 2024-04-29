<script setup lang="ts">
import PageTitle from '@/shared/UI/page-title';
import OperationType from '@/projects/cashier/features/operation-type';
import useCashierOperation from '@/projects/cashier/pages/cashier-operation/useCashierOperation';

const { handleSelectOperationType } = useCashierOperation();
</script>

<template>
  <section class="container">
    <PageTitle
      :title="$t('type')"
      :no-margin="true"
    />

    <OperationType
      class="mt-4"
      @select-operation-type="handleSelectOperationType"
    />
  </section>
</template>
