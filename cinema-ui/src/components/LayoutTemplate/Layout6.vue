<template>
  <div class="layout1">
    <div class="search-header">
      <div class="row-2">
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
    <div class="datagrid-body">
      <slot name="body"></slot>
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
        <slot name="right-footer"></slot>
      </div>
    </div>
    <slot name="dialog"></slot>
  </div>
</template>
<script setup name="Layout1" lang="ts">
import IrButton from '@/components/IrButton/index.vue';
const props = defineProps({
  queryParams: {
    type: Object,
    default: null,
  },
  total: {
    type: Number,
    default: 0
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
const emit = defineEmits(['onSearch', 'onReset', 'onPaging', 'update:queryParams']);
const mQueryParams = computed({
  get: () => props.queryParams,
  set: (val) => {
    emit('update:queryParams', val)
  }
});
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
.layout1 {
  background: $gray-100;
  height: calc(100vh - $base-header-height - 41px);
  padding: 24px;
  display: flex;
  flex-direction: column;

  .search-header {
    display: flex;
    padding: 12px 24px 12px 24px;
    border: 1px solid $gray-200;
    background: $gray-0;
    width: 100%;
    flex-direction: column;
    .row-2 {
      width: 100%;
      height: 54px;
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
  .datagrid-body {
    border: 1px solid $gray-200;
    background: $gray-0;
    flex: 1;
    width: 100%;
    overflow: auto;
    margin-top: 16px;
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
</style>
