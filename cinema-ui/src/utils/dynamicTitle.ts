import defaultSettings from '@/settings';
import { useSettingsStore } from '@/store/modules/settings';
import { getRouteTitle } from './i18n';

/**
 * Dynamically modify the title
 */
export const useDynamicTitle = () => {
  const settingsStore = useSettingsStore();
  if (settingsStore.dynamicTitle) {
    document.title = getRouteTitle(settingsStore.title) + ' - ' + import.meta.env.VITE_APP_TITLE;
  } else {
    document.title = getRouteTitle(settingsStore.title) as string;
  }
};
