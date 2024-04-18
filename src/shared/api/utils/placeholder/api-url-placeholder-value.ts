import { AuthPanel } from '@/shared/types/auth.types';
import ApiUrlPlaceholderStore from './api-url-placeholder-store';

export default class ApiUrlPlaceholderValue {

  static getAuthPanel(): string | null {
    const { selectedPanel } = ApiUrlPlaceholderStore.authPanelStore;

    return selectedPanel && AuthPanel[selectedPanel];
  }

}
