<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="ossConfigList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('oss.config.searchInput.configKeyLb')" prop="configKey" class="form-item-search">
        <el-input
          v-model="queryParams.configKey"
          :placeholder="$t('oss.config.searchInput.configKeyPh')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('oss.config.searchInput.bucketNameLb')" prop="bucketName" class="form-item-search">
        <el-input
          v-model="queryParams.bucketName"
          :placeholder="$t('oss.config.searchInput.bucketNamePh')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('oss.config.searchInput.statusLb')" prop="status" class="form-item-search">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('oss.config.searchInput.statusPh')"
          @change="handleQuery"
          clearable
          style="width: 200px"
        >
          <el-option key="0" label="Yes" value="0" />
          <el-option key="1" label="No" value="1" />
        </el-select>
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('oss.config.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['system:oss:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('oss.config.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['system:oss:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('oss.config.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['system:oss:remove']"
        @onClick="handleDelete"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or Modify Object Storage Configuration Dialog -->
          <el-form ref="ossConfigFormRef" :model="form" :rules="rules" label-width="150px" class="common-form">
            <el-form-item :label="$t('oss.config.dialog.configKeyLb')" prop="configKey" class="form-item-row">
              <el-input v-model="form.configKey" :placeholder="$t('oss.config.dialog.configKeyPh')" />
            </el-form-item>
            <el-form-item :label="$t('oss.config.dialog.endpointLb')" prop="endpoint" class="form-item-row">
              <el-input v-model="form.endpoint" :placeholder="$t('oss.config.dialog.endpointPh')" />
            </el-form-item>
            <el-form-item :label="$t('oss.config.dialog.domainLb')" prop="domain" class="form-item-row">
              <el-input v-model="form.domain" :placeholder="$t('oss.config.dialog.domainPh')" />
            </el-form-item>
            <el-form-item :label="$t('oss.config.dialog.accessKeyLb')" prop="accessKey" class="form-item-row">
              <el-input v-model="form.accessKey" :placeholder="$t('oss.config.dialog.accessKeyPh')" />
            </el-form-item>
            <el-form-item :label="$t('oss.config.dialog.secretKeyLb')" prop="secretKey" class="form-item-row">
              <el-input v-model="form.secretKey" :placeholder="$t('oss.config.dialog.secretKeyPh')" show-password />
            </el-form-item>
            <el-form-item :label="$t('oss.config.dialog.bucketNameLb')" prop="bucketName" class="form-item-row">
              <el-input v-model="form.bucketName" :placeholder="$t('oss.config.dialog.bucketNamePh')" />
            </el-form-item>
            <el-form-item :label="$t('oss.config.dialog.prefixLb')" prop="prefix" class="form-item-row">
              <el-input v-model="form.prefix" :placeholder="$t('oss.config.dialog.prefixPh')" />
            </el-form-item>
            <el-form-item :label="$t('oss.config.dialog.httpsLb')" class="form-item-row">
              <el-radio-group v-model="form.isHttps">
                <el-radio v-for="dict in sys_yes_no" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('oss.config.dialog.policyLb')" class="form-item-row">
              <el-radio-group v-model="form.accessPolicy">
                <el-radio label="0">{{ $t('oss.config.dialog.policyPrivateLb') }}</el-radio>
                <el-radio label="1">{{ $t('oss.config.dialog.policyPublicLb') }}</el-radio>
                <el-radio label="2">{{ $t('oss.config.dialog.policyCustomLb') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('oss.config.dialog.regionLb')" prop="region" class="form-item-row">
              <el-input v-model="form.region" :placeholder="$t('oss.config.dialog.regionPh')" />
            </el-form-item>
            <el-form-item :label="$t('oss.config.dialog.remarkLb')" prop="remark" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('oss.config.dialog.remarkPh')" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('oss.config.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton
            colorStyle="blue"
            type="primary"
            :title="$t('oss.config.dialog.footerSubmitTt')"
            :width="100"
            :loadingFlag="buttonLoading"
            @onClick="submitForm"
          />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="OssConfig" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import {
    listOssConfig,
    getOssConfig,
    delOssConfig,
    addOssConfig,
    updateOssConfig,
    changeOssConfigStatus
} from "@/api/system/ossConfig";
// IMPORT TYPE
import { OssConfigForm, OssConfigQuery, OssConfigVO } from "@/api/system/ossConfig/types";
import { ElForm } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance
// IMPORT DICTIONARY
const { sys_yes_no, sys_access_policy } = toRefs<any>(proxy?.useDict("sys_yes_no", "sys_access_policy"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const ossConfigList = ref<OssConfigVO[]>([]);
const loading = ref(true);
const buttonLoading = ref(false);
const ids = ref<Array<number | string>>([]);
const total = ref(0);
const rowKey = ref('ossConfigId');
const ossConfigFormRef = ref(ElForm);
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "ossConfigId", name: 'oss.config.columns.ossConfigIdLb', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "configKey", name: 'oss.config.columns.configKeyLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "endpoint", name: 'oss.config.columns.endpointLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "domain", name: 'oss.config.columns.domainLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "bucketName", name: 'oss.config.columns.bucketNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "prefix", name: 'oss.config.columns.prefixLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "region", name: 'oss.config.columns.regionLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "accessPolicy", name: 'oss.config.columns.accessPolicyLb', sortable: true, size: 150, show: true, readonly: true, dictData: sys_access_policy },
  { prop: "status", name: 'oss.config.columns.statusLb', sortable: true, size: 120, show: true, readonly: true,
    switchFunc: (rowIndex: number) => { if (ossConfigList.value) handleStatusChange(ossConfigList.value[rowIndex]); }
  },
  { prop: "operate", name: 'oss.config.columns.operateLb', size: 100, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', color: 'gray', title: 'oss.config.columns.operateEditLb', permissionKey: 'system:oss:edit',
        click: (rowIndex: number) => { handleUpdate(ossConfigList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'delete', color: 'red', title: 'oss.config.columns.operateDeleteLb', permissionKey: 'system:oss:remove',
        click: (rowIndex: number) => { handleDelete(ossConfigList.value[rowIndex]); }
      }
    ]
  }
]);
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '800px'
});
const initFormData: OssConfigForm = {
  ossConfigId: undefined,
  configKey: '',
  accessKey: '',
  secretKey: '',
  bucketName: '',
  prefix: '',
  endpoint: '',
  domain: '',
  isHttps: "N",
  accessPolicy: "1",
  region: '',
  status: "1",
  remark: '',
}
// eslint-disable-next-line no-undef
const data = reactive<PageData<OssConfigForm, OssConfigQuery>>({
  form: { ...initFormData },
  // query parameters
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    configKey: '',
    bucketName: '',
    status: '',
    orderByColumn: 'ossConfigId',
    isAsc: 'descending'
  },
  rules: {
    configKey: [{ required: true, message: i18n.global.t('oss.config.dialog.rules.configKeyRqMsg'), trigger: "blur" },],
    accessKey: [
      { required: true, message: i18n.global.t('oss.config.dialog.rules.accessKeyRqMsg'), trigger: "blur" },
      {
        min: 2,
        max: 200,
        message: i18n.global.t('oss.config.dialog.rules.accessKeyMinMaxMsg', { min: 2, max: 200 }),
        trigger: "blur",
      },
    ],
    secretKey: [
      { required: true, message: i18n.global.t('oss.config.dialog.rules.secretKeyRqMsg'), trigger: "blur" },
      {
        min: 2,
        max: 100,
        message: i18n.global.t('oss.config.dialog.rules.secretKeyMinMaxMsg', { min: 2, max: 100 }),
        trigger: "blur",
      },
    ],
    bucketName: [
      { required: true, message: i18n.global.t('oss.config.dialog.rules.bucketNameRqMsg'), trigger: "blur" },
      {
        min: 2,
        max: 100,
        message: i18n.global.t('oss.config.dialog.rules.bucketNameMinMaxMsg', { min: 2, max: 100 }),
        trigger: "blur",
      },
    ],
    endpoint: [
      { required: true, message: i18n.global.t('oss.config.dialog.rules.endpointRqMsg'), trigger: "blur" },
      {
        min: 2,
        max: 100,
        message: i18n.global.t('oss.config.dialog.rules.endpointMinMaxMsg', { min: 2, max: 100 }),
        trigger: "blur",
      },
    ],
    accessPolicy: [{ required: true, message: i18n.global.t('oss.config.dialog.rules.accessPolicyRqMsg'), trigger: "blur" }]
  }
});
const { queryParams, form, rules } = toRefs(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query the list of object storage configurations */
const getList = async () => {
  loading.value = true;
  const res = await listOssConfig(queryParams.value);
  ossConfigList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}
/** Cancel button */
const cancel = () => {
  dialog.visible = false;
  reset();
}
/** Form reset */
const reset = () => {
  form.value = { ...initFormData };
  ossConfigFormRef.value.resetFields();
}
/** Search button action */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}
/** Reset button action */
const resetQuery = () => {
  handleQuery();
}
/** Add button action */
const handleAdd = () => {
  dialog.visible = true;
  dialog.title = i18n.global.t('oss.config.dialog.addTt');
  nextTick(() => {
    reset();
  })
}
/** Edit button action */
const handleUpdate = (row?: OssConfigVO) => {
  loading.value = true;
  dialog.visible = true;
  dialog.title = i18n.global.t('oss.config.dialog.editTt');
  const ossConfigId = row?.ossConfigId || ids.value[0];
  nextTick(async () => {
    reset();
    const res = await getOssConfig(ossConfigId);
    loading.value = false;
    form.value = res.data;
  })
}
/** Submit button */
const submitForm = () => {
  ossConfigFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.ossConfigId) {
          await updateOssConfig(form.value).finally(() => buttonLoading.value = false);
      } else {
          await addOssConfig(form.value).finally(() => buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess(i18n.global.t('oss.config.operationMsg.submitSuccess'));
      dialog.visible = false;
      getList();
    }
  });
}
/** status modification  */
const  handleStatusChange = async (row: OssConfigVO) => {
  let text = row.status === "0" ? i18n.global.t('oss.config.operationMsg.statusEnable') : i18n.global.t('oss.config.operationMsg.statusDisable');
  try {
    await proxy?.$modal.confirmWarning(i18n.global.t('oss.config.operationMsg.statusChangeCf', { action: text, configKey: row.configKey }));
    await changeOssConfigStatus(row.ossConfigId, row.status, row.configKey);
    getList()
    proxy?.$modal.msgSuccess(text + i18n.global.t('oss.config.operationMsg.statusChangeSuccess'));
  } catch { return } finally {
    row.status = row.status === "0" ? "1" : "0";
  }
}
/** Delete button action */
const handleDelete = async (row?: OssConfigVO) => {
  const ossConfigIds = row?.ossConfigId || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('oss.config.operationMsg.deleteCf', { configKey: (row ? ' "' + row.configKey + '"' : '') }));
  loading.value = true;
  await delOssConfig(ossConfigIds).finally(() => loading.value = false);
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('oss.config.operationMsg.deleteSuccess'));
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
})
</script>
