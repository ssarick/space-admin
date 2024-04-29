<script setup lang="ts">
import { StatusColor } from '@/shared/types/status.types';
import BaseButton from '@/shared/UI/base-button';
import { BaseCollapse, BaseCollapseItem } from '@/shared/UI/base-collapse';
import BaseIcon from '@/shared/UI/base-icon';
import { BaseStatusIndicator } from '@/shared/UI/base-status';
import {
  InternalNotificationCollapseListEmits,
  InternalNotificationCollapseListProps
} from './internal-notification-collapse-list.types';
import useInternalNotificationCollapseList from './useInternalNotificationCollapseList';

const props = withDefaults(
  defineProps<InternalNotificationCollapseListProps>(),
  {
    list: () => []
  }
);

const emit = defineEmits<InternalNotificationCollapseListEmits>();

const {
  handleRead,
  openFile,
  observerRef
} = useInternalNotificationCollapseList(props, emit);
</script>

<template>
  <BaseCollapse
    @item-header-click="handleRead"
  >
    <BaseCollapseItem
      v-for="item in props.list"
      :key="`notification-${item.id}`"
      :name="item.id"
    >
      <template
        v-if="item.hasFile"
        #header-extra
      >
        <n-tooltip>
          <template #trigger>
            <BaseButton
              size="small"
              circle
              quaternary
              @click="openFile(item.id)"
            >
              <BaseIcon
                icon="file-empty"
                size="24"
              />
            </BaseButton>
          </template>

          {{ $t('instruction') }}
        </n-tooltip>
      </template>

      <template #header>
        <n-space
          align="center"
          :wrap="false"
          :wrap-item="false"
        >
          <BaseStatusIndicator
            size="small"
            :visible="!item.isRead"
            :color="StatusColor.RED"
          />

          <n-text
            :class="[
              'color-secondary_dark_text',
              'notification__version'
            ]"
          >
            {{ item.version }}
          </n-text>

          <n-text class="text-single-line">
            {{ item.title }}
          </n-text>
        </n-space>
      </template>

      {{ item.text }}
    </BaseCollapseItem>
  </BaseCollapse>

  <div
    ref="observerRef"
    class="notification__observer"
  />
</template>

<style lang="scss" scoped>
.notification {
  &__version {
    display: inline-block;
    min-width: 40px;
    white-space: nowrap;
  }

  &__observer {
    height: 2px;
  }
}
</style>
