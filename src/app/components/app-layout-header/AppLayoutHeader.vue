<script lang="ts" setup>
import { NButton, NDropdown, NLayoutHeader, NSpace, NTooltip } from 'naive-ui';
import { AuthPanel } from '@/shared/types/auth.types';
import BaseBadge from '@/shared/UI/base-badge';
import BaseButton from '@/shared/UI/base-button';
import BaseIcon from '@/shared/UI/base-icon';
import AppProfile from '@/app/components/app-profile';
import { IAppLayoutHeaderProps } from './app-layout-header.types';
import useAppLayoutHeader from './useAppLayoutHeader';

const props = defineProps<IAppLayoutHeaderProps>();

const {
  langsMenu,
  onSelectLang,
  locale,
  signOut,
  unreadCount,
  authPanelStore,
  panelsMenu,
  onSelectAuthPanel,
  openTelegram
} = useAppLayoutHeader();
</script>

<template>
  <n-layout-header
    class="app-header"
    bordered
  >
    <n-space
      align="center"
      justify="space-between"
      class="app-header__row h-100"
    >
      <img
        v-if="props.disableAuthFeatures"
        src="/icons/icon-space.svg"
        width="120"
        alt=""
      >

      <AppProfile v-else />

      <n-space>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button
              class="app-header__button"
              secondary
              @click="openTelegram"
            >
              Telegram
            </n-button>
          </template>

          Для баг репортов и предложений
        </n-tooltip>

        <n-dropdown
          trigger="click"
          :options="langsMenu"
          @select="onSelectLang"
        >
          <n-button
            icon-placement="right"
            class="app-header__button"
            quaternary
          >
            <template #icon>
              <BaseIcon
                icon="arrow-down"
                class="icon"
                color=""
              />
            </template>

            {{ $t(locale) }}
          </n-button>
        </n-dropdown>

        <template
          v-if="!props.disableAuthFeatures"
        >
          <n-dropdown
            trigger="click"
            :options="panelsMenu"
            @select="onSelectAuthPanel"
          >
            <n-button
              class="app-header__button"
              icon-placement="right"
              quaternary
            >
              <template #icon>
                <BaseIcon
                  icon="arrow-down"
                  class="icon"
                  color=""
                />
              </template>

              {{ $t(AuthPanel[authPanelStore.selectedPanel!]) }}
            </n-button>
          </n-dropdown>

          <n-space :size="[ 24, 8 ]">
            <BaseBadge :value="unreadCount">
              <BaseButton
                class="app-header__button"
                secondary
                link
                :to="{ name: 'notification' }"
              >
                <BaseIcon
                  icon="notification-filled"
                  class="icon"
                />
              </BaseButton>
            </BaseBadge>

            <n-button
              class="app-header__button"
              secondary
              @click="signOut"
            >
              <BaseIcon
                icon="logout"
                class="icon"
              />
            </n-button>
          </n-space>
        </template>
      </n-space>
    </n-space>
  </n-layout-header>
</template>
