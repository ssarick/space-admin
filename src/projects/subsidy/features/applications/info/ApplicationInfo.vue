<script lang="ts" setup>
import BaseButton from '@/shared/UI/base-button';
import BaseSimpleTable from '@/shared/UI/base-simple-table';
import { ApplicationInfoProps } from './application-info.types';
import useApplicationForm from './useApplicationForm';

const props = defineProps<ApplicationInfoProps>();

const {
  data,
  loading,
  isEditable
} = useApplicationForm(props);
</script>

<template>
  <BaseSimpleTable
    :data="data"
    :loading="loading"
  />

  <BaseButton
    v-if="isEditable"
    type="primary"
    class="mt-4"
    link
    :to="{
      name: 'subsidy-applications-edit',
      params: { subsidyId }
    }"
  >
    Редактировать
  </BaseButton>
</template>
