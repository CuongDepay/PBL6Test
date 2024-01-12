import { ElMessage, ElMessageBox, ElNotification, ElLoading, MessageBoxData } from 'element-plus';
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading';
import i18n from '@/lang';
let loadingInstance: LoadingInstance;
export default {
  // notification
  msg(content: string) {
    ElMessage.info(content);
  },
  // Error message
  msgError(content: string) {
    ElMessage.error(content);
  },
  // success message
  msgSuccess(content: string) {
    ElMessage.success(content);
  },
  // warning message
  msgWarning(content: string) {
    ElMessage.warning(content);
  },
  // pop-up prompt
  alert(content: string) {
    ElMessageBox.alert(content, 'Alert');
  },
  // Error message
  alertError(content: string, title: string) {
    ElMessageBox.confirm(formatMessageBox(title ? title : 'Thông báo', content, 'error-icon'), '', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      showCancelButton: false,
      dangerouslyUseHTMLString: true,
      type: 'error',
      showClose: false,
      autofocus: false,
      customClass: 'confirm-delete custom-message-box',
      draggable: true
    });
  },
  // Tips for success
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  alertSuccess(content: string, title: string) {
    ElMessageBox.confirm(formatMessageBox(title ? title : 'Thông báo', content, 'success-icon'), '', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      showCancelButton: false,
      dangerouslyUseHTMLString: true,
      type: 'success',
      showClose: false,
      autofocus: false,
      customClass: 'custom-message-box',
      draggable: true
    });
  },
  // Warning
  alertWarning(content: string, title: string) {
    ElMessageBox.confirm(formatMessageBox(title ? title : 'Thông báo', content, 'warning-icon'), '', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      showCancelButton: false,
      dangerouslyUseHTMLString: true,
      type: 'warning',
      showClose: false,
      autofocus: false,
      customClass: 'custom-message-box',
      draggable: true
    });
  },
  // notification prompt
  notify(content: string) {
    ElNotification.info(content);
  },
  // error notification
  notifyError(content: string) {
    ElNotification.error(content);
  },
  // success notification
  notifySuccess(content: string) {
    ElNotification.success(content);
  },
  // warning notice
  notifyWarning(content: string) {
    ElNotification.warning(content);
  },
  // confirmation form
  confirm(content: string): Promise<MessageBoxData> {
    return ElMessageBox.confirm(content, 'Confirm', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    });
  },
  // confirmation warning form
  confirmWarning(content: string): Promise<MessageBoxData> {
    return ElMessageBox.confirm(formatMessageBox(i18n.global.t('common.cfWarnTt'), content, 'warning-icon'), '', {
      confirmButtonText: i18n.global.t('common.cfWarnBtnOk'),
      cancelButtonText: i18n.global.t('common.cfWarnBtnClose'),
      dangerouslyUseHTMLString: true,
      type: 'warning',
      showClose: false,
      autofocus: false,
      customClass: 'custom-message-box',
      draggable: true
    });
  },
  // confirmation delete form
  confirmDelete(content: string): Promise<MessageBoxData> {
    return ElMessageBox.confirm(formatMessageBox(i18n.global.t('common.cfDelTt'), content, 'error-icon'), '', {
      confirmButtonText: i18n.global.t('common.cfDelBtnOk'),
      cancelButtonText: i18n.global.t('common.cfDelBtnClose'),
      dangerouslyUseHTMLString: true,
      type: 'error',
      showClose: false,
      autofocus: false,
      customClass: 'confirm-delete custom-message-box',
      draggable: true
    });
  },
  // submit content
  prompt(content: string) {
    return ElMessageBox.prompt(content, 'Prompt', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    });
  },
  // open mask layer
  loading(content: string) {
    loadingInstance = ElLoading.service({
      lock: true,
      text: content,
      background: 'rgba(0, 0, 0, 0.7)'
    });
  },
  // close mask layer
  closeLoading() {
    loadingInstance.close();
  }
};

export const formatMessageBox = (title: string, content: string, type: string) => {
  return `<div class="message-box-content"><div class="message-box-icon-bg ${type}"><div class="${type} message-box-icon"></div></div><div class="message-box-title">${title}</div><div class="message-box-content">${content}</div></div>`;
};
