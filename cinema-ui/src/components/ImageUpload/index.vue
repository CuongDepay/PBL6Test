<template>
  <div class="component-upload-image">
    <el-upload
      multiple
      :action="uploadImgUrl"
      list-type="picture-card"
      :on-success="handleUploadSuccess"
      :before-upload="handleBeforeUpload"
      :limit="limit"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      ref="imageUpload"
      :before-remove="handleDelete"
      :show-file-list="true"
      :headers="headers"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :class="{ hide: fileList.length >= limit }"
    >
      <el-icon class="avatar-uploader-icon"><plus /></el-icon>
    </el-upload>
    <!-- upload prompt -->
    <div class="el-upload__tip" v-if="showTip">
      Please upload
      <template v-if="fileSize">
        size does not exceed <b style="color: #f56c6c">{{ fileSize }} MB</b>
      </template>
      <template v-if="fileType">
        format is <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
      </template>
      document
    </div>

    <el-dialog v-model="dialogVisible" title="Preview" width="800px" append-to-body>
      <img :src="dialogImageUrl" style="display: block; max-width: 100%; margin: 0 auto" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getToken } from "@/utils/auth";
import { listByIds, delOss } from "@/api/system/oss";
import { ComponentInternalInstance, PropType } from "vue";
import { OssVO } from "@/api/system/oss/types";
import { ElUpload, UploadFile } from "element-plus";
import { getUploadUrl } from '@/utils/request';

const props = defineProps({
    modelValue: [String, Object, Array],
    // Image limit
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
        type: Array as PropType<string[]>,
        default: () => ["png", "jpg", "jpeg"],
    },
    // Whether to display prompts
    isShowTip: {
        type: Boolean,
        default: true
    },
});

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const emit = defineEmits(['update:modelValue']);
const number = ref(0);
const uploadList = ref<any[]>([]);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

// const baseUrl = import.meta.env.VITE_APP_BASE_API;
const uploadImgUrl = ref(getUploadUrl()); // Uploaded image server address
const headers = ref({ Authorization: import.meta.env.VITE_BEARER_KEY + getToken() });

const fileList = ref<any[]>([]);
const showTip = computed(
    () => props.isShowTip && (props.fileType || props.fileSize)
);

const imageUploadRef = ref(ElUpload);

watch(() => props.modelValue, async val => {
    if (val) {
        // First convert the value to an array
        let list:OssVO[] = [];
        if (Array.isArray(val)) {
            list = val as OssVO[];
        } else {
            const res = await listByIds(val as string)
            list = res.data
        }
        // Then convert the array to an array of objects
        fileList.value = list.map(item => {
            // String echo processing If the url is stored here, it can be directly echoed If the id is stored, it needs to call the interface to find out
            let itemData;
            if (typeof item === "string") {
                itemData = { name: item, url: item };
            } else {
                // The name here uses ossId to prevent duplicate names from being deleted
                itemData = { name: item.ossId, url: item.url, ossId: item.ossId };
            }
            return itemData;
        });
    } else {
        fileList.value = [];
        return [];
    }
},{ deep: true, immediate: true });

/** Loading before uploading */
const handleBeforeUpload = (file: any) => {
    let isImg = false;
    if (props.fileType.length) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
            fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        isImg = props.fileType.some((type) => {
            if (file.type.indexOf(type) > -1) return true;
            if (fileExtension && fileExtension.indexOf(type) > -1) return true;
            return false;
        });
    } else {
        isImg = file.type.indexOf("image") > -1;
    }
    if (!isImg) {
        proxy?.$modal.msgError(
            `The file format is incorrect, please upload ${props.fileType.join("/")} image format file!`
        );
        return false;
    }
    if (props.fileSize) {
        const isLt = file.size / 1024 / 1024 < props.fileSize;
        if (!isLt) {
            proxy?.$modal.msgError(`The uploaded avatar image size cannot exceed ${props.fileSize} MB!`);
            return false;
        }
    }
    proxy?.$modal.loading("Uploading pictures, please wait...");
    number.value++;
}

// File count exceeded
const handleExceed = () => {
    proxy?.$modal.msgError(`The number of uploaded files cannot exceed ${props.limit}!`);
}

// upload success callback
const handleUploadSuccess = (res: any, file: UploadFile) => {
    if (res.code === 200) {
        uploadList.value.push({ name: res.data.fileName, url: res.data.url, ossId: res.data.ossId });
        uploadedSuccessfully();
    } else {
        number.value--;
        proxy?.$modal.closeLoading();
        proxy?.$modal.msgError(res.msg);
        imageUploadRef.value.handleRemove(file);
        uploadedSuccessfully();
    }
}

// delete picture
const handleDelete = (file: UploadFile): boolean => {
    const findex = fileList.value.map(f => f.name).indexOf(file.name);
    if (findex > -1 && uploadList.value.length === number.value) {
        let ossId = fileList.value[findex].ossId;
        delOss(ossId);
        fileList.value.splice(findex, 1);
        emit("update:modelValue", listToString(fileList.value));
        return false;
    }
    return true;
}

// Upload end processing
const uploadedSuccessfully = () => {
    if (number.value > 0 && uploadList.value.length === number.value) {
        fileList.value = fileList.value.filter(f => f.url !== undefined).concat(uploadList.value);
        uploadList.value = [];
        number.value = 0;
        emit("update:modelValue", listToString(fileList.value));
        proxy?.$modal.closeLoading();
    }
}

// upload failed
const handleUploadError = () => {
    proxy?.$modal.msgError("Failed to upload image");
    proxy?.$modal.closeLoading();
}

// preview
const handlePictureCardPreview = (file: any) => {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;
}

// The object is converted into a specified string delimited
const listToString = (list: any[], separator?: string) => {
    let strs = "";
    separator = separator || ",";
    for (let i in list) {
        if(undefined !== list[i].ossId && list[i].url.indexOf("blob:") !== 0) {
            strs += list[i].ossId + separator;
        }
    }
    return strs != "" ? strs.substring(0, strs.length - 1) : "";
}
</script>

<style scoped lang="scss">
// .el-upload--picture-card control plus part
:deep(.hide .el-upload--picture-card) {
    display: none;
}
</style>
