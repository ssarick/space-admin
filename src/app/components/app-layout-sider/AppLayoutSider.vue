<script lang="ts" setup>
import {
  NLayoutSider,
  NMenu,
  NSpace
} from 'naive-ui';
import BaseIcon from '@/shared/UI/base-icon';
import BaseLogo from '@/shared/UI/base-logo/BaseLogo.vue';
import useAppLayoutSider from './useAppLayoutSider';

const {
  selectedKey,
  menuOptions,
  menuCollapsed,
  mainRoute,
  currentVersion,
  toggleMenuCollapsed
} = useAppLayoutSider();
</script>

<template>
  <n-layout-sider
    class="app-sider"
    collapse-mode="width"
    bordered
    :width="300"
    :collapsed-width="96"
    :collapsed="menuCollapsed"
  >
    <n-space
      align="center"
      class="app-sider__header"
    >
      <router-link
        class="app-sider__logo flex"
        :to="mainRoute"
      >
        <BaseLogo
          :short="menuCollapsed"
        />
      </router-link>
    </n-space>

    <div
      :class="[
        'app-sider__menu-holder',
        'flex',
        'flex-column',
        'justify-space-between'
      ]"
    >
      <n-menu
        class="app-sider__menu"
        :value="selectedKey"
        :options="menuOptions.menu"
      />

      <n-space
        class="pb-3 pl-2"
        align="center"
        :wrap-item="false"
      >
        <n-text
          :class="[
            'color-secondary_dark_text',
            'text-body1',
            'app-sider__version'
          ]"
        >
          Space {{ currentVersion }}
        </n-text>

        <n-spin
          v-if="!currentVersion"
          :size="16"
        />
      </n-space>
    </div>

    <button
      :class="[
        'sider-toggle-button',
        { toggle: menuCollapsed }
      ]"
      @click="toggleMenuCollapsed"
    >
      <BaseIcon
        icon="collapse-left"
        class="icon"
      />

      <span class="sider-toggle-button__border" />
    </button>
  </n-layout-sider>
</template>
