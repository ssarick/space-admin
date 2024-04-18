import { createI18n } from 'vue-i18n';
import i18nData from '../locales/i18nData';
import { pluralFunc } from '../utils/functions';

const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'ru',
  legacy: false,
  messages: i18nData,
  pluralRules: {
    ru: pluralFunc,
    uz: function (choice: number) {
      return choice === 0 ? 0 : 1;
    }
  }
});

export default i18n;
