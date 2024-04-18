<script lang="ts" setup>
import IndividualSearchFilters from '../../entities/individual-search/individual-search-filters';
import IndividualSearchTable from '../../entities/individual-search/individual-search-table';
import MassSearch from '../../entities/mass-search/MassSearch.vue';
import useIndividualSearch from './useIndividualSearch';

const {
  filters,
  individualClients,
  massSearchModalIsActive,
  onToggleMassSearchModal
} = useIndividualSearch();
</script>

<template>
  <IndividualSearchFilters
    v-model:birth-date="filters.birthDate"
    v-model:cut-fio="filters.cutFio"
    v-model:name="filters.name"
    v-model:pinfl="filters.pinfl"
    :model="filters"
    @open-mass-search="onToggleMassSearchModal"
  />

  <IndividualSearchTable
    :data="individualClients"
  />

  <MassSearch
    v-model="massSearchModalIsActive"
  />
</template>
