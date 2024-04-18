<script setup lang="ts"></script>

<template>
  <n-collapse-item
    class="base-collapse-item"
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
  </n-collapse-item>
</template>

<style lang="scss" scoped>
.base-collapse-item {
  background-color: map-get($color-tertiary, 'main');
  border: 1px solid map-get($color-tertiary, 'dark');

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &:nth-child(even) {
    background-color: map-get($color-common, 'white');
  }

  :deep() {
    .n-collapse-item {
      &-arrow {
        right: 10px;
        top: 50%;
        position: absolute;
        transform: rotate(90deg) translateX(-50%)!important;
        font-size: 1.25rem!important;

        .n-base-icon {
          transition: transform .15s var(--n-bezier),
            color .3s var(--n-bezier);
        }
      }

      &__header {
        &-main {
          display: block!important;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          padding: 16px 10px 16px 16px;
        }

        &-extra {
          margin-right: 38px;
        }

        &--active {
          .n-collapse-item-arrow {
            .n-base-icon {
              transform: rotate(180deg)!important;
            }
          }
        }
      }

      &__content-inner {
        padding: 4px 16px 16px!important;
        white-space: pre-line;
      }
    }
  }
}
</style>
