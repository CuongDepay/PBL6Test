<template>
  <div class="layout3">
    <div class="search-header">
      <div class="row-1">
        <div>{{ getRouteTitle(route.meta.title) }}</div>
        <IrButton colorStyle="gray" type="primary" leftIcon="arrow-up" @onClick="toggleCollapse" :class="{'button-rotate':isCollapse}" />
      </div>
      <div class="row-2" :class="{'hidden':isCollapse}">
        <div class="search-input">
          <el-form :model="queryParamsLeft" ref="queryFormRef" class="form-search">
            <slot name="search-input"></slot>
          </el-form>
        </div>
        <div class="search-button">
          <IrButton colorStyle="blue" type="primary" leftIcon="search" @onClick="handleSearchEvent" />
          <IrButton colorStyle="gray" type="secondary" leftIcon="refresh" @onClick="handleResetEvent" />
        </div>
      </div>
    </div>

    <div class="layout3-body">
      <multipane class="vertical-panes">
        <div class="layout3-body-left">
          <div class="button-header" v-if="hasSlot('header-button-left')">
            <div class="custom-button">
              <slot name="header-button-left"></slot>
            </div>
          </div>
          <div class="datagrid-body">
            <IrGrid
              v-loading="loadingLeft"
              :rowData="rowDataLeft"
              :columnSetting="columnSettingLeft"
              :rowKey="rowKeyLeft"
              :checkboxCol="checkboxColLeft"
              :reRender="reRenderLeft"
              :rowDelete="rowDeleteLeft"
              @onSelectedChange="handleSelectedChangeLeft"
              @onSorting="handleSortLeft"
              @onSelectCell="handleSelectCellLeft"
              @spliceRowData="handleSpliceRowDataLeft"
            />
          </div>
          <div class="paging-footer" v-show="totalLeft > 0">
            <div>
              <pagination
                v-if="queryParamsLeft"
                v-show="totalLeft > 0"
                :total="totalLeft"
                v-model:page="mQueryParamsLeft.pageNum"
                v-model:limit="mQueryParamsLeft.pageSize"
                @pagination="handlePagingLeft"
              />
            </div>
            <div class="right-footer">
              <slot name="right-footer-left"></slot>
            </div>
          </div>
        </div>
        <multipane-resizer></multipane-resizer>
        <div class="layout3-body-right">
          <div class="button-header" v-if="hasSlot('header-button-right')">
            <div class="custom-button">
              <el-input-number
                v-if="rowTotalRight !== undefined && rowTotalRight !== null"
                v-model="mRowTotalRight"
                :min="0"
                :max="999"
                @change="handleRowTotalChangeRight"
              />
              <slot name="header-button-right"></slot>
            </div>
          </div>
          <div class="datagrid-body">
            <IrGrid
              ref="gridRight"
              v-loading="loadingRight"
              :rowData="rowDataRight"
              :columnSetting="columnSettingRight"
              :rowKey="rowKeyRight"
              :checkboxCol="checkboxColRight"
              :reRender="reRenderRight"
              :rowDelete="rowDeleteRight"
              @onSelectedChange="handleSelectedChangeRight"
              @onSorting="handleSortRight"
              @spliceRowData="handleSpliceRowDataRight"
            />
          </div>
          <div class="paging-footer" v-show="totalRight > 0">
            <div>
              <pagination
                v-if="queryParamsRight"
                v-show="totalRight > 0"
                :total="totalRight"
                v-model:page="mQueryParamsRight.pageNumRight"
                v-model:limit="mQueryParamsRight.pageSizeRight"
                @pagination="handlePagingRight"
              />
            </div>
            <div class="right-footer">
              <slot name="right-footer-right"></slot>
            </div>
          </div>
        </div>
      </multipane>
    </div>
    <slot name="dialog"></slot>
  </div>
</template>
<script setup name="Layout3" lang="ts">
import IrButton from '@/components/IrButton/index.vue';
import IrGrid from '@/components/IrGrid/index.vue';
import { getRouteTitle } from '@/utils/i18n';
const props = defineProps({
  queryParamsLeft: {
    type: Object,
    default: null,
  },
  queryParamsRight: {
    type: Object,
    default: null,
  },
  totalLeft: {
    type: Number,
    default: 0
  },
  totalRight: {
    type: Number,
    default: 0
  },
  rowDataLeft: {
    type: Array,
    default() {
      return [];
    },
  },
  rowDataRight: {
    type: Array,
    default() {
      return [];
    },
  },
  columnSettingLeft: {
    type: Array,
    default() {
      return [];
    },
  },
  columnSettingRight: {
    type: Array,
    default() {
      return [];
    },
  },
  rowKeyLeft: {
    type: String,
    default: 'unknow'
  },
  rowKeyRight: {
    type: String,
    default: 'unknow'
  },
  checkboxColLeft: {
    type: Boolean,
    default: false
  },
  checkboxColRight: {
    type: Boolean,
    default: false
  },
  loadingLeft: {
    type: Boolean,
    default: false
  },
  loadingRight: {
    type: Boolean,
    default: false
  },
  reRenderLeft: {
    type: Boolean,
    default: false
  },
  reRenderRight: {
    type: Boolean,
    default: false
  },
  rowDeleteRight: {
    type: Boolean,
    default: false
  },
  rowDeleteLeft: {
    type: Boolean,
    default: false
  },
  rowTotalLeft: {
    type: Number,
    default: null
  },
  rowTotalRight: {
    type: Number,
    default: null
  },
});
const gridRight = ref();
const slots = useSlots();
const queryFormRef = ref(ElForm);
const isCollapse = ref(false);
const route = useRoute();
const emit = defineEmits([
  'update:rowTotalLeft',
  'update:rowTotalRight',
  'update:rowDataLeft',
  'update:rowDataRight',
  'onSearchLeft',
  'onSearchRight',
  'onResetLeft',
  'onResetRight',
  'update:queryParamsLeft',
  'update:queryParamsRight',
  'onSelectedRowsLeft',
  'onSelectedRowsRight',
  'update:columnSettingRight',
  'update:columnSettingLeft',
  'onSelectCellLeft',
  'onPagingLeft',
  'onPagingRight'
]);
const mRowTotalLeft = computed({
  get: () => props.rowTotalLeft,
  set: (val) => {
    emit('update:rowTotalLeft', val)
  }
});
const mRowTotalRight = computed({
  get: () => props.rowTotalRight,
  set: (val) => {
    emit('update:rowTotalRight', val)
  }
});
const mRowDataLeft = computed({
  get: () => props.rowDataLeft,
  set: (val) => {
    emit('update:rowDataLeft', val)
  }
});
const mRowDataRight = computed({
  get: () => props.rowDataRight,
  set: (val) => {
    emit('update:rowDataRight', val)
  }
});
const mQueryParamsLeft = computed({
  get: () => props.queryParamsLeft,
  set: (val) => {
    emit('update:queryParamsLeft', val)
  }
});
const mQueryParamsRight = computed({
  get: () => props.queryParamsRight,
  set: (val) => {
    emit('update:queryParamsRight', val)
  }
});
// const mColumnSettingLeft = computed({
//   get: () => props.columnSettingLeft,
//   set: (val) => {
//     emit('update:columnSettingLeft', val)
//   }
// });
// const mColumnSettingRight = computed({
//   get: () => props.columnSettingRight,
//   set: (val) => {
//     emit('update:columnSettingRight', val)
//   }
// });
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
}
const handleSearchEvent = () => {
  emit('onSearchLeft');
  emit('onSearchRight');
}
const handleResetEvent = () => {
  queryFormRef.value.resetFields();
  emit('onResetLeft');
  emit('onResetRight');
}
const handleSelectedChangeLeft = (ids: any) => {
  emit('onSelectedRowsLeft', ids);
}
const handleSelectedChangeRight = (ids: any) => {
  emit('onSelectedRowsRight', ids);
}
const handleSortLeft = ({column, order}: any) => {
  if (order) {
    mQueryParamsLeft.value.orderByColumn = column;
    mQueryParamsLeft.value.isAsc = 'asc' === order ? 'ascending' : 'descending'
  } else {
    mQueryParamsLeft.value.isAsc = null;
  }
  emit('onSearchLeft');
}
const handleSortRight = ({column, order}: any) => {
  if (order) {
    mQueryParamsRight.value.orderByColumn = column;
    mQueryParamsRight.value.isAsc = 'asc' === order ? 'ascending' : 'descending'
  } else {
    mQueryParamsRight.value.isAsc = null;
  }
  emit('onSearchRight');
}
const handleSelectCellLeft = (modal: any) => {
  emit('onSelectCellLeft', modal);
}
const handlePagingLeft = () => {
  emit('onPagingLeft');
}
const handlePagingRight = () => {
  emit('onPagingRight');
}
const hasSlot = (name: any) => {
  return !!slots[name];
}
const handleSpliceRowDataRight = (rowIndex: number) => {
  mRowDataRight.value.splice(rowIndex, 1);
  let newRowData = <any>[];
  for (let i = 0; i < mRowDataRight.value.length; i++) {
    newRowData.push(mRowDataRight.value[i]);
  }
  mRowDataRight.value = newRowData;
  mRowTotalRight.value = mRowTotalRight.value - 1;
}
const handleSpliceRowDataLeft = async (rowIndex: number) => {
  mRowDataLeft.value.splice(rowIndex, 1);
  let newRowData = <any>[];
  for (let i = 0; i < mRowDataLeft.value.length; i++) {
    newRowData.push(mRowDataLeft.value[i]);
  }
  mRowDataLeft.value = newRowData;
  mRowTotalLeft.value = mRowTotalLeft.value - 1;
}
const handleRowTotalChangeRight = () => {
  nextTick(() => {
    const curLen = mRowDataRight.value.length;
    const gap = mRowTotalRight.value - curLen;
    if (gap > 0) {
      for (var i = 0; i < gap; i++) {
        setTimeout(function() {
          mRowDataRight.value = mRowDataRight.value.concat(new Array(1).fill({}));
        }, 1);
      }
    } else if (gap < 0) {
      mRowDataRight.value = mRowDataRight.value.splice(0, curLen + gap);
    }
  })
}
const validate = () => {
  return gridRight.value.validate();
}
// exposed
defineExpose({
  validate,
});
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.layout3 {
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

      .button-rotate {
        transform: rotate(180deg);
      }
    }
    .row-2 {
      width: 100%;
      height: 54px;
      margin-top: 7px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      overflow-x: auto;
      overflow-y: hidden;
      gap: 12px;
      &.hidden {
        display: none;
      }
      .search-input {
        display: flex;
        flex-direction: row;
        gap: 12px;
      }
      .search-button {
        display: flex;
        flex-direction: row;
        gap: 8px;
      }
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
    .common-button {
      display: flex;
      flex-direction: row;
    }
  }

  .layout3-body {
    flex: 1;
    width: 100%;
    gap: 1.5px;

    .layout3-body-left {
      min-width: 10%;
      width: 55%;
      padding-right: 1.5px;
      z-index: 9;
      display: flex;
      flex-direction: column;
      .datagrid-body {
        border: 1px solid $gray-200;
        background: $gray-0;
        width: 100%;
        overflow: auto;
        flex: 1;
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

    .multipane-resizer {
      width: 16px;
      height: 32px;
      background: rgba(31, 42, 55, 0.15);
      background-image: url("../../assets/icons/svg/drawer.svg");
      z-index: 99;
      left: 5px;
      top: 48%;
    }

    .layout3-body-right {
      flex: 1;
      min-width: 40%;
      padding-left: 1.5px;
      z-index: 9;
      display: flex;
      flex-direction: column;
      .datagrid-body {
        border: 1px solid $gray-200;
        background: $gray-0;
        width: 100%;
        overflow: auto;
        flex: 1;
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

.vertical-panes {
  width: 100%;
  height: 100%;
}

.vertical-panes > .pane {
  overflow: hidden;
}

.vertical-panes > .pane ~ .pane {
}
</style>
