<script setup lang="ts">
import { computed } from 'vue';
import { NTable } from 'naive-ui';
import type {
  IBaseDetailCardBody,
  IBaseDetailCardHead
} from './base-detail-card.types';
import useBaseDetailCard from './useBaseDetailCard';

interface IProps {
  head?: IBaseDetailCardHead[];
  body?: IBaseDetailCardBody[];
}

const props = defineProps<IProps>();
const head = computed(() => props.head || []);
const body = computed(() => props.body || []);

const { checkBodyRowIsVisible } = useBaseDetailCard();
</script>

<template>
  <n-table
    class="mt-3"
    striped
    :single-line="false"
  >
    <thead v-if="head.length">
      <tr>
        <th
          v-for="(headCol, headColIndex) in head"
          :key="headCol.text || headColIndex"
        >
          {{ headCol.text || '' }}
        </th>
      </tr>
    </thead>

    <tbody>
      <template
        v-for="bodyRow in body"
        :key="`${bodyRow.title}-${bodyRow.text}`"
      >
        <tr v-if="checkBodyRowIsVisible(bodyRow)">
          <td>{{ bodyRow.title }}</td>

          <td>{{ bodyRow.text }}</td>
        </tr>
      </template>
    </tbody>
  </n-table>
</template>
