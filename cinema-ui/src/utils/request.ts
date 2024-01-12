import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useUserStore } from '@/store/modules/user';
import { getToken } from '@/utils/auth';
import { tansParams, blobValidate } from '@/utils/starcinema';
import cache from '@/plugins/cache';
import { HttpStatus } from '@/enums/RespEnum';
import { errorCode } from '@/utils/errorCode';
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading';
import FileSaver from 'file-saver';
import { getLanguage } from '@/lang';
import { formatMessageBox } from '@/plugins/modal';
import i18n from '@/lang';

let downloadLoadingInstance: LoadingInstance;
// Whether to display re-login
export const isRelogin = { show: false };

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
// Create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000
});

// request interceptor
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let systemType = '';
    if ('admin' === import.meta.env.VITE_SYSTEM_TYPE) {
      systemType = '/admin';
    } else {
      if (!localStorage.getItem('system-type')) {
        localStorage.setItem('system-type', 'customer');
      }
      systemType = '/' + localStorage.getItem('system-type');
    }
    config.baseURL = config.baseURL + systemType;
    // Corresponding internationalization resource file suffix
    config.headers['Content-Language'] = getLanguage();
    config.headers['ngrok-skip-browser-warning'] = 'true';

    const isToken = (config.headers || {}).isToken === false;
    // Do you need to prevent data duplication submission
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
    if (getToken() && !isToken) {
      config.headers['Authorization'] = import.meta.env.VITE_BEARER_KEY + getToken(); // Let each request carry a custom token Please modify it according to the actual situation
    }
    // get request mapping params parameter
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }

    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
      const requestObj = {
        url: config.url,
        data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
        time: new Date().getTime()
      };
      const sessionObj = cache.session.getJSON('sessionObj');
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        cache.session.setJSON('sessionObj', requestObj);
      } else {
        const s_url = sessionObj.url; // request address
        const s_data = sessionObj.data; // request data
        const s_time = sessionObj.time; // request time
        const interval = 500; // Interval time (ms), less than this time is regarded as repeated submission
        if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
          const message = 'The data is being processed, please do not submit repeatedly';
          console.warn(`[${s_url}]: ` + message);
          return Promise.reject(new Error(message));
        } else {
          cache.session.setJSON('sessionObj', requestObj);
        }
      }
    }
    // FormData data to request header Content-Type
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (res: AxiosResponse) => {
    // If the status code is not set, the default status is success
    const code = res.data.code || HttpStatus.SUCCESS;
    // get error message
    const msg = errorCode[code] || res.data.msg || errorCode['default'];
    // Binary data is returned directly
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data;
    }
    if (code === 401) {
      // prettier-ignore
      if (!isRelogin.show) {
        isRelogin.show = true;
        ElMessageBox.confirm(formatMessageBox(i18n.global.t('common.logoutCfTt'), i18n.global.t('common.logoutCfMsg'), 'warning-icon'), '', {
          confirmButtonText: i18n.global.t('common.logoutCfBtn'),
          cancelButtonText: i18n.global.t('common.logoutCancelBtn'),
          dangerouslyUseHTMLString: true,
          type: 'warning',
          showClose: false,
          autofocus: false,
          customClass: 'custom-message-box',
          draggable: true
        })
        .then(() => {
          isRelogin.show = false;
          useUserStore().logout().then(() => {
            if ('/' === import.meta.env.VITE_APP_CONTEXT_PATH) {
              //location.href = import.meta.env.VITE_APP_CONTEXT_PATH + 'index';
              location.href = import.meta.env.VITE_APP_CONTEXT_PATH + 'homepage/customer-login';
            } else {
              location.href = import.meta.env.VITE_APP_CONTEXT_PATH + '/homepage/customer-login';
            }
          });
        }).catch(() => {
          isRelogin.show = false;
        });
      }
      return Promise.reject(i18n.global.t('common.sessionExpiredMsg'));
    } else if (code === HttpStatus.SERVER_ERROR) {
      ElMessage({ message: msg, type: 'error' });
      return Promise.reject(new Error(msg));
    } else if (code === HttpStatus.WARN) {
      ElMessage({ message: msg, type: 'warning' });
      return Promise.reject(new Error(msg));
    } else if (code !== HttpStatus.SUCCESS) {
      ElNotification.error({ title: msg });
      return Promise.reject('error');
    } else {
      return Promise.resolve(res.data);
    }
  },
  (error: any) => {
    let { message } = error;
    if (message == 'Network Error') {
      message = i18n.global.t('common.networkErrMsg');
    } else if (message.includes('timeout')) {
      message = i18n.global.t('common.timeoutMsg');
    } else if (message.includes('Request failed with status code')) {
      message = i18n.global.t('common.commonErrMsg', { code: message.substr(message.length - 3) });
    }
    ElMessage({ message: message, type: 'error', duration: 5 * 1000 });
    return Promise.reject(error);
  }
);
// General Download Method
export function download(url: string, params: any, fileName: string) {
  downloadLoadingInstance = ElLoading.service({ text: i18n.global.t('common.downloadProgressMsg'), background: 'rgba(0, 0, 0, 0.7)' });
  // prettier-ignore
  return service.post(url, params, {
      transformRequest: [
        (params: any) => {
          return tansParams(params);
        }
      ],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob'
    }).then(async (resp: any) => {
      const isLogin = blobValidate(resp);
      if (isLogin) {
        const blob = new Blob([resp]);
        FileSaver.saveAs(blob, fileName);
      } else {
        const resText = await resp.data.text();
        const rspObj = JSON.parse(resText);
        const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default'];
        ElMessage.error(errMsg);
      }
      downloadLoadingInstance.close();
    }).catch((r: any) => {
      console.error(r);
      ElMessage.error(i18n.global.t('common.errDownloadMsg'));
      downloadLoadingInstance.close();
    });
}
// Export an axios instance
export default service;

export function getSystemType() {
  if ('admin' === import.meta.env.VITE_SYSTEM_TYPE) {
    return '/admin';
  } else {
    if (!localStorage.getItem('system-type')) {
      localStorage.setItem('system-type', 'customer');
    }
    return '/' + localStorage.getItem('system-type');
  }
}

export function getDownloadUrl() {
  return import.meta.env.VITE_APP_BASE_API + getSystemType() + '/resource/oss/download';
}

export function getUploadUrl() {
  return import.meta.env.VITE_APP_BASE_API + getSystemType() + '/resource/oss/upload';
}

export function getUrl() {
  return import.meta.env.VITE_APP_BASE_API + getSystemType();
}
