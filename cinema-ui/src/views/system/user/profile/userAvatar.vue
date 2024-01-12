<template>
  <div class="user-info-head" @click="editCropper()">
    <img :src="options.img as string" title="Click to upload avatar" class="img-circle img-lg" />
    <IrDialog :dialog="dialog">
      <template v-slot:body>
        <el-form class="common-form">
          <el-row>
            <el-col :xs="24" :md="12" :style="{ height: '350px' }">
              <vue-cropper
                ref="cropper"
                :img="options.img"
                :info="true"
                :autoCrop="options.autoCrop"
                :autoCropWidth="options.autoCropWidth"
                :autoCropHeight="options.autoCropHeight"
                :fixedBox="options.fixedBox"
                :outputType="options.outputType"
                @realTime="realTime"
                v-if="visible"
              />
            </el-col>
            <el-col :xs="24" :md="12" :style="{ height: '350px' }">
              <div class="avatar-upload-preview">
                <img :src="options.previews.url" :style="options.previews.img" />
              </div>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template v-slot:footer>
        <el-upload action="#" :http-request="requestUpload" :show-file-list="false" :before-upload="beforeUpload">
          <IrButton colorStyle="gray" type="secondary" leftIcon="upload" :title="$t('profile.userAvatar.chooseBtn')" :width="100" />
        </el-upload>
        <IrButton colorStyle="gray" type="secondary" leftIcon="plus" :toolTip="$t('profile.userAvatar.zoomIn')" @onClick="changeScale(1)" />
        <IrButton colorStyle="gray" type="secondary" leftIcon="minus" :toolTip="$t('profile.userAvatar.zoomOut')" @onClick="changeScale(-1)" />
        <IrButton colorStyle="gray" type="secondary" leftIcon="rotate-left" :toolTip="$t('profile.userAvatar.rotateLeft')" @onClick="rotateLeft" />
        <IrButton colorStyle="gray" type="secondary" leftIcon="rotate-right" :toolTip="$t('profile.userAvatar.rotateRight')" @onClick="rotateRight" />
        <IrButton colorStyle="blue" type="primary" :title="$t('profile.userAvatar.saveBtn')" :width="100" @onClick="uploadImg" />
      </template>
    </IrDialog>
  </div>
</template>

<script setup lang="ts">
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";
import { uploadAvatar } from "@/api/system/user";
import useUserStore from "@/store/modules/user";
import i18n from "@/lang";
import { ComponentInternalInstance } from "vue";

interface Options {
  img: string | ArrayBuffer | null // The address of the cropped image
  autoCrop: boolean // Whether to generate a screenshot box by default
  autoCropWidth: number // Generate screenshot frame width by default
  autoCropHeight: number // Generate screenshot frame height by default
  fixedBox: boolean // Fixed screenshot frame size not allowed to change
  fileName: string
  previews: any // preview data
  outputType: string
  visible: boolean
}

const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '800px'
});

const userStore = useUserStore();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

// const open = ref(false);
const visible = ref(false);
// const title = ref("Edit avatar");

const cropper = ref<any>({});
// Image cropping data
const options = reactive<Options>({
  img: userStore.avatar,
  autoCrop: true,
  autoCropWidth: 200,
  autoCropHeight: 200,
  fixedBox: true,
  outputType: "png",
  fileName: '',
  previews: {},
  visible: false
});

/** edit avatar */
const editCropper = () => {
  // open.value = true;
  dialog.title = i18n.global.t('profile.userAvatar.dialogTt');
  dialog.visible = true;
  visible.value = true;
}
/** Callback when opening the popup layer ends */
const modalOpened = () => {
  visible.value = true;
}
/** Override default upload behavior */
const requestUpload = (): any => {}
/** rotate to the left */
const rotateLeft = () => {
  cropper.value.rotateLeft();
}
/** rotate right */
const rotateRight = () => {
  cropper.value.rotateRight();
}
/** image zoom */
const changeScale = (num: number) => {
  num = num || 1;
  cropper.value.changeScale(num);
}
/** upload preprocessing */
const beforeUpload = (file: any) => {
  if (file.type.indexOf("image/") == -1) {
    proxy?.$modal.msgError(i18n.global.t('profile.userAvatar.uploadErr'));
  } else {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      options.img = reader.result;
      options.fileName = file.name;
    };
  }
}
/** upload image */
const uploadImg = async () => {
  cropper.value.getCropBlob(async (data: any) => {
    let formData = new FormData();
    formData.append("avatarfile", data, options.fileName);
    const res = await uploadAvatar(formData);
    // open.value = false;
    dialog.visible = false;
    options.img = res.data.imgUrl;
    userStore.avatar = options.img as string;
    proxy?.$modal.msgSuccess(i18n.global.t('profile.userAvatar.editSuccess'));
    visible.value = false;
  });
}
/** live preview */
const realTime = (data: any) => {
  options.previews = data;
}
/** close the window */
const closeDialog = () => {
  options.img = userStore.avatar;
  options.visible = false;
}
</script>

<style lang="scss" scoped>
.user-info-head {
  position: relative;
  display: inline-block;
  height: 120px;
}

.user-info-head:hover:after {
  content: "+";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #eee;
  background: rgba(0, 0, 0, 0.5);
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  line-height: 110px;
  border-radius: 50%;
  text-align: center;
}
</style>
