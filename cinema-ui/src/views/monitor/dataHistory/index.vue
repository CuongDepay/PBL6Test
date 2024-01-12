<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="dataHistoryList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('dataHistory.searchInput.usernameLb')" prop="username" class="form-item-search">
        <el-input
          v-model="queryParams.username"
          :placeholder="$t('dataHistory.searchInput.usernamePh')"
          style="width: 120px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('dataHistory.searchInput.tableNameLb')" prop="tableName" class="form-item-search">
        <el-select
          v-model="queryParams.tableName"
          :placeholder="$t('dataHistory.searchInput.tableNamePh')"
          @change="handleQuery"
          clearable
          style="width: 140px"
        >
          <el-option v-for="dict in sys_data_history_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('dataHistory.searchInput.systemTypeLb')" prop="systemType" class="form-item-search">
        <el-select
          v-model="queryParams.systemType"
          :placeholder="$t('dataHistory.searchInput.systemTypePh')"
          @change="handleQuery"
          clearable
          style="width: 150px"
        >
          <el-option v-for="dict in sys_system_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('dataHistory.searchInput.createTimeLb')" style="width: 370px;" class="form-item-search">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          format="DD/MM/YYYY HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('dataHistory.searchInput.createTimeStartPh')"
          :end-placeholder="$t('dataHistory.searchInput.createTimeEndPh')"
          @change="handleQuery"
        />
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('dataHistory.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['system:dataHistory:remove']"
        @onClick="handleDelete"
      />
      <IrButton
        colorStyle="green"
        type="secondary"
        :title="$t('dataHistory.headerButton.exportTt')"
        leftIcon="download"
        v-hasPermi="['system:dataHistory:export']"
        @onClick="handleExport"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Detail DataHistory Dialog -->
          <el-form ref="dataHistoryFormRef" :model="form" label-width="150px" class="common-form">
            <el-form-item :label="$t('dataHistory.dialog.createTimeLb')" prop="createTime" class="form-item-row">
              {{ parseTime(form.createTime) }}
            </el-form-item>
            <el-form-item :label="$t('dataHistory.dialog.histTypeLb')" prop="histType" class="form-item-row">
              {{ form.histType }}
            </el-form-item>
            <el-form-item :label="$t('dataHistory.dialog.tableNameLb')" prop="tableName" class="form-item-row">
              {{ form.tableName }}
            </el-form-item>
            <el-form-item :label="$t('dataHistory.dialog.systemTypeLb')" prop="systemType" class="form-item-row">
              {{ getSystemLabel(form.systemType) }}
            </el-form-item>
            <el-form-item :label="$t('dataHistory.dialog.dataFieldLb')" prop="dataField" class="form-item-row">
              {{ form.dataField }}
            </el-form-item>
            <el-form-item :label="$t('dataHistory.dialog.oldValueLb')" prop="oldValue" class="form-item-row">
              {{ form.oldValue }}
            </el-form-item>
            <el-form-item :label="$t('dataHistory.dialog.newValueLb')" prop="newValue" class="form-item-row">
              {{ form.newValue }}
            </el-form-item>
            <el-form-item :label="$t('dataHistory.dialog.usernameLb')" prop="username" class="form-item-row">
              {{ form.username }}
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('dataHistory.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>
<script setup name="DataHistory" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listDataHistory, delDataHistory, getDataHistory } from "@/api/monitor/dataHistory";
// IMPORT TYPE
import { DataHistoryForm, DataHistoryQuery, DataHistoryVO } from "@/api/monitor/dataHistory/types";
import { DateModelType, ElForm } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { sys_data_history_type, sys_system_type } = toRefs<any>(proxy?.useDict("sys_data_history_type", "sys_system_type"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const dateRange = ref<[DateModelType, DateModelType]>(['', ''])
const loading = ref(true);
const dataHistoryList = ref<DataHistoryVO[]>([]);
const ids = ref<Array<number | string>>([]);
const total = ref(0);
const rowKey = ref('id');
const dataHistoryFormRef = ref(ElForm);
const initFormData: DataHistoryForm = {
  newValue: undefined,
  oldValue: undefined,
  dataField: undefined,
  histType: undefined,
  tableName: undefined,
  systemType: undefined,
  username: undefined,
  createTime: undefined
}
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "id", name: 'dataHistory.columns.idLb', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "refId", name: 'dataHistory.columns.refIdLb', sortable: true, size: 150, show: false, readonly: true },
  { prop: "createTime", name: 'dataHistory.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "histType", name: 'dataHistory.columns.histTypeLb', sortable: true, size: 120, show: true, readonly: true },
  { prop: "tableName", name: 'dataHistory.columns.tableNameLb', sortable: true, size: 150, show: false, readonly: true, align: 'left', dictData: sys_data_history_type },
  { prop: "systemType", name: 'dataHistory.columns.systemTypeLb', sortable: true, size: 150, show: false, readonly: true, dictData: sys_system_type },
  { prop: "dataField", name: 'dataHistory.columns.dataFieldLb', sortable: true, size: 130, show: true, readonly: true, align: 'left' },
  { prop: "oldValue", name: 'dataHistory.columns.oldValueLb', sortable: true, size: 200, show: true, readonly: true, align: 'left',
    click:  (rowIndex: number) => { openDetail(dataHistoryList.value[rowIndex]) }
  },
  { prop: "newValue", name: 'dataHistory.columns.newValueLb', sortable: true, size: 200, show: true, readonly: true, align: 'left',
    click:  (rowIndex: number) => { openDetail(dataHistoryList.value[rowIndex]) }
  },
  { prop: "username", name: 'dataHistory.columns.usernameLb', sortable: true, size: 250, show: true, readonly: true, align: 'left' },
  { prop: "operate", name: 'dataHistory.columns.operateLb', size: 100, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 2, icon: 'delete', title: 'dataHistory.columns.operateDeleteLb', color: 'red', permissionKey: 'system:dataHistory:remove',
        click: (rowIndex: number) => { handleDelete(dataHistoryList.value[rowIndex]); }
      }
    ]
  }
]);
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '700px'
});
// eslint-disable-next-line no-undef
const data = reactive<PageData<DataHistoryForm, DataHistoryQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    username: undefined,
    tableName: undefined,
    systemType: undefined,
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {}
});
// eslint-disable-next-line no-undef
const { queryParams, form } = toRefs<PageData<DataHistoryForm, DataHistoryQuery>>(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query System data history list */
const getList = async () => {
  loading.value = true;
  const res = await listDataHistory(proxy?.addDateRange(queryParams.value, dateRange.value));
  dataHistoryList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}
/** Search button action */
const handleQuery = () => {
  queryParams.value.pageNum = 1
  getList()
}
/** Reset button action */
const resetQuery = () => {
  dateRange.value = ['', '']
  queryParams.value.pageNum = 1;
  handleQuery();
}
/** Edit button action */
const openDetail = (row?: DataHistoryVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('dataHistory.dialog.detailTt');
  nextTick(async () => {
    reset();
    const _id = row?.id || ids.value[0]
    const res = await getDataHistory(_id);
    Object.assign(form.value, res.data);
  })
}
/** Delete button action */
const handleDelete = async (row?: DataHistoryVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('dataHistory.operationMsg.deleteCf', { id: (row ? ' "' + row?.id + '"' : '') })).finally(() => loading.value = false);
  await delDataHistory(_ids);
  proxy?.$modal.msgSuccess(i18n.global.t('dataHistory.operationMsg.deleteSuccess'));
  await getList();
}
/** Export button action */
const handleExport = () => {
  proxy?.download('monitor/dataHistory/export', {
    ...queryParams.value
  }, `data_history_${new Date().getTime()}.xlsx`);
}
/** Cancel button */
const cancel = () => {
  reset();
  dialog.visible = false;
}
/** Form reset */
const reset = () => {
  form.value = {...initFormData};
  dataHistoryFormRef.value.resetFields();
}
/** */
const getSystemLabel = (systemType: string | undefined) => {
  for (let i = 0; i < sys_system_type.value.length; i++) {
    if (sys_system_type.value[i].value === systemType) {
      return sys_system_type.value[i].label;
    }
  }
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
});
</script>
