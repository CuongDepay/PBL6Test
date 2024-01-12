<template>
  <div class="grid-editor-container">
    <el-date-picker
      v-model="mData[rowIndex][prop]"
      :type="datePickerProps.pickerType"
      :valueFormat="datePickerProps.valueFormat"
      :format="datePickerProps.format"
      :placeholder="datePickerProps.placeholder"
      clearable
    />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  rowIndex: {
    type: Number,
    default: null
  },
  prop: {
    type: String,
    default: ''
  },
  data: {
    type: Object,
    default() {
      return {};
    }
  },
  datePickerProps: {
    type: Object,
    default() {
      return {};
    }
  }
});
const emit = defineEmits(['update:data']);
const mData = computed({
  get: () => props.data,
  set: (val) => {
    emit('update:data', val)
  }
});
</script>
<style lang="scss">
@import "@/assets/styles/variables.module.scss";
.grid-editor-container {
  width: 100%;
  height: 100%;
  padding: 0 8px;
  .el-input {
    width: 100%;
    height: 31px;
    .el-input__wrapper {
      padding: 6px 10px 6px 12px;
      background: unset;
      height: 31px;
      border-radius: 6px !important;
      border: none;
      &:hover {
        border: none;
      }
      &.is-focus {
        border: none;
        box-shadow: none !important;
      }
      .el-input__icon {
        margin-bottom: 3px;
      }
    }
  }
}
</style>
