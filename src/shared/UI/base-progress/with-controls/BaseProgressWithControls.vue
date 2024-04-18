<script lang="ts" setup>
import BaseProgress from '../item/BaseProgress.vue';
import BaseProgressPercentageList from '../percentage-list/BaseProgressPercentageList.vue';
import { BaseProgressWithControlsProps } from './base-progress-with-controls.types';
import useBaseProgressWithControls from './useBaseProgressWithControls';

const props = withDefaults(
  defineProps<BaseProgressWithControlsProps>(),
  {
    options: () => []
  }
);

const {
  donePercentage
} = useBaseProgressWithControls(props);
</script>

<template>
  <n-tooltip>
    <template #trigger>
      <n-space
        align="center"
        :wrap="false"
        :size="[ 8, 8 ]"
      >
        <n-space
          :wrap-item="false"
          :wrap="false"
          :size="0"
        >
          <slot name="actions" />
        </n-space>

        <BaseProgress
          :options="props.options"
        />

        <n-text class="text-no-wrap">
          {{ donePercentage }}%
        </n-text>
      </n-space>
    </template>

    <BaseProgressPercentageList
      :options="props.options"
    />
  </n-tooltip>
</template>
