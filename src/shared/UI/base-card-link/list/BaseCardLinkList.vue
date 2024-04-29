<script lang="ts" setup>
import { NGi, NGrid } from 'naive-ui';
import BaseCardLink from '../item/BaseCardLink.vue';
import {
  IBaseCardLinkListEmits,
  IBaseCardLinkListProps
} from './base-card-link-list.types';
import useBaseCardLinkList from './useBaseCardLinkList';

const props = withDefaults(
  defineProps<IBaseCardLinkListProps>(),
  {
    list: () => []
  }
);

const emit = defineEmits<IBaseCardLinkListEmits>();

const { onClickCardLink } = useBaseCardLinkList(emit);
</script>

<template>
  <n-grid
    x-gap="24"
    y-gap="24"
    cols="12"
    responsive="screen"
    class="base-card-link-list"
    item-responsive
  >
    <n-gi
      v-for="(item, index) in props.list"
      :key="item.title || index"
      span="12 s:4"
    >
      <BaseCardLink
        v-bind="item"
        @click="onClickCardLink(item)"
      />
    </n-gi>
  </n-grid>
</template>
