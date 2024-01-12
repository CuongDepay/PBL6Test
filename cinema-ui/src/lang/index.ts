// Custom internationalization configuration
import { createI18n } from 'vue-i18n';

// local language pack
import enUSLocale from './en_US';
import viVNLocale from './vi_VN';

const messages = {
  vi_VN: {
    ...viVNLocale
  },
  en_US: {
    ...enUSLocale
  }
};

/**
 * get current language
 * @returns vi|en ...
 */
export const getLanguage = () => {
  const language = useStorage('language', 'vi_VN');
  if (language.value) {
    return language.value;
  }
  return 'vi_VN';
};

const i18n = createI18n({
  legacy: false,
  locale: getLanguage(),
  messages
});

export default i18n;
