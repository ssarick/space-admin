<script lang="ts" setup>
import {
  NCard,
  NSpace,
  NSpin
} from 'naive-ui';
import BaseIcon from '../base-icon';
import { IBaseCardProps } from './base-card.types';

const props = withDefaults(
  defineProps<IBaseCardProps>(),
  {
    bordered: false
  }
);
</script>

<template>
  <n-card
    content-style="padding: 0"
    :class="[
      'base-card',
      {
        'base-card--dense': props.dense
      }
    ]"
    :bordered="props.bordered"
  >
    <n-space
      v-if="!$props.hideHeader"
      class="base-card__header"
      tag="h2"
      align="center"
      justify="space-between"
    >
      <n-space
        align="center"
        :wrap="false"
      >
        <BaseIcon
          v-if="props.icon"
          size="28"
          :icon="props.icon"
          :is-reactive="props.isIconReactive"
        />

        <n-text
          tag="h1"
          class="headline-1"
        >
          {{ props.title }}
        </n-text>
      </n-space>

      <div>
        <slot name="title-append" />
      </div>
    </n-space>

    <transition>
      <div
        v-if="props.loading"
        class="base-card__loading"
      >
        <n-spin />
      </div>
    </transition>

    <slot />
  </n-card>
</template>
