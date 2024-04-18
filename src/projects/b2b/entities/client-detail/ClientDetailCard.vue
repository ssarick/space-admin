<script setup lang="ts">
import BaseDetailCard from '@/shared/UI/base-detail-card';
import { IClientDetailCardProps } from './client-detail-card.types';
import useClientDetailCard from './useClientDetailCard';

const props = defineProps<IClientDetailCardProps>();
const { head, body } = useClientDetailCard(props);
</script>

<template>
  <BaseDetailCard
    :head="head"
    :body="body"
  />
</template>
