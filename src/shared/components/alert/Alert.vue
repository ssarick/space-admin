<script setup lang="ts">
import BaseButton from '../../UI/base-button';
import BaseIcon from '../../UI/base-icon';
import { AlertEmits, AlertProps } from './alert.types';
import useAlert from './useAlert';

const props = defineProps<AlertProps>();
const emit = defineEmits<AlertEmits>();

const {
  emitActionClick,
  emitClose
} = useAlert(emit);
</script>

<template>
  <section class="alert">
    <header class="alert__header">
      <n-space
        justify="space-between"
        align="center"
        :wrap-item="false"
      >
        <BaseIcon
          icon="new-badge"
          size="24"
        />

        <BaseButton
          size="small"
          quaternary
          circle
          @click="emitClose"
        >
          <BaseIcon
            icon="close"
            size="24"
          />
        </BaseButton>
      </n-space>
    </header>

    <div class="alert__content">
      <n-text
        class="text-body1 text-single-line"
        tag="h4"
      >
        {{ props.title }}
      </n-text>

      <n-text
        class="alert__text color-secondary_dark_text text-caption2"
        tag="p"
      >
        {{ props.text }}
      </n-text>
    </div>

    <footer class="alert__footer">
      <slot name="footer">
        <BaseButton
          text
          @click="emitActionClick"
        >
          {{ props.actionText }}
        </BaseButton>
      </slot>
    </footer>
  </section>
</template>

<style lang="scss" scoped>
.alert {
  min-width: 248px;
  border-radius: 8px;
  padding: 12px 16px;
  background-color: map-get($color-common, 'white');
  box-shadow: 0px 0px 4px 0px map-get($color-common, 'gray-light_20');

  &__content {
    margin-top: 6px;
    margin-bottom: 16px;
  }

  &__text {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 2px;
    letter-spacing: 0.00525rem;
  }
}
</style>
