<script setup lang="ts">
import BaseSimpleTable from '@/shared/UI/base-simple-table';
import type { UserInfoProps } from './user-info.types';
import useUserInfo from './useUserInfo';

const props = defineProps<UserInfoProps>();

const {
  userInfo,
  loading
} = useUserInfo(props);
</script>

<template>
  <BaseSimpleTable
    :data="userInfo"
    :loading="loading"
  />
</template>
