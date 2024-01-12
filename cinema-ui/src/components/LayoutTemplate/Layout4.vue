<template>
  <div class="layout4">
    <div class="search-header">
      <div class="row-1">
        <div>{{ getRouteTitle(route.meta.title) }}</div>
      </div>
    </div>
    <div class="button-header">
      <div class="custom-button">
        <el-input-number v-if="mRowTotal != undefined && mRowTotal != null" v-model="mRowTotal" :min="0" :max="999" @change="handleRowTotalChange" />
        <slot name="header-left"></slot>
      </div>
      <div class="custom-button2">
        <slot name="header-right"></slot>
      </div>
    </div>
    <div class="datagrid-body">
      <IrGrid
        ref="grid"
        v-loading="loading"
        :reRender="reRender"
        :rowData="rowData"
        :columnSetting="columnSetting"
        :rowKey="rowKey"
        :checkboxCol="false"
        :rowDelete="true"
        @spliceRowData="handleSpliceRowData"
      />
    </div>
    <div class="paging-footer">
      <div></div>
      <div class="right-footer">
        <slot name="right-footer"></slot>
      </div>
    </div>
    <slot name="dialog"></slot>
  </div>
</template>
<script setup name="Layout4" lang="ts">
// IMPORT COMPONENT
import IrGrid from '@/components/IrGrid/index.vue';
import { getRouteTitle } from '@/utils/i18n';
const props = defineProps({
  rowData: {
    type: Array,
    default() {
      return [];
    },
  },
  columnSetting: {
    type: Array,
    default() {
      return [];
    },
  },
  rowKey: {
    type: String,
    default: 'unknown'
  },
  rowTotal: {
    type: Number,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  reRender: {
    type: Boolean,
    default: false
  }
});
const grid = ref();
const route = useRoute();
const emit = defineEmits(['update:rowTotal', 'update:rowData']);
const mRowTotal = computed({
  get: () => props.rowTotal,
  set: (val) => {
    emit('update:rowTotal', val)
  }
});
const mRowData = computed({
  get: () => props.rowData,
  set: (val) => {
    emit('update:rowData', val)
  }
});
const handleRowTotalChange = () => {
  nextTick(() => {
    const curLen = mRowData.value.length;
    const gap = mRowTotal.value - curLen;
    if (gap > 0) {
      for (var i = 0; i < gap; i++) {
        setTimeout(function() {
          mRowData.value = mRowData.value.concat(new Array(1).fill({}));
        }, 1);
      }
    } else if (gap < 0) {
      mRowData.value = mRowData.value.splice(0, curLen + gap);
    }
  })
}
const handleSpliceRowData = async (rowIndex: number) => {
  mRowData.value.splice(rowIndex, 1);
  let newRowData = <any>[];
  for (let i = 0; i < mRowData.value.length; i++) {
    newRowData.push(mRowData.value[i]);
  }
  mRowData.value = newRowData;
  mRowTotal.value = mRowTotal.value - 1;
}
const validate = () => {
  return grid.value.validate();
}
// exposed
defineExpose({
  validate,
});
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.layout4 {
  background: $gray-100;
  height: calc(100vh - $base-header-height - 41px);
  padding: 24px;
  display: flex;
  flex-direction: column;

  .search-header {
    display: flex;
    padding: 12px 24px 10px 24px;
    border: 1px solid $gray-200;
    background: $gray-0;
    width: 100%;
    flex-direction: column;

    .row-1 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 32px;
      overflow: hidden;
      color: $gray-700;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
      padding: 0;
      width: 100%;
    }
  }
  .button-header {
    width: 100%;
    height: 64px;
    padding: 16px 24px;
    border: 1px solid $gray-200;
    background: $gray-0;
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-content: space-between;
    align-items: center;
    overflow-y: hidden;
    overflow-x: auto;
    .custom-button {
      display: flex;
      flex-direction: row;
      gap: 8px;
      padding: 0;
    }
    .custom-button2 {
      display: flex;
      flex-direction: row;
      gap: 8px;
      padding: 0;
    }
  }
  .datagrid-body {
    border: 1px solid $gray-200;
    background: $gray-0;
    flex: 1;
    width: 100%;
    overflow: auto;
  }
  .paging-footer {
    width: 100%;
    height: 48px;
    padding: 8px 24px;
    border: 1px solid $gray-200;
    background: $gray-0;
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-content: space-between;
    align-items: center;
    overflow-y: hidden;
    overflow-x: auto;

    .right-footer {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
  }
}
.column-setting-container {
  max-width: 300px;
  min-height: 100px;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 8px 0;
  // gap: 16px;
  .column-item {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    &:hover {
      background: $gray-100;
    }
    .el-checkbox.el-checkbox--default {
      width: 100%;
    }
  }
}
.hidden {
  display: none !important;
}
</style>
