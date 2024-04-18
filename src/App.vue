<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  enUS,
  NConfigProvider,
  NDialogProvider,
  NLoadingBarProvider,
  NMessageProvider,
  ruRU
} from 'naive-ui';
import { uzUz } from '@/shared/locales/naive-locales';
import { themeOverrides } from '@/shared/utils/constants/naive-overrides';
import ConfirmationDialogProvider from '@/app/providers/confirmation-dialog';

const { locale } = useI18n();

const appLocale = computed(() => {
  const locales = {
    en: enUS,
    ru: ruRU,
    uz: uzUz
  };

  return locales[locale.value];
});
</script>

<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :locale="appLocale"
  >
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-message-provider
          placement="top"
          keep-alive-on-hover
          :max="3"
        >
          <ConfirmationDialogProvider>
            <router-view />
          </ConfirmationDialogProvider>
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
