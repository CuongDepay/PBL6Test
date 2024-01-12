<template>
  <div class="upload-container">
    <div class="upload-container-border" :class="mUploadProp.type">
      <el-upload
        ref="uploadRef"
        :limit="1"
        :accept="mUploadProp.accept"
        :headers="mUploadProp.headers"
        :action="mUploadProp.url + (uploadProp.updateSupport !== null && uploadProp.updateSupport !== undefined ? '?updateSupport=' + mUploadProp.updateSupport : '')"
        :disabled="isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        :class="mUploadProp.type"
        drag
      >
        <template v-slot:trigger>
          <img :src="getImgUrl()" class="file-image" />
          <div class="title">{{ $t('irupload.tt') }}</div>
          <div class="sub-title">{{ $t('irupload.subTt') }}</div>
          <IrButton type="primary" :colorStyle="getButtonColor()" :title="$t('irupload.selectFileBtn')" :width="120" />
        </template>
        <template v-slot:tip>
          <div class="upload-tip">
            <div class="update-flag" v-if="uploadProp.updateSupport !== null && uploadProp.updateSupport !== undefined">
              <el-checkbox v-model="mUploadProp.updateSupport" /> <span>{{ $t('irupload.updateSupport') }}</span>
            </div>
            <div class="supported-format">{{ $t('irupload.supportedFormat') + mUploadProp.accept }}</div>
            <div class="template" v-if="'excel' === mUploadProp.type">
              <div class="tip-text">{{ $t('irupload.tipNext', { accept: mUploadProp.accept }) }}</div>
              <el-link :underline="false" @click="importTemplate">
                <div class="template-link">
                  <svg-icon icon-class="excel" />
                  <div>{{ mUploadProp.templateName }}</div>
                </div>
              </el-link>
            </div>
          </div>
        </template>
      </el-upload>
    </div>
  </div>
</template>
<script setup lang="ts">
import excel from '@/assets/images/excel.png';
import file from '@/assets/images/upload-file.png';
import { ElUpload, UploadFile } from 'element-plus';
import { PropType } from 'vue';
const uploadRef = ref(ElUpload);
const isUploading = ref(false);
const props = defineProps({
  uploadProp: {
    // eslint-disable-next-line no-undef
    type: Object as PropType<ImportOption>,
    default: null
  }
});
const emit = defineEmits(['update:uploadProp', 'onFileSuccess', 'downloadTemplate']);
const mUploadProp = computed({
  get: () => props.uploadProp,
  set: (val) => {
    emit('update:uploadProp', val)
  }
});
/** file upload processing */
const handleFileUploadProgress = () => {
  isUploading.value = true;
}
/** File upload successfully processed */
const handleFileSuccess = (response: any, file: UploadFile) => {
  isUploading.value = false;
  uploadRef.value.handleRemove(file);
  emit('onFileSuccess', response);
}
const submit = () => {
  uploadRef.value.submit();
}

const getImgUrl = () => {
  if ('excel' === mUploadProp.value.type) {
    return excel;
  }
  if ('file' === mUploadProp.value.type) {
    return file;
  }
  return '';
}
const getButtonColor = () => {
  if ('excel' === mUploadProp.value.type) {
    return 'green';
  }
  if ('file' === mUploadProp.value.type) {
    return 'blue';
  }
  return 'blue';
}
const importTemplate = () => {
  emit('downloadTemplate');
}
defineExpose({
  submit
});
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.upload-container {
  padding: 24px;
  .file-image {
    width: 80px;
    height: 80px;
    margin-bottom: 16px;
  }
  .title {
    color: $gray-700;
    text-align: center;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .sub-title {
    color: $gray-700;
    text-align: center;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 8px;
  }
  .supported-format {
    color: $gray-500;
    text-align: center;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 16px
  }
  .upload-tip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 16px
  }
  .template {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .tip-text {
      color: $gray-500;
      text-align: center;
      font-family: Roboto;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin: 4px 0;
    }
  }
}
.template-link {
  height: 16px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  svg {
    width: 16px;
    height: 16px;
  }
  div {
    color: $green-500;
    text-align: center;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
.update-flag {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  span {
    color: $gray-500;
    text-align: center;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
</style>
