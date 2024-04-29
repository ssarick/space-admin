<script lang="ts" setup>
import {
  NCard,
  NFormItem,
  NSpace,
  NSpin
} from 'naive-ui';
import BaseInput from '@/shared/UI/base-input';
import { inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import {
  IHumoIntervalCardEmits,
  IHumoIntervalCardProps
} from './humo-interval-card.types';
import useHumoIntervalCard from './useHumoIntervalCard';

const props = defineProps<IHumoIntervalCardProps>();
const emit = defineEmits<IHumoIntervalCardEmits>();

const { amount } = useHumoIntervalCard(props, emit);
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
      Срок обновления HUMO карт
    </n-text>

    <n-space
      :wrap-item="false"
    >
      <n-form-item
        feedback="Введите диапазон в днях"
        style="width: calc(50% - 6px)"
        :show-label="false"
      >
        <BaseInput
          v-model="amount"
          placeholder=""
          :allow-input="inputAllowOnlyNumber"
        />
      </n-form-item>

      <n-button
        class="flex-1"
        type="primary"
        :disabled="!amount"
      >
        Применить
      </n-button>
    </n-space>

    <n-space
      v-if="props.loading"
      justify="center"
      class="pt-3 pb-2"
    >
      <n-spin size="small" />
    </n-space>
  </n-card>
</template>
