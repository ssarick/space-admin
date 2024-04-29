<script lang="ts" setup>
import {
  NCard,
  NModal,
  NSpace
} from 'naive-ui';
import BaseIcon from '@/shared/UI/base-icon';
import {
  IBaseModalEmits,
  IBaseModalProps
} from './base-modal.types';
import useBaseModal from './useBaseModal';

const props = defineProps<IBaseModalProps>();
const emit = defineEmits<IBaseModalEmits>();

const {
  modelValue,
  onToggleModal
} = useBaseModal(props, emit);
</script>

<template>
  <n-modal
    v-model:show="modelValue"
    :class="[
      'base-modal',
      {
        [`base-modal--size-${props.size}`]: props.size
      }
    ]"
  >
    <n-card
      size="huge"
      role="dialog"
      aria-modal="true"
      :bordered="false"
    >
      <n-space
        justify="end"
        class="base-modal__toolbar"
      >
        <n-button
          size="medium"
          quaternary
          circle
          @click="onToggleModal"
        >
          <template #icon>
            <BaseIcon
              icon="close"
              class="text-numeric-1"
            />
          </template>
        </n-button>
      </n-space>

      <n-text
        v-if="props.title"
        tag="h2"
        class="mb-4 headline-1"
      >
        <component
          v-if="(typeof props.title === 'function')"
          :is="props.title"
        />

        <template v-else>
          {{ props.title }}
        </template>
      </n-text>

      <slot />
    </n-card>
  </n-modal>
</template>
