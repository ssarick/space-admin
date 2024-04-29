<script setup lang="ts">
import {
  NCard,
  NDivider,
  NSpace,
  NTag
} from 'naive-ui';
import BaseIcon from '@/shared/UI/base-icon';
import { getDateNow } from '@/shared/utils/functions/date';
import {
  IAdministrationCardEmits,
  IAdministrationCardProps
} from '@/projects/autopay/entities/administration/administration-card/administration-card.types';
import useAdministrationCard from '@/projects/autopay/entities/administration/administration-card/useAdministrationCard';

const emit = defineEmits<IAdministrationCardEmits>();
const props = defineProps<IAdministrationCardProps>();

const {
  statusesData,
  canBlock,
  canUnblock,
  canStart
} =
  useAdministrationCard(props);
</script>

<template>
  <n-card
    class="custom-card"
    :bordered="false"
  >
    <div class="flex justify-space-between mb-5">
      <div
        v-if="statusesData[props.administrationInfo.code!]?.name"
        class="headline-3 color-common_black"
      >
        {{ $t(statusesData[props.administrationInfo.code!]?.name!) }}
      </div>

      <n-tag
        v-if="props.administrationInfo.status"
        round
        :type="statusesData[props.administrationInfo.code!]?.type"
      >
        {{ $t(props.administrationInfo.status) }}
      </n-tag>
    </div>

    <div class="flex justify-space-between">
      <div class="color-quaternary_dark text-weight-5">
        {{ $t('all amount') }}
      </div>

      <div class="color-common_black text-weight-5">
        {{ props.administrationInfo.queueInfo }}
      </div>
    </div>

    <n-divider class="my-2" />

    <div class="flex justify-space-between">
      <div class="color-quaternary_dark text-weight-5">
        {{ $t('part amount') }}
      </div>

      <div class="color-common_black text-weight-5">
        {{ props.administrationInfo.batchInfo }}
      </div>
    </div>

    <n-divider class="my-2" />

    <div class="flex justify-space-between">
      <div class="color-quaternary_dark text-weight-5">
        {{ $t('date and time') }}
      </div>

      <div class="color-common_black text-weight-5">
        {{ getDateNow() }}
      </div>
    </div>

    <n-divider class="my-2" />

    <n-space
      justify="end"
      class="pb-0"
      :wrap="false"
      :size="[ 4, 4 ]"
    >
      <n-button
        v-if="canStart"
        quaternary
        @click="emit('turnOn')"
      >
        <template #icon>
          <BaseIcon
            icon="play"
            size="24"
          />
        </template>

        <n-text class="text-caption">
          {{ $t('start') }}
        </n-text>
      </n-button>

      <n-button
        v-if="canBlock"
        quaternary
        @click="emit('pause')"
      >
        <template #icon>
          <BaseIcon
            icon="pause"
            size="24"
          />
        </template>

        <n-text class="text-caption">
          {{ $t('block') }}
        </n-text>
      </n-button>

      <n-button
        v-if="canUnblock"
        quaternary
        @click="emit('renew')"
      >
        <template #icon>
          <BaseIcon
            icon="renew"
            size="24"
          />
        </template>

        <n-text class="text-caption">
          {{ $t('unblock') }}
        </n-text>
      </n-button>
    </n-space>
  </n-card>
</template>
