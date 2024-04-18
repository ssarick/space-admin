import { ApiUrlPlaceholder } from '@/shared/types/api.types';
import { ApiUrlPlaceholderValueGetters } from './api-url-placeholder.types';
import ApiUrlPlaceholderValue from './api-url-placeholder-value';

export default class ApiUrlPlaceholderReplacer {

  protected static getters:
    ApiUrlPlaceholderValueGetters = {
      [ApiUrlPlaceholder.AUTH_PANEL]: ApiUrlPlaceholderValue
        .getAuthPanel
    };

  static replace(url: string): string {
    for (const key in ApiUrlPlaceholderReplacer.getters) {
      const value = ApiUrlPlaceholderReplacer.getters[key]();

      if (value) url = url.replace(key, value);
    }

    return url;
  }

}
