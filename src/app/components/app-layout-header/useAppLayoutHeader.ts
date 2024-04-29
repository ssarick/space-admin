import { computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface';
import { useMainRoute } from '@/shared/composables/main-route/useMainRoute';
import { AppLangStorageKey } from '@/shared/types/app-lang.types';
import { AuthPanel } from '@/shared/types/auth.types';
import { useAuthPanelStore } from '@/app/store/auth/useAuthPanelStore';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { useInternalNotificationStore } from '@/projects/internal-notification/app/store/useInternalNotificationStore';
import { headerTelegramLinks } from './utils/header-constants';

export default function useAppLayoutHeader() {
  const {
    t,
    locale,
    availableLocales
  } = useI18n();
  const { signOut } = useAuthStore();
  const authPanelStore = useAuthPanelStore();
  const { goToMainRoute } = useMainRoute();

  const { unreadCount } = toRefs(useInternalNotificationStore());

  const langsMenu = computed<DropdownMixedOption[]>(
    () => availableLocales.map(createLangMenu)
  );

  const panelsMenu = computed<DropdownMixedOption[]>(
    () => authPanelStore.availablePanels.map(createPanelMenu)
  );

  const onSelectLang = (key: string) => {
    locale.value = key;

    try {
      localStorage.setItem(
        AppLangStorageKey.lang, key
      );
    } catch {}
  };

  const onSelectAuthPanel = (
    value: AuthPanel
  ) => {
    authPanelStore.setPanel(value);
    goToMainRoute();
  };

  const openTelegram = () => {
    let url: string = headerTelegramLinks.default;

    if (authPanelStore.selectedPanel
      && headerTelegramLinks[authPanelStore.selectedPanel])
      url = headerTelegramLinks[authPanelStore.selectedPanel]!;

    window.open(url);
  };

  function createLangMenu(
    key: string
  ): DropdownMixedOption {
    return {
      label: t(key),
      key: key
    };
  }

  function createPanelMenu(
    key: AuthPanel
  ): DropdownMixedOption {
    return {
      label: t(AuthPanel[key]),
      key: key
    };
  }

  return {
    langsMenu,
    onSelectLang,
    signOut,
    unreadCount,
    authPanelStore,
    panelsMenu,
    locale,
    onSelectAuthPanel,
    openTelegram
  };
}
