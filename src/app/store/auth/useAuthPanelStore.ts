import { defineStore } from 'pinia';
import { AuthPanel, AuthPanelEvent, AuthPanelEventListeners } from '@/shared/types/auth.types';
import authBrowserStore from '@/shared/utils/auth-browser-store';
import { useAuthCredentialsStore } from './useAuthCredentialsStore';
import { useAuthRolesStore } from './useAuthRolesStore';

export const useAuthPanelStore = defineStore(
  'auth-panel',
  () => {
    const authCredentials = useAuthCredentialsStore();
    const authRoles = useAuthRolesStore();
    console.warn(authRoles);

    const selectedPanel = ref<AuthPanel | null>(
      authBrowserStore.panel
    );

    // const availablePanels = computed<AuthPanel[]>(
    //   () => Object
    //     .keys(authPanelRoles)
    //     .filter(panel => authRoles.hasSomeRole(
    //       authPanelRoles[panel]
    //     ))
    //     .map(panel => +panel)
    // );

    const availablePanels = ref<AuthPanel[]>([
      AuthPanel.CONTROL_PANEL,
      // AuthPanel.AUTOPAY,
      AuthPanel.SUBSIDY,
      // AuthPanel.B2B,
      // AuthPanel.B2C,
      AuthPanel.FILE_MANAGER,
      AuthPanel.INVENTORY,
      AuthPanel.ISEEU,
      AuthPanel.NOTIFICATION,
      AuthPanel.CASHIER,
      AuthPanel.BINDED_FACE,
      AuthPanel.LOGS_AUDIT
    ]);
    let listeners: AuthPanelEventListeners = {};

    const addListener = (
      event: AuthPanelEvent | AuthPanelEvent[],
      listener: VoidFunction,
      authPanel?: AuthPanel
    ) => {
      if (Array.isArray(event)) {
        return event.forEach(eventName =>
          addListener(eventName, listener, authPanel));
      }

      listeners[event] = listeners[event] || [];

      listeners[event]?.push({
        listener, authPanel
      });
    };

    const removeListener = (
      event: AuthPanelEvent,
      listener: VoidFunction
    ) => {
      const index = listeners[event]?.findIndex(
        item => item.listener === listener
      ) || -1;

      index > -1 && listeners[event]?.splice(
        index, 1
      );
    };

    const removeListeners = (
      events: AuthPanelEvent[],
      listener: VoidFunction
    ) => events.forEach(
      event => removeListener(event, listener)
    );

    const clearAllListeners = () => {
      listeners = {};
    };

    const callEventListeners = (
      event: AuthPanelEvent
    ) => authCredentials.isAuth && listeners[event]?.forEach(
      item => (!item.authPanel
        || item.authPanel === selectedPanel.value)
        && item.listener()
    );

    const setPanel = (value: AuthPanel | null) => {
      selectedPanel.value = value;
      authBrowserStore.panel = value;

      callEventListeners(AuthPanelEvent.CHANGE);
    };

    onMounted(() => {
      setTimeout(() => {
        callEventListeners(AuthPanelEvent.LOAD);
      });
    });

    return {
      selectedPanel,
      availablePanels,
      addListener,
      removeListener,
      removeListeners,
      clearAllListeners,
      setPanel
    };
  }
);
