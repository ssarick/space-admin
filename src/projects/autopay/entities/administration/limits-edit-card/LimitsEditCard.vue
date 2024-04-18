<script lang="ts" setup>
import {
  NCard,
  NSpace,
  NSpin,
  NTable } from 'naive-ui';
import BaseIcon from '@/shared/UI/base-icon';
import AmountFormatter from '@/shared/utils/amount-formatter';
import { IEmits, IProps } from './limits-edit-card.types';
import useLimitsEditCard from './useLimitsEditCard';

const props = withDefaults(
  defineProps<IProps>(),
  {
    list: () => []
  }
);

const emit = defineEmits<IEmits>();

const {
  emitEditLimit
} = useLimitsEditCard(emit);
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
      {{ $t('Limits') }}
    </n-text>

    <n-space
      v-if="props.loading"
      justify="center"
      class="pt-3 pb-2"
    >
      <n-spin size="small" />
    </n-space>

    <n-table
      v-else
      class="no-bg custom-table"
      :bordered="false"
    >
      <thead>
        <th>{{ $t('Title') }}</th>

        <th class="text-right">{{ $t('Amount') }}</th>

        <th></th>
      </thead>

      <tbody>
        <tr
          v-for="item in props.list"
          :key="item.type!"
        >
          <td class="color-quaternary_dark">
            {{ $t(item.type!) }}
          </td>

          <td align="right">
            {{ AmountFormatter.divideAndFormat(item.limit, 'UZS') }}
          </td>

          <td
            align="right"
            class="pr-0"
          >
            <n-button
              size="small"
              quaternary
              :loading="item.loading"
              @click="emitEditLimit(item)"
            >
              {{ $t('Edit') }}

              <BaseIcon
                size="16"
                icon="edit"
                color="#C5C7CA"
                class="ml-1"
              />
            </n-button>
          </td>
        </tr>
      </tbody>
    </n-table>
  </n-card>
</template>
