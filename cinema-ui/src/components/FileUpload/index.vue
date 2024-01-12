<template>
  <div class="upload-file">
    <el-upload
      multiple
      :action="uploadFileUrl"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="limit"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :show-file-list="true"
      :headers="headers"
      :auto-upload="autoUpload"
      :on-change="handleChange"
      class="upload-file-uploader"
      ref="fileUploadRef"
    >
      <!-- upload button -->
      <div class="select-file-container">
        <IrButton leftIcon="cloud-upload" type="primary" colorStyle="blue" :title="$t('fileUpload.selectBtn')" />
        <div class="format">
          <div class="label">{{ $t('fileUpload.supportedFormats') }}</div>
          <div class="content">{{ fileType.join("/") }}</div>
        </div>
      </div>

      <template v-slot:file="files">
        <!-- File List -->
        <transition-group class="upload-file-list" name="el-fade-in-linear" tag="div">
          <template :key="file.uid" v-for="(file) in files">
            <div class="file-upload-item" v-if="file.ossId">
              <div class="file-name">
                <svg-icon :iconClass="getFileIcon(file.name)" />
                <el-link v-if="file.ossId" :href="`${file.url}`" class="link" :underline="false" target="_blank">
                  <span class="el-icon-document">{{ getFileName(file.name) }}</span>
                </el-link>
              </div>
              <IrButton
                leftIcon="close"
                buttonSize="small"
                type="primary"
                :toolTip="$t('fileUpload.deleteBtn')"
                colorStyle="gray"
                @click="handleDeletePreviewFile(file)"
              />
            </div>
          </template>
          <template :key="file.uid" v-for="(file) in files">
            <div class="file-upload-item" v-if="!file.ossId">
              <div class="file-name">
                <svg-icon :iconClass="getFileIcon(file.name)" />
                <span>{{ getFileName(file.name) }}</span>
              </div>
              <IrButton
                leftIcon="close"
                buttonSize="small"
                type="primary"
                :toolTip="$t('fileUpload.deleteBtn')"
                colorStyle="gray"
                @click="handleDeletePreviewFile(file)"
              />
            </div>
          </template>
        </transition-group>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { getToken } from "@/utils/auth";
import { listByIds, delOss } from "@/api/system/oss";
import { ElUpload, UploadFile } from "element-plus";
import { getUploadUrl } from '@/utils/request';
import i18n from "@/lang";
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const props = defineProps({
    // Quantitative restrictions
    limit: {
        type: Number,
        default: 5,
    },
    // Size limit (MB)
    fileSize: {
        type: Number,
        default: 5,
    },
    // file type, eg ['png', 'jpg', 'jpeg']
    fileType: {
        type: Array,
        default: () => ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "pdf"],
    },
    // Whether to display prompts
    isShowTip: {
        type: Boolean,
        default: true
    },
    autoUpload: {
        type: Boolean,
        default: true
    },
    loading: {
        type: Boolean,
        default: false
    },
    required: {
        type: Boolean,
        default: false
    },
    ossId: [String, Object, Array, Number],
    url: [String, Object, Array, Number],
    configKey: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['submit', 'update:loading', 'submitForm', 'update:ossId', 'update:url']);
const number = ref(0);
const uploadList = ref<any[]>([]);
// const baseUrl = import.meta.env.VITE_APP_BASE_API;
const uploadFileUrl = ref(getUploadUrl() + (props.configKey ? '/' + props.configKey : '')); // Upload file server address
const headers = ref({ Authorization: import.meta.env.VITE_BEARER_KEY + getToken() });
const selectedFiles = ref<any[]>([]);
const delOssIds = ref<any[]>([]);
const fileList = ref<any[]>([]);
const mLoading = computed({
  get: () => props.loading,
  set: (val) => {
    emit('update:loading', val)
  }
});
const showTip = computed(
    () => props.isShowTip && (props.fileType || props.fileSize)
);

const fileUploadRef = ref(ElUpload);

watch(() => props.ossId, async val => {
    if (val) {
        let temp = 1;
        // First convert the value to an array
        let list = [];
        if (Array.isArray(val)) {
            list = val;
        } else {
            const res =  await listByIds(val as string)
            list = res.data.map((oss) => {
                const data = { name: oss.originalName, url: oss.url, ossId: oss.ossId };
                return data;
            });
        }
        // Then convert the array to an array of objects
        if (props.ossId) {
            fileList.value = list.map(item => {
                item = {name: item.name, url: item.url, ossId: item.ossId};
                item.uid = item.uid || new Date().getTime() + temp++;
                return item;
            });
        }
    } else {
        fileList.value = [];
        return [];
    }
},{ deep: true, immediate: true });

// Check the format and size before uploading
const handleBeforeUpload = (file: any) => {
    // Check file type
    if (props.fileType.length) {
        const fileName = file.name.split('.');
        const fileExt = fileName[fileName.length - 1];
        const isTypeOk = props.fileType.indexOf(fileExt) >= 0;
        if (!isTypeOk) {
            // proxy?.$modal.msgError(`The file format is incorrect, please upload a ${props.fileType.join("/")} format file!`);
            proxy?.$modal.msgError(i18n.global.t('fileUpload.incorrectFormat', { formats: props.fileType.join("/") }));
            return false;
        }
    }
    // Check file size
    if (props.fileSize) {
        const isLt = file.size / 1024 / 1024 < props.fileSize;
        if (!isLt) {
            // proxy?.$modal.msgError(`Upload file size cannot exceed ${props.fileSize} MB!`);
            proxy?.$modal.msgError(i18n.global.t('fileUpload.sizeExceed', { fileSize: props.fileSize }));
            return false;
        }
    }
    // proxy?.$modal.loading("Uploading file, please wait...");
    proxy?.$modal.loading(i18n.global.t('fileUpload.loadingWait'));
    number.value++;
    return true;
}

// File count exceeded
const handleExceed = () => {
    // proxy?.$modal.msgError(`The number of uploaded files cannot exceed ${props.limit}!`);
    proxy?.$modal.msgError(i18n.global.t('fileUpload.numberExceed', { fileNumber: props.limit }));
}

// upload failed
const handleUploadError = () => {
    mLoading.value = false;
    proxy?.$modal.msgError(i18n.global.t('fileUpload.failToUpload'));
}

// upload success callback
const handleUploadSuccess = (res:any, file: UploadFile) => {
    if (res.code === 200) {
        uploadList.value.push({ name: res.data.fileName, url: res.data.url, ossId: res.data.ossId });
        uploadedSuccessfully();
    } else {
        number.value--;
        proxy?.$modal.closeLoading();
        proxy?.$modal.msgError(res.msg);
        fileUploadRef.value.handleRemove(file);
        uploadedSuccessfully();
    }
}

// Delete Files
const handleDelete = (index: number) => {
    let ossId = fileList.value[index].ossId;
    delOss(ossId);
    fileList.value.splice(index, 1);
}

// Upload end processing
const uploadedSuccessfully = () => {
    if (number.value > 0 && uploadList.value.length === number.value) {
        fileList.value = fileList.value.filter(f => f.url !== undefined).concat(uploadList.value);
        uploadList.value = [];
        number.value = 0;
        emit("update:ossId", listToString(fileList.value));
        emit("update:url", listToStringUrl(fileList.value));
        emit('submitForm', fileList.value);
        proxy?.$modal.closeLoading();
    }
}

// get file name
const getFileName = (name: string) => {
    // If it is url, then take the last name, if not return directly
    if (name.lastIndexOf("/") > -1) {
        return name.slice(name.lastIndexOf("/") + 1);
    } else {
        return name;
    }
}

// The object is converted into a specified string delimited
const listToString = (list: any[], separator?: string) => {
    let strs = "";
    separator = separator || ",";
    list.forEach(item => {
        if (item.ossId) {
            strs += item.ossId + separator;
        }
    })
    return strs != "" ? strs.substring(0, strs.length - 1) : "";
}
const listToStringUrl = (list: any[], separator?: string) => {
    let strs = "";
    separator = separator || ",";
    list.forEach(item => {
        if (item.ossId) {
            strs += item.url + separator;
        }
    })
    return strs != "" ? strs.substring(0, strs.length - 1) : "";
}
const handleChange = (uploadFile: UploadFile, uploadFiles: any) => {
    selectedFiles.value = [];
    uploadFiles.forEach((file: any) => {
        if (!file.ossId && file.status === 'ready') {
            selectedFiles.value.push(file);
        }
    });
}
const submitFile = () => {
    if (selectedFiles.value.length === 0 && !props.required) {
        return true;
    } else if (selectedFiles.value.length > 0) {
        mLoading.value = true;
        fileUploadRef.value.submit();
        delOssIds.value.forEach((value) => {
            delOss(value);
        });
        return false;
    } else if (props.required && fileList.value.length === 0) {
        proxy?.$modal.msgError(i18n.global.t('fileUpload.cannotEmpty'));
        return false;
    }
    return true;
}
const getFileIcon = (fileName: string) => {
    const fileNames = fileName.split('.');
    const ext = fileNames[fileNames.length - 1];
    switch (ext) {
        case 'txt':
            return 'txt';
        case 'doc':
            return 'doc';
        case 'docx':
            return 'doc';
        case 'pdf':
            return 'pdf-ext';
        case 'xls':
            return 'excel';
        case 'xlsx':
            return 'excel';
        case 'ppt':
            return 'pptx';
        case 'pptx':
            return 'pptx';
        default:
            return 'common-ext';
    }
}
const handleDeletePreviewFile = (file: any) => {
    fileUploadRef.value.handleRemove(file);
    emit("update:ossId", listToString(fileList.value));
    emit("update:url", listToStringUrl(fileList.value));
    let ossId = file.ossId;
    if (ossId) {
        delOssIds.value.push(ossId);
    }
}
// exposed
defineExpose({
    submitFile
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.module.scss";
.upload-file {
    width: 100%;
}
// .upload-file-uploader {
//   margin-bottom: 5px;
//   width: 100%;
// }
// .upload-file-list .el-upload-list__item {
//   border: 1px solid $gray-400;
//   line-height: 2;
//   margin-bottom: 10px;
//   position: relative;
// }
// .upload-file-list .ele-upload-list__item-content {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   color: inherit;
// }
// .ele-upload-list__item-content-action .el-link {
//   margin-right: 10px;
//   color: $red-500;
// }
.upload-file-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.line {
    width: 100%;
    height: 1px;
    background-color: $gray-200;
    margin: 12px 0;
}
.file-upload-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 24px;
    align-items: center;
    .file-name {
        padding: 4px 0;
        height: 24px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        svg {
            height: 16px;
            width: 16px;
            margin-right: 4px;
        }
        .el-link.el-link--default.link {
            height: 16px;
            span {
                height: 16px;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                color: $blue-500;
                text-decoration-line: underline;
            }
            &:hover {
                span {
                    color: $blue-600;
                }
            }
            &:active {
                span {
                    color: $blue-700;
                }
            }
        }
        span {
            height: 16px;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: $gray-700;
        }
    }
}
.select-file-container {
    width: 100%;
    height: 32px;
    display: flex;
    flex-direction: row;
    gap: 16px;
    .format {
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: start;
        .label {
            color: $gray-500;
            text-align: center;
            font-family: Roboto;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            height: 14px;
        }
        .content {
            color: $gray-900;
            text-align: center;
            font-family: Roboto;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            height: 14px;
        }
    }
}
</style>
