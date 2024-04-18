<script lang="ts" setup>
import {
  NCard,
  NSpace,
  NSpin
} from 'naive-ui';
import { BaseSwitchList } from '@/shared/UI/base-switch';
import { IEmits, IProps } from './debit-control-card.types';
import useDebitControlCard from './useDebitControlCard';

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const {
  emitCheckDebitItem
} = useDebitControlCard(emit);
</script>

<template>
  <n-card
    class="custom-card pb-0"
    :bordered="false"
  >
    <n-text
      tag="h3"
      class="mb-3 headline-3"
    >
      Включение и отключение частичных функций списания
    </n-text>

    <BaseSwitchList
      id-key="processingType"
      border-top
      id-key-is-locale
      :list="props.list"
      @check="emitCheckDebitItem"
    />

    <n-space
      v-if="props.loading"
      justify="center"
      class="pt-3 pb-2"
    >
      <n-spin size="small" />
    </n-space>
  </n-card>
</template>
