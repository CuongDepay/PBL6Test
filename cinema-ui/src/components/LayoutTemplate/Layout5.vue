<template>
  <div class="layout5" :class="dialog ? 'dialog' : ''">
    <div class="search-header">
      <div class="row-1" v-if="dialog === false">
        <div>{{ getRouteTitle(route.meta.title) }}</div>
        <IrButton colorStyle="gray" type="primary" leftIcon="arrow-up" @onClick="toggleCollapse" :class="{'button-rotate':isCollapse}" />
      </div>
      <div class="row-2" :class="{'hidden':isCollapse}">
        <div class="search-input">
          <el-form :model="queryParams" ref="queryFormRef" class="form-search">
            <slot name="search-input"></slot>
          </el-form>
        </div>
        <div class="search-button" v-if="readonly === false">
          <IrButton colorStyle="blue" type="primary" leftIcon="search" @onClick="handleSearchEvent" />
          <IrButton colorStyle="gray" type="secondary" leftIcon="refresh" @onClick="handleResetEvent" />
        </div>
      </div>
    </div>
    <div class="button-header" v-if="readonly === false && dialog === false && buttonHeader === true">
      <div class="custom-button">
        <slot name="header-button"></slot>
      </div>
    </div>
    <div class="datagrid-body">
      <slot name="datagrid" />
    </div>
    <div class="paging-footer" v-show="total > 0">
      <div>
        <pagination
          v-if="queryParams"
          v-show="total > 0"
          :total="total"
          v-model:page="mQueryParams.pageNum"
          v-model:limit="mQueryParams.pageSize"
          @pagination="handlePaging"
        />
      </div>
      <div class="right-footer">
        <slot name="right-footer" />
      </div>
    </div>
    <slot name="dialog"></slot>
  </div>
</template>
<script setup name="Layout5" lang="ts">
import IrButton from '@/components/IrButton/index.vue';
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
  loading: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  dialog: {
    type: Boolean,
    default: false
  },
  buttonHeader: {
    type: Boolean,
    default: true
  }
});
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
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
}
// const handleRefreshEvent = () => {
//   emit('onSearch');
// }
const handleSearchEvent = () => {
  emit('onSearch');
}
const handleResetEvent = () => {
  queryFormRef.value.resetFields();
  emit('onReset');
}
const handlePaging = () => {
  emit('onPaging');
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.el-dialog.is-fullscreen {
  .layout5.dialog {
    height: calc(100vh - 116px);
  }
}
.layout5 {
  background: $gray-100;
  height: calc(100vh - $base-header-height - 41px);
  padding: 24px;
  display: flex;
  flex-direction: column;
  &.dialog {
    height: calc(90vh - 111px);
  }

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
</style>
