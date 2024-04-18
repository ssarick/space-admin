<script lang="ts" setup>
import EntitySearchFilters from '../../entities/entity-search/entity-search-filters';
import EntitySearchTable from '../../entities/entity-search/entity-search-table';
import MassSearch from '../../entities/mass-search/MassSearch.vue';
import useEntitySearch from './useEntitySearch';

const {
  filters,
  entityClients,
  massSearchModalIsActive,
  onToggleMassSearchModal
} = useEntitySearch();
</script>

<template>
  <EntitySearchFilters
    v-model:name="filters.name"
    v-model:pinfl="filters.pinfl"
    v-model:open-date="filters.openDate"
    :model="filters"
    @open-mass-search="onToggleMassSearchModal"
  />

  <EntitySearchTable
    :data="entityClients"
  />

  <MassSearch
    v-model="massSearchModalIsActive"
  />
</template>
