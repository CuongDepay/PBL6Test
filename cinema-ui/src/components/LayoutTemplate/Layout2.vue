<template>
  <div class="layout2">
    <div class="layout2-left">
      <div class="layout2-left-content">
        <slot name="left-panel"></slot>
      </div>
    </div>
    <div class="layout2-right">
      <div class="search-header">
        <div class="row-1">
          <div>{{ getRouteTitle(route.meta.title) }}</div>
          <IrButton colorStyle="gray" type="primary" leftIcon="arrow-up" @onClick="toggleCollapse" :class="{'button-rotate':isCollapse}" />
        </div>
        <div class="row-2" :class="{'hidden':isCollapse}">
          <div class="search-input">
            <el-form :model="queryParams" ref="queryFormRef" class="form-search">
              <slot name="search-input"></slot>
            </el-form>
          </div>
          <div class="search-button">
            <IrButton colorStyle="blue" type="primary" leftIcon="search" @onClick="handleSearchEvent" />
            <IrButton colorStyle="gray" type="secondary" leftIcon="refresh" @onClick="handleResetEvent" />
          </div>
        </div>
      </div>
      <div class="button-header">
        <div class="custom-button">
          <slot name="header-button"></slot>
        </div>
        <div class="common-button">
          <IrButton colorStyle="gray" type="secondary" leftIcon="refresh" @onClick="handleRefreshEvent" customClass="first" />
          <IrButton colorStyle="gray" type="secondary" leftIcon="grid" rightIcon="arrow-down" ref="buttonRef" customClass="last" />
          <el-popover
            ref="popoverRef"
            :virtual-ref="buttonRef"
            trigger="click"
            placement="bottom-start"
            popper-class="popper-column-setting"
            virtual-triggering
          >
            <div class="column-setting-container">
              <template v-for="(item) in mColumnSetting" :key="item[rowKey]">
                <div class="column-item" v-if="!item.pin">
                  <el-checkbox v-model="item.show">
                    <span class="column-name">{{ item.name }}</span>
                  </el-checkbox>
                </div>
              </template>
            </div>
          </el-popover>
        </div>
      </div>
      <div class="datagrid-body">
        <IrGrid
          v-loading="loading"
          :rowData="rowData"
          :columnSetting="columnSetting"
          :rowKey="rowKey"
          :checkboxCol="checkboxCol"
          :reRender="reRender"
          @onSelectedChange="handleSelectedChange"
          @onSorting="handleSort"
        />
      </div>
      <div class="paging-footer" v-show="total > 0">
        <pagination
          v-show="total > 0"
          :total="total"
          v-model:page="mQueryParams.pageNum"
          v-model:limit="mQueryParams.pageSize"
          @pagination="handlePaging"
        />
      </div>
    </div>
    <slot name="dialog"></slot>
  </div>
</template>
<script setup name="Layout2" lang="ts">
import IrButton from '@/components/IrButton/index.vue';
import IrGrid from '@/components/IrGrid/index.vue';
import { getRouteTitle } from '@/utils/i18n';
const props = defineProps({
  queryParams: {
    type: Object,
    default: null,
  },
  total: {
    type: Number,
    default: 0
  },
  rowData: {
    type: Array,
    default() {
      return [];
    },
  },
  columnSetting: {
    type: Array<any>,
    default() {
      return [];
    },
  },
  rowKey: {
    type: String,
    default: 'unknow'
  },
  checkboxCol: {
    type: Boolean,
    default: false
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
const buttonRef = ref();
const popoverRef = ref();
const queryFormRef = ref(ElForm);
const isCollapse = ref(false);
const route = useRoute();
const emit = defineEmits(['onSearch', 'onReset', 'onPaging', 'update:queryParams', 'onSelectedRows', 'update:columnSetting']);
const mQueryParams = computed({
  get: () => props.queryParams,
  set: (val) => {
    emit('update:queryParams', val)
  }
});
const mColumnSetting = computed({
  get: () => props.columnSetting,
  set: (val) => {
    emit('update:columnSetting', val)
  }
});
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
}
const handleRefreshEvent = () => {
  emit('onSearch');
}
const handleSearchEvent = () => {
  emit('onSearch');
}
const handleResetEvent = () => {
  queryFormRef.value.resetFields();
  emit('onReset');
}
const handleSelectedChange = (ids: any) => {
  emit('onSelectedRows', ids);
}
const handleSort = ({column, order}: any) => {
  if (order) {
    mQueryParams.value.orderByColumn = column;
    mQueryParams.value.isAsc = 'asc' === order ? 'ascending' : 'descending'
  } else {
    mQueryParams.value.isAsc = null;
  }
  emit('onSearch');
}
const handlePaging = () => {
  emit('onPaging');
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.layout2 {
  background: $gray-100;
  display: flex;
  flex-direction: row;
  gap: 24px;
}
.layout2-left {
  padding: 24px 0 24px 24px;
  display: flex;
  flex-direction: column;
  width: 320px;
  height: calc(100vh - $base-header-height - 41px);
  .layout2-left-content {
    overflow: auto;
    width: 100%;
    padding: 24px;
    background: $gray-0;
    border: 1px solid $gray-200;
    box-shadow: 2px 0px 10px -2px rgba(17, 25, 39, 0.04), 0px 2px 10px 2px rgba(17, 25, 39, 0.04);
  }
}
.layout2-right {
  height: calc(100vh - $base-header-height - 41px);
  padding: 24px 24px 24px 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;

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
@media (max-width:900px) {
  .layout2 {
    .layout2-left {
      display: none;
    }
    .layout2-right {
      padding: 24px;
    }
  }
}
</style>
