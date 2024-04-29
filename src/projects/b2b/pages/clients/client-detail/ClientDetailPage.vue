<script setup lang="ts">
import BaseLoading from '@/shared/UI/base-loading';
import PageTitle from '@/shared/UI/page-title';
import { ClientDetailCard } from '@/projects/b2b/entities/client-detail';
import { ClientDetailActions } from '@/projects/b2b/features/client-detail-actions';
import useClientDetailPage from './useClientDetailPage';

const {
  isLoading,
  clientData,
  businessCode
} = useClientDetailPage();
</script>

<template>
  <div class="client-detail-page">
    <BaseLoading v-if="isLoading" />

    <template v-else>
      <PageTitle
        :title="$t('Viewing-client-data')"
      />

      <ClientDetailCard :data="clientData" />

      <ClientDetailActions
        v-model:client="clientData"
        :business-code="businessCode"
      />
    </template>
  </div>
</template>
