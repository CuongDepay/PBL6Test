import axios from 'axios';
import FileSaver from 'file-saver';
import { getToken } from '@/utils/auth';
import errorCode from '@/utils/errorCode';
import { blobValidate } from '@/utils/starcinema';
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading';
import { getDownloadUrl, getUrl } from '@/utils/request';

// const baseURL = import.meta.env.VITE_APP_BASE_API;
let downloadLoadingInstance: LoadingInstance;
export default {
  async oss(ossId: string | number) {
    const url = getDownloadUrl() + '/' + ossId;
    downloadLoadingInstance = ElLoading.service({ text: 'Downloading data, please wait', background: 'rgba(0, 0, 0, 0.7)' });
    try {
      const res = await axios({
        method: 'get',
        url: url,
        responseType: 'blob',
        headers: { Authorization: import.meta.env.VITE_BEARER_KEY + getToken() }
      });
      const isBlob = blobValidate(res.data);
      if (isBlob) {
        const blob = new Blob([res.data], { type: 'application/octet-stream' });
        FileSaver.saveAs(blob, decodeURIComponent(res.headers['download-filename'] as string));
      } else {
        this.printErrMsg(res.data);
      }
      downloadLoadingInstance.close();
    } catch (r) {
      console.error(r);
      ElMessage.error('There was an error downloading the file, please contact the administrator!');
      downloadLoadingInstance.close();
    }
  },
  async zip(url: string, name: string) {
    url = getUrl() + url;
    const res = await axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: {
        Authorization: import.meta.env.VITE_BEARER_KEY + getToken(),
        datasource: localStorage.getItem('dataName')
      }
    });
    const isBlob = blobValidate(res.data);
    if (isBlob) {
      const blob = new Blob([res.data], { type: 'application/zip' });
      FileSaver.saveAs(blob, name);
    } else {
      this.printErrMsg(res.data);
    }
  },
  async printErrMsg(data: any) {
    const resText = await data.text();
    const rspObj = JSON.parse(resText);
    const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default'];
    ElMessage.error(errMsg);
  }
};
