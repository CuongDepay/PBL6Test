<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="operlogList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('operlog.searchInput.titleLb')" prop="title" class="form-item-search">
        <el-input
          v-model="queryParams.title"
          :placeholder="$t('operlog.searchInput.titlePh')"
          clearable
          style="width: 160px;"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('operlog.searchInput.operNameLb')" prop="operName" class="form-item-search">
        <el-input
          v-model="queryParams.operName"
          :placeholder="$t('operlog.searchInput.operNamePh')"
          clearable
          style="width: 140px;"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('operlog.searchInput.systemTypeLb')" prop="systemType" class="form-item-search">
        <el-select
          v-model="queryParams.systemType"
          :placeholder="$t('operlog.searchInput.systemTypePh')"
          @change="handleQuery"
          clearable
          style="width: 150px"
        >
          <el-option v-for="dict in sys_system_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operlog.searchInput.businessTypeLb')" prop="businessType" class="form-item-search">
        <el-select
          v-model="queryParams.businessType"
          :placeholder="$t('operlog.searchInput.businessTypePh')"
          clearable
          style="width: 150px"
          @change="handleQuery"
        >
          <el-option v-for="dict in sys_oper_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operlog.searchInput.statusLb')" prop="status" class="form-item-search">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('operlog.searchInput.statusPh')"
          clearable
          style="width: 160px"
          @change="handleQuery"
        >
          <el-option v-for="dict in sys_common_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operlog.searchInput.operTimeLb')" style="width: 370px" class="form-item-search">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          format="DD/MM/YYYY HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operlog.searchInput.operTimeStartPh')"
          :end-placeholder="$t('operlog.searchInput.operTimeEndPh')"
          @change="handleQuery"
        />
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('operlog.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['monitor:operlog:remove']"
        @onClick="handleDelete"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('operlog.headerButton.clearTt')"
        leftIcon="delete"
        v-hasPermi="['monitor:operlog:remove']"
        @onClick="handleClean"
      />
      <IrButton
        colorStyle="green"
        type="secondary"
        :title="$t('operlog.headerButton.exportTt')"
        leftIcon="download"
        v-hasPermi="['monitor:operlog:export']"
        @onClick="handleExport"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Detail operation log -->
          <el-form :model="form" label-width="150px" class="common-form">
            <el-form-item :label="$t('operlog.dialog.titleTt')" class="form-item-row">
              {{ getSystemLabel(form.systemType) }} / {{ form.title }} / {{ typeFormat(form) }}
            </el-form-item>
            <el-form-item :label="$t('operlog.dialog.operUrlPh')" class="form-item-row">{{ form.operUrl }}</el-form-item>
            <el-form-item :label="$t('operlog.dialog.operInfoTt')" class="form-item-row">
              {{ form.operName }} / {{ form.operIp }} / {{ form.operLocation }}
            </el-form-item>
            <el-form-item :label="$t('operlog.dialog.requestMethodPh')" class="form-item-row">{{ form.requestMethod }}</el-form-item>
            <el-form-item :label="$t('operlog.dialog.methodTt')" class="form-item-row">{{ form.method }}</el-form-item>
            <el-form-item :label="$t('operlog.dialog.operParamPh')" class="form-item-row">
              <vue-json-pretty :data="JSON.parse(form.operParam)" />
            </el-form-item>
            <el-form-item :label="$t('operlog.dialog.jsonResultTt')" class="form-item-row">
              <vue-json-pretty :data="JSON.parse(form.jsonResult)" />
            </el-form-item>
            <el-form-item :label="$t('operlog.dialog.statusTt')" class="form-item-row">
              <div v-if="form.status === 0">Normal</div>
              <div v-else-if="form.status === 1">Fail</div>
            </el-form-item>
            <el-form-item :label="$t('operlog.dialog.costTimeTt')" class="form-item-row">{{ form.costTime }} millisecond(s)</el-form-item>
            <el-form-item :label="$t('operlog.dialog.operTimeTt')" class="form-item-row">{{ parseTime(form.operTime) }}</el-form-item>
            <el-form-item :label="$t('operlog.dialog.errorMsgTt')" v-if="form.status === 1" class="form-item-row">{{ form.errorMsg }}</el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('operlog.dialog.footerCancelTt')" :width="100" @onClick="dialog.visible = false" />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="Operlog" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
// IMPORT API
import { list, delOperlog, cleanOperlog } from '@/api/monitor/operlog';
// IMPORT TYPE
import { OperLogForm, OperLogQuery, OperLogVO } from '@/api/monitor/operlog/types';
import { DateModelType } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { sys_oper_type, sys_common_status, sys_system_type } = toRefs<any>(proxy?.useDict("sys_oper_type","sys_common_status","sys_system_type"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const operlogList = ref<OperLogVO[]>([]);
const loading = ref(true);
const ids = ref<Array<number | string>>([]);
const total = ref(0);
const rowKey = ref('operId');
const dateRange = ref<[DateModelType, DateModelType]>(['', '']);
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "operId", name: 'operlog.columns.operIdLb', sortable: true, size: 200, show: false, readonly: true, },
  { prop: "title", name: 'operlog.columns.titleLb', sortable: true, size: 200, show: true, readonly: true, align: 'left' },
  { prop: "businessType", name: 'operlog.columns.businessTypeLb', sortable: true, size: 150, show: true, readonly: true, dictData: sys_oper_type },
  { prop: "operName", name: 'operlog.columns.operNameLb', sortable: true, size: 130, show: true, readonly: true, align: 'left' },
  { prop: "operIp", name: 'operlog.columns.operIpLb', sortable: true, size: 120, show: true, readonly: true },
  { prop: "systemType", name: 'operlog.columns.systemTypeLb', sortable: true, size: 120, show: true, readonly: true, dictData: sys_system_type },
  { prop: "status", name: 'operlog.columns.statusLb', sortable: true, size: 120, show: true, readonly: true, dictData: sys_common_status },
  { prop: "operTime", name: 'operlog.columns.operTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "costTime", name: 'operlog.columns.costTimeLb', sortable: true, size: 150, show: true, readonly: true },
  { prop: "operate", name: 'operlog.columns.operateLb', size: 100, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'eye', color: 'gray', title: 'operlog.columns.detailLb', permissionKey: 'monitor:operlog:query',
        click: (rowIndex: number) => { handleView(operlogList.value[rowIndex]); }
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
const data = reactive<PageData<OperLogForm, OperLogQuery>>({
  form: {
    operId: undefined,
    tenantId: undefined,
    title: '',
    businessType: 0,
    businessTypes: undefined,
    method: '',
    requestMethod: '',
    operatorType: 0,
    operName: '',
    deptName: '',
    operUrl: '',
    operIp: '',
    operLocation: '',
    operParam: '',
    jsonResult: '',
    status: 0,
    errorMsg: '',
    operTime: '',
    costTime: 0,
    systemType: ''
  },
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    title: '',
    operName: '',
    businessType: '',
    systemType: '',
    status: '',
    orderByColumn: 'operTime',
    isAsc: 'descending'
  },
  rules: {}
});

const { queryParams, form } = toRefs(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query login log */
const getList = async () => {
  loading.value = true;
  const res = await list(proxy?.addDateRange(queryParams.value, dateRange.value));
  operlogList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}
/** Operation log type dictionary translation */
const typeFormat = (row: OperLogForm) => {
  return proxy?.selectDictLabel(sys_oper_type.value, row.businessType);
}
/** Search button action */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}
/** Reset button action */
const resetQuery = () => {
  dateRange.value = ['', ''];
  queryParams.value.pageNum = 1;
}
/** Detailed button operation */
const handleView = (row: OperLogVO) => {
  dialog.title = i18n.global.t('operlog.dialog.tt');
  dialog.visible = true;
  form.value = row;
}
/** Delete button action */
const handleDelete = async (row?: OperLogVO) => {
  const operIds = row?.operId || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('operlog.operationMsg.deleteCf', { title : row ? ' "' + row.title + '"' : '' }));
  await delOperlog(operIds);
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('operlog.operationMsg.deleteSuccess'));
}
/** clear button action */
const handleClean = async () => {
  await proxy?.$modal.confirmDelete(i18n.global.t('operlog.operationMsg.clearCf'));
  await cleanOperlog();
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('operlog.operationMsg.clearSuccess'));
}
/** Export button action */
const handleExport = () => {
  proxy?.download("monitor/operlog/export", {
    ...queryParams.value,
  }, `config_${new Date().getTime()}.xlsx`);
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
})
</script>
