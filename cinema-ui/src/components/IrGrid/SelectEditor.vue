<template>
  <div :class="'grid-editor-select-container' + (props.data[props.rowIndex].selected ? props.data[props.rowIndex].selected : '') + rowColorStyle">
    <el-select
      v-model="mData[props.rowIndex][props.prop]"
      popper-class="grid-editor"
      placeholder=""
      @change="handleSelectedChange"
      @clear="handleSelectedChange"
      filterable
      clearable
    >
      <template v-if="selectProps.dictData">
        <el-option v-for="dict in selectProps.dictData" :key="dict.dictCode" :label="dict.label" :value="dict.value" />
      </template>
      <template v-else-if="isStringName()">
        <el-option v-for="item in customDatasource" :key="item[selectProps.key]" :label="item[selectProps.label]" :value="item[selectProps.value]" />
      </template>
      <template v-else>
        <el-option
          v-for="item in selectProps.dataSource"
          :key="item[selectProps.key]"
          :label="item[selectProps.label]"
          :value="item[selectProps.value]"
        />
      </template>
    </el-select>
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
  selectProps: {
    type: Object,
    default: null
  },
  colorProp: {
    type: String,
    default: ''
  },
  colorDict: {
    type: Object,
    default: null
  }
});
const customDatasource = ref([]);
const emit = defineEmits(['update:data']);
const mData = computed({
  get: () => props.data,
  set: (val: any) => {
    emit('update:data', val)
  }
});
const rowColorStyle = computed(() => {
  if (!props.colorProp || !props.colorDict) {
    return '';
  }
  for (let i = 0; i < props.colorDict.length; i++) {
    if (props.data[props.rowIndex][props.colorProp] === props.colorDict[i].value) {
      return ' ' + props.colorDict[i].elTagType;
    }
  }
  return '';
});
const isStringName = () => {
  if ("string" === typeof props.selectProps.dataSource) {
    return true;
  }
  return false;
}
const handleSelectedChange = () => {
  if (props.selectProps.selectFunc) {
    if (props.selectProps.dictData && props.selectProps.dictData.length !== 0) {
      for (let i = 0; i < props.selectProps.dictData.length; i++) {
        if (mData.value[props.rowIndex][props.prop] === props.selectProps.dictData[i].value) {
          props.selectProps.selectFunc(props.rowIndex, props.selectProps.dictData[i]);
          return;
        }
      }
      props.selectProps.selectFunc(props.rowIndex, null);
      return;
    } else if (isStringName()) {
      for (let i = 0; i < customDatasource.value.length; i++) {
        if (mData.value[props.rowIndex][props.prop] === customDatasource.value[i][props.selectProps.value]) {
          props.selectProps.selectFunc(props.rowIndex, customDatasource.value[i]);
          return;
        }
      }
      props.selectProps.selectFunc(props.rowIndex, null);
      return;
    } else {
      for (let i = 0; i < props.selectProps.dataSource.length; i++) {
        if (mData.value[props.rowIndex][props.prop] === props.selectProps.dataSource[i][props.selectProps.value]) {
          props.selectProps.selectFunc(props.rowIndex, props.selectProps.dataSource[i]);
          return;
        }
      }
      props.selectProps.selectFunc(props.rowIndex, null);
      return;
    }
  }
}
watch(() => mData.value[props.rowIndex][props.prop], (v) => {
  if (isStringName()) {
    if (mData.value[props.rowIndex] && mData.value[props.rowIndex][props.selectProps.dataSource]) {
      customDatasource.value = mData.value[props.rowIndex][props.selectProps.dataSource];
    } else {
      customDatasource.value = [];
    }
  }
  if (props.selectProps.dictData && props.selectProps.dictData.length !== 0) {
    for (let i = 0; i < props.selectProps.dictData.length; i++) {
      if (mData.value[props.rowIndex][props.prop] === props.selectProps.dictData[i].value) {
        handleSelectedChange();
        return;
      }
    }
  } else if (isStringName()) {
    for (let i = 0; i < customDatasource.value.length; i++) {
      if (mData.value[props.rowIndex][props.prop] === customDatasource.value[i][props.selectProps.value]) {
        handleSelectedChange();
        return;
      }
    }
  } else {
    for (let i = 0; i < props.selectProps.dataSource.length; i++) {
      if (mData.value[props.rowIndex][props.prop] === props.selectProps.dataSource[i][props.selectProps.value]) {
        handleSelectedChange();
        return;
      }
    }
  }
  mData.value[props.rowIndex][props.prop] = '';
}, { immediate: true });
</script>
<style lang="scss">
@import "@/assets/styles/variables.module.scss";
.grid-editor-select-container .el-select.el-select--default .el-input__wrapper {
  border-radius: 0 !important;
}
.grid-editor-select-container.selected .el-select.el-select--default .el-input__wrapper {
  background-color: $blue-200;
}
.grid-editor-select-container {
  &.selected {
    background-color: $blue-200;
  }
  &.blue {
    background-color: $blue-50;
  }
  &.blue.selected {
    background-color: $blue-200;
  }
  &.gray {
    background-color: $gray-50;
  }
  &.gray.selected {
    background-color: $gray-200;
  }
  &.green {
    background-color: $green-50;
  }
  &.green.selected {
    background-color: $green-200;
  }
  &.red {
    background-color: $red-50;
  }
  &.red.selected {
    background-color: $red-200;
  }
  &.yellow {
    background-color: $yellow-50;
  }
  &.yellow.selected {
    background-color: $yellow-200;
  }
  &.violet {
    background-color: $violet-50;
  }
  &.violet.selected {
    background-color: $violet-200;
  }
  .el-select.el-select--default {
    height: 31px;
    min-height: 31px;
    padding: 0;
    .el-input.el-input--default {
      height: 31px;
    }
    .el-input__wrapper {
      height: 31px;
      min-height: 31px;
      border: none;
      box-shadow: none !important;
      &:hover {
        border: none;
      }
    }
  }
  .el-select.el-select--default .select-trigger .el-input.is-focus .el-input__wrapper {
    box-shadow: none !important;
    border: none;
  }
  .el-select.el-select--default .select-trigger .el-input .el-input__wrapper.is-focus {
    box-shadow: none !important;
    border: none;
  }
}
.el-popper.grid-editor {
  margin-top: -11px !important;
  .el-scrollbar__view {
    margin: 0 !important;
    .el-select-dropdown__item {
      height: 24px;
      padding: 4px 12px;
      line-height: 16px;
      span {
        color: $gray-700;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
    .el-select-dropdown__item.selected {
      background-color: $blue-50 !important;
      span {
        color: $blue-500;
      }
    }
    .el-select-dropdown__item.hover {
      background-color: $gray-100;
      &:active {
        background-color: $gray-200;
      }
    }
  }
}
</style>
