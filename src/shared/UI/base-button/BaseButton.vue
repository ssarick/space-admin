<script setup lang="ts">
import { BaseButtonProps } from './base-button.types';

const props = defineProps<BaseButtonProps>();
</script>

<template>
  <router-link
    v-if="props.link"
    v-slot="{ href, navigate }"
    custom
    :to="props.to!"
  >
    <n-button
      v-bind="$attrs"
      tag="a"
      :href="href"
      @click="navigate"
    >
      <template
        v-for="slot in Object.keys($slots)"
        #[slot]="data"
        :key="slot"
      >
        <slot
          :key="slot"
          :name="slot"
          v-bind="data"
        />
      </template>
    </n-button>
  </router-link>

  <n-button
    v-else
    v-bind="$attrs"
  >
    <template
      v-for="slot in Object.keys($slots)"
      #[slot]="data"
      :key="slot"
    >
      <slot
        :key="slot"
        :name="slot"
        v-bind="data"
      />
    </template>
  </n-button>
</template>
