<script lang="ts" setup>
import { BaseCardLinkList } from '@/shared/UI/base-card-link';
import { ISignInPanelsEmits, ISignInPanelsProps } from './sign-in-panels.types';
import useSignInPanels from './useSignInPanels';

const props = defineProps<ISignInPanelsProps>();
const emit = defineEmits<ISignInPanelsEmits>();

const {
  panelsList,
  onSelectPanel
} = useSignInPanels(props, emit);
</script>

<template>
  <div class="sign-in-panels">
    <n-space
      justify="center"
      class="mb-2"
    >
      <img
        src="/icons/icon-space.svg"
        alt="point logo"
        width="140"
      />
    </n-space>

    <n-text
      tag="h3"
      class="mb-4 text-center"
    >
      Точка управления цифровыми продуктами
    </n-text>

    <BaseCardLinkList
      class="sign-in-panels__list"
      :list="panelsList"
      @select="onSelectPanel"
    />
  </div>
</template>

<style lang="scss" scoped>
.sign-in-panels {
  width: 100%;
  padding: 60px;

  &__list {
    width: 1260px!important;
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>
