import modal from './modal';
import tab from './tab';
import download from './download';
import cache from './cache';
import auth from './auth';

import { App } from 'vue';

export default function installPlugin(app: App) {
  // tab operation
  app.config.globalProperties.$tab = tab;

  // modal object
  app.config.globalProperties.$modal = modal;

  // cache object
  app.config.globalProperties.$cache = cache;

  // download file
  app.config.globalProperties.$download = download;

  // Authentication object
  app.config.globalProperties.$auth = auth;
}
