<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="configList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('config.searchInput.configNameLb')" prop="configName" class="form-item-search">
        <el-input
          v-model="queryParams.configName"
          :placeholder="$t('config.searchInput.configNamePh')"
          style="width: 200px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('config.searchInput.configKeyLb')" prop="configKey" class="form-item-search">
        <el-input
          v-model="queryParams.configKey"
          :placeholder="$t('config.searchInput.configKeyPh')"
          style="width: 200px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('config.searchInput.configTypeLb')" prop="configType" class="form-item-search">
        <el-select v-model="queryParams.configType" placeholder="Type" style="width: 100px" @change="handleQuery" clearable>
          <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('config.searchInput.createTimeLb')" style="width: 230px;" class="form-item-search">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          format="DD/MM/YYYY"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('config.searchInput.createTimeStartPh')"
          :end-placeholder="$t('config.searchInput.createTimeEndPh')"
          @change="handleQuery"
        />
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('config.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['system:config:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('config.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['system:config:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('config.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['system:config:remove']"
        @onClick="handleDelete"
      />
      <IrButton
        colorStyle="green"
        type="secondary"
        :title="$t('config.headerButton.exportTt')"
        leftIcon="download"
        v-hasPermi="['system:config:export']"
        @onClick="handleExport"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :title="$t('config.headerButton.refreshTt')"
        leftIcon="refresh"
        v-hasPermi="['system:config:remove']"
        @onClick="handleRefreshCache"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or modify parameter configuration dialog -->
          <el-form ref="configFormRef" :model="form" :rules="rules" label-width="150px" class="common-form">
            <el-form-item :label="$t('config.dialog.configNameLb')" prop="configName" class="form-item-row">
              <el-input v-model="form.configName" :placeholder="$t('config.dialog.configNamePh')" />
            </el-form-item>
            <el-form-item :label="$t('config.dialog.configKeyLb')" prop="configKey" class="form-item-row">
              <el-input v-model="form.configKey" :placeholder="$t('config.dialog.configKeyPh')" />
            </el-form-item>
            <el-form-item :label="$t('config.dialog.configValueLb')" prop="configValue" class="form-item-row">
              <el-input v-model="form.configValue" :placeholder="$t('config.dialog.configValuePh')" />
            </el-form-item>
            <el-form-item :label="$t('config.dialog.configTypeLb')" prop="configType" class="form-item-row">
              <el-radio-group v-model="form.configType">
                <el-radio v-for="dict in sys_yes_no" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('config.dialog.remarkLb')" prop="remark" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('config.dialog.remarkPh')" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('config.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton colorStyle="blue" type="primary" :title="$t('config.dialog.footerSubmitTt')" :width="100" @onClick="submitForm" />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="Config" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listConfig, getConfig, delConfig, addConfig, updateConfig, refreshCache } from "@/api/system/config";
// IMPORT TYPE
import { ConfigForm, ConfigQuery, ConfigVO } from "@/api/system/config/types";
import { DateModelType } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { sys_yes_no } = toRefs<any>(proxy?.useDict("sys_yes_no"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const configList = ref<ConfigVO[]>([]);
const loading = ref(true);
const ids = ref<Array<number | string>>([]);
const total = ref(0);
const rowKey = ref('configId');
const dateRange = ref<[DateModelType, DateModelType]>(['', '']);
const configFormRef = ref(ElForm);
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "configId", name: 'config.columns.configIdLb', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "configName", name: 'config.columns.configNameLb', sortable: true, size: 200, show: true, readonly: true, align: 'left' },
  { prop: "configKey", name: 'config.columns.configKeyLb', sortable: true, size: 200, show: true, readonly: true, align: 'left' },
  { prop: "configValue", name: 'config.columns.configValueLb', sortable: true, size: 120, show: true, readonly: true, align: 'left' },
  { prop: "configType", name: 'config.columns.configTypeLb', sortable: true, size: 90, show: true, readonly: true, dictData: sys_yes_no },
  { prop: "createTime", name: 'config.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "remark", name: 'config.columns.remarkLb', sortable: true, size: 200, show: true, readonly: true, align: 'left' },
  { prop: "operate", name: 'config.columns.operateLb', size: 100, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', color: 'gray', title: 'config.columns.operateEditLb', permissionKey: 'system:config:edit',
        click: (rowIndex: number) => { handleUpdate(configList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'delete', color: 'red', title: 'config.columns.operateDeleteLb', permissionKey: 'system:config:remove',
        click: (rowIndex: number) => { handleDelete(configList.value[rowIndex]); }
      }
    ]
  }
]);
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '600px'
});
const initFormData: ConfigForm = {
  configId: undefined,
  configName: '',
  configKey: '',
  configValue: '',
  configType: "Y",
  remark: ''
}
// eslint-disable-next-line no-undef
const data = reactive<PageData<ConfigForm, ConfigQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    configName: '',
    configKey: '',
    configType: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    configName: [{ required: true, message: i18n.global.t('config.dialog.rules.configNameRqMsg'), trigger: "blur" }],
    configKey: [{ required: true, message: i18n.global.t('config.dialog.rules.configKeyRqMsg'), trigger: "blur" }],
    configValue: [{ required: true, message: i18n.global.t('config.dialog.rules.configValueRqMsg'), trigger: "blur" }]
  }
});
const { queryParams, form, rules } = toRefs(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** list of query parameters */
const getList = async () => {
  loading.value = true;
  const res = await listConfig(proxy?.addDateRange(queryParams.value, dateRange.value));
  configList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}
/** Cancel button */
const cancel = () => {
  reset();
  dialog.visible = false;
}
/** Form reset */
const reset = () => {
  form.value = {...initFormData};
  configFormRef.value.resetFields();
}
/** Search button action */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}
/** Reset button action */
const resetQuery = () => {
  dateRange.value = ['', ''];
  handleQuery();
}
/** Add button action */
const handleAdd = () => {
  dialog.visible = true;
  dialog.title = i18n.global.t('config.dialog.addTt');
  nextTick(() => {
    reset();
  })
}
/** Edit button action */
const handleUpdate = (row?: ConfigVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('config.dialog.editTt');
  const configId = row?.configId || ids.value[0];
  nextTick(async () => {
    reset();
    const res = await getConfig(configId);
    form.value = res.data;
  })
}
/** Submit button */
const submitForm = () => {
  configFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      form.value.configId ? await updateConfig(form.value) : await addConfig(form.value);
      proxy?.$modal.msgSuccess(i18n.global.t('config.operationMsg.submitSuccess'));
      dialog.visible = false;
      getList();
    }
  });
}
/** Delete button action */
const handleDelete = async (row?: ConfigVO) => {
  const configIds = row?.configId || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('config.operationMsg.deleteCf', { configName: (row ? ' "' + row?.configName + '"' : '') }));
  await delConfig(configIds);
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('config.operationMsg.deleteSuccess'));
}
/** Export button action */
const handleExport = () => {
  proxy?.download("system/config/export", {
    ...queryParams.value
  }, `config_${new Date().getTime()}.xlsx`);
}
/** Refresh cache button action */
const handleRefreshCache = async () => {
  await refreshCache();
  proxy?.$modal.msgSuccess(i18n.global.t('config.operationMsg.refreshSuccess'));
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
})
</script>
