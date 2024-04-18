<script lang="ts" setup>
import { NCheckbox, NSpace } from 'naive-ui';
import BaseLinkGroup from '@/shared/UI/base-link-group/BaseLinkGroup.vue';
import { BaseSkeletonListItem } from '@/shared/UI/base-skeleton';
import { IBaseSimpleTableEmits, IBaseSimpleTableProps } from './base-simple-table.types';
import useBaseSimpleTable from './useBaseSimpleTable';

const props = withDefaults(
  defineProps<IBaseSimpleTableProps>(),
  {
    data: () => [],
    skeletonRepeat: 6
  }
);

const emit = defineEmits<IBaseSimpleTableEmits>();

const {
  isCheckedItem,
  checkItem,
  getRowContentFlexAlign
} = useBaseSimpleTable(props, emit);
</script>

<template>
  <div
    :class="[
      'base-simple-table',
      {
        'no-responsive': props.noResponsive,
        'no-border-x': props.noBorderX,
        'column': props.column,
        'no-border-top': props.noBorderTop
      }
    ]"
  >
    <div
      v-if="props.loading"
      class="px-3 pt-1 pb-3"
    >
      <BaseSkeletonListItem
        :repeat="props.skeletonRepeat"
      />
    </div>

    <template v-else>
      <div
        v-for="(item, index) in props.data"
        :key="item.id || index"
        :class="[
          'base-simple-table__row',
          item.className
        ]"
      >
        <n-space
          align="center"
          class="base-simple-table__cell"
          :size="[ 16, 0 ]"
        >
          <span
            v-if="props.showNums"
            class="base-simple-table__num"
          >
            {{ index + 1 }}
          </span>

          <n-text
            class="color-quaternary_dark"
          >
            {{ item.name }}
          </n-text>
        </n-space>

        <n-space
          align="center"
          :justify="getRowContentFlexAlign(item)"
          :class="[
            'base-simple-table__cell',
            'inline'
          ]"
          :wrap-item="false"
        >
          <div>
            <template v-if="item.subText">
              <component
                v-if="typeof item.subText === 'function'"
                :is="item.subText()"
              />

              <n-text v-else>
                {{ item.subText }}
              </n-text>
            </template>

            <BaseLinkGroup
              v-if="item.links?.length"
              :links="item.links"
            />
          </div>

          <n-checkbox
            v-if="props.checkable"
            :checked="isCheckedItem(item)"
            @update:checked="checkItem($event, item)"
          />
        </n-space>
      </div>
    </template>
  </div>
</template>
