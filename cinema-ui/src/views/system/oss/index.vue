<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="ossList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('oss.searchInput.fileNameLb')" prop="fileName" class="form-item-search">
        <el-input
          v-model="queryParams.fileName"
          :placeholder="$t('oss.searchInput.fileNamePh')"
          clearable
          style="width: 120px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('oss.searchInput.originalNameLb')" prop="originalName" class="form-item-search">
        <el-input
          v-model="queryParams.originalName"
          :placeholder="$t('oss.searchInput.originalNamePh')"
          clearable
          style="width: 120px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('oss.searchInput.fileSuffixLb')" prop="fileSuffix" class="form-item-search">
        <el-input
          v-model="queryParams.fileSuffix"
          :placeholder="$t('oss.searchInput.fileSuffixPh')"
          clearable
          style="width: 120px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('oss.searchInput.serviceLb')" prop="service" class="form-item-search">
        <el-input
          v-model="queryParams.service"
          :placeholder="$t('oss.searchInput.servicePh')"
          clearable
          style="width: 120px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('oss.searchInput.createTimeLb')" class="form-item-search" style="width: 390px;">
        <el-date-picker
          v-model="daterangeCreateTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          format="DD/MM/YYYY HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('oss.searchInput.createTimeStartPh')"
          :end-placeholder="$t('oss.searchInput.createTimeEndPh')"
          @change="handleQuery"
        ></el-date-picker>
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('oss.headerButton.uploadFileTt')"
        leftIcon="upload"
        v-hasPermi="['system:oss:upload']"
        @onClick="handleFile"
      />
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('oss.headerButton.uploadImageTt')"
        leftIcon="upload"
        v-hasPermi="['system:oss:upload']"
        @onClick="handleImage"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('oss.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['system:post:remove']"
        @onClick="handleDelete"
      />
      <IrButton
        :colorStyle="previewListResource ? 'red' : 'green'"
        type="secondary"
        :title="$t('oss.headerButton.downloadTt') + (previewListResource ? $t('oss.operationMsg.previewDisable') : $t('oss.operationMsg.previewEnable'))"
        leftIcon="eye"
        v-hasPermi="['system:oss:edit']"
        @onClick="handlePreviewListResource(!previewListResource)"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :title="$t('oss.headerButton.configTt')"
        leftIcon="block"
        v-hasPermi="['system:oss:list']"
        @onClick="handleOssConfig"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or modify OSS object storage dialog -->
          <el-form ref="ossFormRef" :model="form" :rules="rules" label-width="150px" class="common-form">
            <el-form-item :label="$t('oss.dialog.fileNameLb')" class="form-item-row">
              <fileUpload v-model:ossId="form.file" v-if="type === 0" />
              <imageUpload v-model="form.file" v-if="type === 1" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('oss.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton colorStyle="blue" type="primary" :title="$t('oss.dialog.footerSubmitTt')" :width="100" @onClick="submitForm" />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="Oss" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
import GridImagePreview from "@/components/IrGrid/GridImagePreview.vue";
// IMPORT API
import { listOss, delOss } from "@/api/system/oss";
// IMPORT TYPE
import { OssForm, OssQuery, OssVO } from "@/api/system/oss/types";
import { DateModelType } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { VGridVueTemplate } from "@revolist/vue3-datagrid";
import { h } from 'vue';
import { ComponentInternalInstance } from "vue";
const router = useRouter();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const ossList = ref<OssVO[]>([]);
const loading = ref(true);
const ids = ref<Array<string | number>>([]);
const total = ref(0);
const rowKey = ref('ossId');
const type = ref(0);
const previewListResource = ref(true);
const daterangeCreateTime = ref<[DateModelType, DateModelType]>(['', '']);
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "ossId", name: 'oss.columns.ossIdLb', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "fileName", name: 'oss.columns.fileNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "originalName", name: 'oss.columns.originalNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "fileSuffix", name: 'oss.columns.fileSuffixLb', sortable: true, size: 150, show: true, readonly: true },
  { prop: "url", name: 'oss.columns.urlLb', sortable: true, size: 150, show: true, readonly: true,
    cellTemplate: VGridVueTemplate(h(GridImagePreview, { previewListResource: previewListResource.value, fileSuffixCol: 'fileSuffix' }))
  },
  { prop: "createTime", name: 'oss.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "createByName", name: 'oss.columns.createByNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "service", name: 'oss.columns.serviceLb', sortable: true, size: 170, show: true, readonly: true, align: 'left' },
  { prop: "operate", name: 'oss.columns.operateLb', size: 100, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'download', color: 'blue', title: 'oss.columns.operateDownloadLb', permissionKey: 'system:oss:download',
        click: (rowIndex: number) => { handleDownload(ossList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'delete', color: 'red', title: 'oss.columns.operateDeleteLb', permissionKey: 'system:oss:remove',
        click: (rowIndex: number) => { handleDelete(ossList.value[rowIndex]); }
      }
    ]
  }
]);
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '500px'
});
const ossFormRef = ref(ElForm);
const initFormData = {
  file: undefined,
}
// eslint-disable-next-line no-undef
const data = reactive<PageData<OssForm, OssQuery>>({
  form: { ...initFormData },
  // query parameters
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    fileName: '',
    originalName: '',
    fileSuffix: '',
    createTime: '',
    service: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    file: [
      { required: true, message: i18n.global.t('oss.dialog.rules.fileRqMsg'), trigger: "blur" }
    ]
  }
});
const { queryParams, form, rules } = toRefs(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query the list of OSS object storage */
const getList = async () => {
  loading.value = true;
  const res = await proxy?.getConfigKey("sys.oss.previewListResource");
  previewListResource.value = res?.msg === undefined ? true : res.msg === 'true';
  const response = await listOss(proxy?.addDateRange(queryParams.value, daterangeCreateTime.value, "createTime"));
  ossList.value = response.rows;
  total.value = response.total;
  loading.value = false;
}
/** Cancel button */
function cancel() {
  dialog.visible = false;
  reset();
}
/** Form reset */
function reset() {
  form.value = { ...initFormData };
  ossFormRef.value.resetFields();
}
/** Search button action */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** Reset button action */
function resetQuery() {
  daterangeCreateTime.value = ['', ''];
  handleQuery();
}
/** Task log list query */
const handleOssConfig = () => {
  router.push('/system/oss-config/index')
}
/** File button action */
const handleFile = () => {
  dialog.visible = true;
  dialog.title = i18n.global.t('oss.dialog.fileTt');
  nextTick(() => {
    reset();
    type.value = 0;
  })
}
/** Image button action */
const handleImage = () => {
  dialog.visible = true;
  dialog.title = i18n.global.t('oss.dialog.imageTt');
  nextTick(() => {
    reset();
    type.value = 1;
  })
}
/** Submit button */
const submitForm = () => {
  dialog.visible = false;
  getList();
}
/** Download button action */
const handleDownload = (row: OssVO) => {
  proxy?.$download.oss(row.ossId)
}
/** User Status Modification  */
const handlePreviewListResource = async (preview: boolean) => {
  let text = preview ? i18n.global.t('oss.operationMsg.previewEnable') : i18n.global.t('oss.operationMsg.previewDisable');
  try {
    await proxy?.$modal.confirmWarning(i18n.global.t('oss.operationMsg.previewChangeCf', { action: text }));
    await proxy?.updateConfigByKey("sys.oss.previewListResource", preview);
    getList();
    proxy?.$modal.msgSuccess(text + i18n.global.t('oss.operationMsg.previewChangeSuccess'));
  } catch { return }
}
/** Delete button action */
const handleDelete = async (row?: OssVO) => {
  const ossIds = row?.ossId || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('oss.operationMsg.deleteCf', { fileName : (row ? ' "' + row.fileName + '"' : '') }));
  loading.value = true;
  await delOss(ossIds).finally(() => loading.value = false);
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('oss.operationMsg.deleteSuccess'));
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
})
</script>
