<script lang="ts" setup>
import { NSpace } from 'naive-ui';
import DashboardDaysBar from '@/projects/autopay/features/dashboard/dashboard-days-bar';
import DashboardDaysPie from '@/projects/autopay/features/dashboard/dashboard-days-pie';
import { PaymentStatisticsDatePart } from '@/projects/autopay/shared/types/dashboard.types';
import { processingTypesManualList } from '@/projects/autopay/shared/utils/constants/processing-types';
import DashboardWithdrawalList from '../../features/dashboard/dashboard-withdrawal-list';
import useDashboardManualPage from './useDashboardManualPage';

const {
  processingTypes
} = useDashboardManualPage();
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
      :processing-filters="processingTypesManualList"
    />

    <DashboardDaysBar
      title="Динамика списаний по месяцам"
      :date-part="PaymentStatisticsDatePart.MONTH"
      :processing-filters="processingTypesManualList"
    />

    <DashboardWithdrawalList
      :processings="processingTypes"
    />
  </n-space>
</template>
