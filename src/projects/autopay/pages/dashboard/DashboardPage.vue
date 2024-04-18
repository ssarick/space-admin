<script lang="ts" setup>
import { NSpace } from 'naive-ui';
import DashboardDaysBar from '@/projects/autopay/features/dashboard/dashboard-days-bar';
import DashboardDaysPie from '@/projects/autopay/features/dashboard/dashboard-days-pie';
import DashboardWithdrawalList from '@/projects/autopay/features/dashboard/dashboard-withdrawal-list';
import { PaymentStatisticsDatePart } from '@/projects/autopay/shared/types/dashboard.types';
import useDashboardPage from './useDashboardPage';

const {
  processingTypes
} = useDashboardPage();
</script>

<template>
  <n-space
    vertical
    :size="[ 0, 60 ]"
  >
    <DashboardDaysPie
      :processings="processingTypes"
    />

    <DashboardDaysBar
      title="Динамика списаний по дням"
    />

    <DashboardDaysBar
      title="Динамика списаний по месяцам"
      :date-part="PaymentStatisticsDatePart.MONTH"
    />

    <DashboardWithdrawalList />
  </n-space>
</template>
