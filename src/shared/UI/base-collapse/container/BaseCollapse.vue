<script setup lang="ts"></script>

<template>
  <n-collapse
    arrow-placement="right"
    :trigger-areas="[ 'main', 'arrow' ]"
  >
    <slot />
  </n-collapse>
</template>
