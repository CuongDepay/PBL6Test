<template>
  <el-dialog
    class="ir-dialog"
    :showClose="false"
    :fullscreen="fullScreen"
    v-model="mDialog.visible"
    :width="dialog.width"
    append-to-body
    draggable
    destroy-on-close
    @closed="close"
  >
    <template #header>
      <div class="header-left">
        <div class="header-title">
          {{ dialog.title }}
        </div>
      </div>
      <div class="header-right">
        <IrButton
          leftIcon="full-screen"
          type="dialog"
          colorStyle="gray"
          @onClick="fullScreen = !fullScreen"
          v-if="dialog.fullscreen !== undefined ? dialog.fullscreen : true"
        />
        <IrButton leftIcon="close" type="dialog" colorStyle="gray" @onClick="mDialog.visible = !mDialog.visible" />
      </div>
    </template>
    <slot name="body"></slot>
    <template #footer v-if="dialog.footer !== undefined ? dialog.footer : true">
      <div class="dialog-footer-left"></div>
      <div class="dialog-footer-right">
        <slot name="footer"></slot>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
const fullScreen = ref(false);
const props = defineProps({
  dialog: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(['update:dialog']);
const mDialog = computed({
  get: () => props.dialog,
  set: (val) => {
    emit('update:dialog', val)
  }
});

const close = () => {
  fullScreen.value = false;
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.el-dialog.ir-dialog {
  .el-dialog__header {
    .header-left {
      display: flex;
      flex-direction: row;
      height: 100%;
      .header-title {
        color: $gray-700;
        font-family: Roboto;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
        display: flex;
        align-items: center;
      }
    }
    .header-right {
      display: flex;
      flex-direction: row;
      height: 100%;
      gap: 2px;
    }
  }
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__footer {
    .dialog-footer-right {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }
  }
}
</style>
