import { useAuthPanelStore } from '@/app/store/auth/useAuthPanelStore';

export default class ApiUrlPlaceholderStore {

  private static _authPanelStore:
    ReturnType<typeof useAuthPanelStore> | null = null;

  static get authPanelStore():
    ReturnType<typeof useAuthPanelStore> {
    if (!ApiUrlPlaceholderStore._authPanelStore) {
      ApiUrlPlaceholderStore._authPanelStore = useAuthPanelStore();
    }

    return ApiUrlPlaceholderStore._authPanelStore;
  }

}
