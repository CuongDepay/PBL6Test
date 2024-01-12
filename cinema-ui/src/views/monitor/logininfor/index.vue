<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="loginInfoList"
    :columnSetting="columns"
    :checkboxCol="true"
    :rowKey="rowKey"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('logininfor.searchInput.ipaddrLb')" prop="ipaddr" class="form-item-search">
        <el-input
          v-model="queryParams.ipaddr"
          :placeholder="$t('logininfor.searchInput.ipaddrPh')"
          clearable
          style="width: 170px;"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('logininfor.searchInput.userNameLb')" prop="userName" class="form-item-search">
        <el-input
          v-model="queryParams.userName"
          :placeholder="$t('logininfor.searchInput.userNamePh')"
          clearable
          style="width: 150px;"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('logininfor.searchInput.statusLb')" prop="status" class="form-item-search">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('logininfor.searchInput.statusPh')"
          clearable
          style="width: 130px"
          @change="handleQuery"
        >
          <el-option v-for="dict in sys_common_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('logininfor.searchInput.loginTimeLb')" style="width: 370px" class="form-item-search">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          format="DD/MM/YYYY HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('logininfor.searchInput.loginTimeStartPh')"
          :end-placeholder="$t('logininfor.searchInput.loginTimeEndPh')"
          @change="handleQuery"
        ></el-date-picker>
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('logininfor.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['monitor:logininfor:remove']"
        @onClick="handleDelete"
      />
      <IrButton colorStyle="red" type="secondary" title="Clear" leftIcon="delete" v-hasPermi="['monitor:logininfor:remove']" @onClick="handleClean" />
      <IrButton
        colorStyle="blue"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('logininfor.headerButton.unlockTt')"
        leftIcon="lock"
        v-hasPermi="['monitor:logininfor:unlock']"
        @onClick="handleUnlock"
      />
      <IrButton
        colorStyle="green"
        type="secondary"
        :title="$t('logininfor.headerButton.exportTt')"
        leftIcon="download"
        v-hasPermi="['monitor:logininfor:export']"
        @onClick="handleExport"
      />
    </template>
  </Layout1>
</template>

<script setup name="Logininfor" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { list, delLoginInfo, cleanLoginInfo, unlockLoginInfo } from "@/api/monitor/loginInfo";
// IMPORT TYPE
import { LoginInfoQuery, LoginInfoVO } from "@/api/monitor/loginInfo/types";
import { DateModelType } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { sys_common_status } = toRefs<any>(proxy?.useDict("sys_common_status"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
/////////////////////////////////////////////////////////////////////////////
const loginInfoList = ref<LoginInfoVO[]>([]);
const loading = ref(true);
const ids = ref<Array<number | string>>([]);
const selectName = ref<Array<string>>([]);
const total = ref(0);
const rowKey = ref('infoId');
const dateRange = ref<[DateModelType,DateModelType]>(['', '']);
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "ipaddr", name: 'logininfor.columns.ipaddrLb', sortable: true, size: 150, show: true, readonly: true },
  { prop: "loginLocation", name: 'logininfor.columns.loginLocationLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "os", name: 'logininfor.columns.osLb', sortable: true, size: 170, show: true, readonly: true, align: 'left' },
  { prop: "browser", name: 'logininfor.columns.browserLb', sortable: true, size: 120, show: true, readonly: true },
  { prop: "status", name: 'logininfor.columns.statusLb', sortable: true, size: 120, show: true, readonly: true, dictData: sys_common_status },
  { prop: "msg", name: 'logininfor.columns.msgLb', sortable: true, size: 140, show: true, readonly: true, align: 'left' },
  { prop: "loginTime", name: 'logininfor.columns.loginTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  }
]);
// query parameters
const queryParams = ref<LoginInfoQuery>({
  pageNum: 1,
  pageSize: 20,
  ipaddr: '',
  userName: '',
  status: '',
  orderByColumn: 'loginTime',
  isAsc: 'descending'
});
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query the list of login logs */
const getList = async () => {
  loading.value = true;
  const res = await list(proxy?.addDateRange(queryParams.value, dateRange.value));
  loginInfoList.value = res.rows;
  total.value = res.total;
  loading.value = false;
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
/** Delete button action */
const handleDelete = async (row?: LoginInfoVO) => {
  const infoIds = row?.infoId || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('logininfor.operationMsg.deleteCf'));
  await delLoginInfo(infoIds);
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('logininfor.operationMsg.deleteSuccess'));
}
/** clear button action */
const handleClean = async () => {
  await proxy?.$modal.confirmDelete(i18n.global.t('logininfor.operationMsg.clearCf'));
  await cleanLoginInfo();
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('logininfor.operationMsg.clearSuccess'));
}
/** Unlock button operation */
const handleUnlock = async () => {
  const username = selectName.value;
  await proxy?.$modal.confirmWarning(i18n.global.t('logininfor.operationMsg.unlockCf', { username : username }));
  await unlockLoginInfo(username);
  proxy?.$modal.msgSuccess(i18n.global.t('logininfor.operationMsg.unlockSuccess', { username : username }));
}
/** Export button action */
const handleExport = () => {
  proxy?.download("monitor/logininfor/export", {
    ...queryParams.value,
  }, `config_${new Date().getTime()}.xlsx`);
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
})
</script>
