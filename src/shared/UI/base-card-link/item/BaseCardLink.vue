<script lang="ts" setup>
import {
  IBaseCardLinkProps
} from './base-card-link.types';

const props = withDefaults(
  defineProps<IBaseCardLinkProps>(),
  {
    img: () => []
  }
);
</script>

<template>
  <div class="base-card-link">
    <!--    <div class="base-card-link__logo">-->
    <!--      <img-->
    <!--        class="background-logo"-->
    <!--        alt=""-->
    <!--        src="/icons/space.svg"-->
    <!--      >-->
    <!--    </div>-->

    <div class="base-card-link__content">
      <n-text
        tag="p"
        class="text-subtitle"
      >
        {{ props.title }}
      </n-text>
    </div>

    <div class="base-card-link__content">
      <n-text
        tag="p"
        class="text-link"
      >
        Войти
      </n-text>
    </div>
  </div>
</template>

<style scoped lang="scss">
.text-link{
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  border-bottom: 1px solid map-get($color-common, 'black');
  transition: border-bottom 200ms ease-in-out;
}

.background-logo {
  display: block;
  margin-bottom: 24px;
  opacity: 0.05;
  transition: opacity 300ms ease-in-out;
}

.base-card-link {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  flex: 1 0 0;
  flex-direction: column;
  justify-content: space-between;
  max-width: 100%;
  height: 222px;
  padding: 24px;
  border: 1px solid map-get($color-quaternary, 'main');
  border-radius: 12px;
  cursor: pointer;
  transition: box-shadow 200ms ease-in-out;

  &__list{
    position: absolute;
    bottom: 0;
    right: 0;
  }

  &__logo {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  &:hover {
    box-shadow: 0 0 14px 0 rgba(34, 34, 34, 0.10);

    .text-link{
      border-bottom: 1px solid map-get($color-primary, 'main');
    }

    .background-logo {
      opacity: 1;
    }
  }
}
</style>
