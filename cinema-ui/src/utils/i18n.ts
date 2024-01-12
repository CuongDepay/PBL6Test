// translate router.meta.title, be used in breadcrumb sidebar tagsview
import i18n from '@/lang/index';
import { getLanguage } from '@/lang/index';

/**
 * Get the internationalized route, if it does not exist, it will return natively
 * @param title route name
 * @returns {string}
 */
export const translateRouteTitle = (title: string): string => {
  const hasKey = i18n.global.te('route.' + title);
  if (hasKey) {
    const translatedTitle = i18n.global.t('route.' + title);
    return translatedTitle;
  }
  return title;
};

export const getRouteTitle = (titleStringJson: any): string => {
  try {
    const json = JSON.parse(titleStringJson);
    return json[getLanguage()];
  } catch (error) {
    return titleStringJson;
  }
};
