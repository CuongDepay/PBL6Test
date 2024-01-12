<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="documentList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('document.searchInput.docTitleLb')" prop="docTitle" class="form-item-search">
        <el-input
          v-model="queryParams.docTitle"
          :placeholder="$t('document.searchInput.docTitlePh')"
          style="width: 200px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('document.searchInput.docTypeLb')" prop="systemType" class="form-item-search">
        <el-select
          v-model="queryParams.docType"
          :placeholder="$t('document.searchInput.docTypePh')"
          clearable
          style="width: 150px"
          @change="handleQuery"
        >
          <el-option v-for="dict in sys_document_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('document.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['system:document:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('document.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['system:document:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('document.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['system:document:remove']"
        @onClick="handleDelete"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or Modify Document Dialog -->
          <el-form ref="documentFormRef" :model="form" :rules="rules" label-width="100px" class="common-form">
            <el-form-item :label="$t('document.dialog.docTitleLb')" prop="docTitle" class="form-item-row">
              <el-input v-model="form.docTitle" :placeholder="$t('document.dialog.docTitlePh')" />
            </el-form-item>
            <el-form-item :label="$t('document.dialog.docTypeLb')" class="form-item-row">
              <el-radio-group v-model="form.docType">
                <el-radio v-for="dict in sys_document_type" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-row>
              <el-col :span="11">
                <el-form-item :label="$t('document.dialog.isExternalLinkLb')" prop="isExternalLink" class="form-item-row">
                  <el-radio-group v-model="form.isExternalLink">
                    <el-radio v-for="dict in sys_yes_no" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="2" />
              <el-col :span="11">
                <el-form-item :label="$t('document.dialog.statusTt')" prop="status" class="form-item-row">
                  <el-radio-group v-model="form.status">
                    <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item v-if="'document' === form.docType" :label="$t('document.dialog.docTargetLb')" prop="docTarget" class="form-item-row">
              <el-input v-model="form.docTarget" :placeholder="$t('document.dialog.docTargetPh')" />
            </el-form-item>
            <el-form-item :label="$t('document.dialog.docUrlLb')" prop="docUrl" class="form-item-row">
              <el-input
                v-if="form.isExternalLink === 'Y' || 'video' === form.docType"
                v-model="form.docUrl"
                :placeholder="$t('document.dialog.docUrlPh')"
              />
              <fileUpload
                v-else
                ref="fileUploadRef"
                v-model:ossId="form.ossId"
                v-model:url="form.docUrl"
                configKey="public_document"
                :required="false"
                :autoUpload="false"
                :fileSize="50"
                :limit="1"
                :loading="buttonLoading"
                @submitForm="submitForm"
              />
            </el-form-item>
            <el-form-item :label="$t('document.dialog.docDescriptionLb')" prop="docDescription" class="form-item-row">
              <el-input v-model="form.docDescription" type="textarea" :placeholder="$t('document.dialog.docDescriptionPh')" />
            </el-form-item>
            <el-form-item v-if="'document' === form.docType" :label="$t('document.dialog.imageTypeLb')" class="form-item-row">
              <el-select v-model="form.imageType" :placeholder="$t('document.dialog.imageTypePh')">
                <el-option v-for="dict in sys_document_image" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('document.dialog.remarkLb')" prop="remark" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('document.dialog.remarkPh')" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('document.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton
            colorStyle="blue"
            type="primary"
            :loadingFlag="buttonLoading"
            :title="$t('document.dialog.footerSubmitTt')"
            :width="100"
            @onClick="submitForm"
          />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>
<script setup name="Document" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listDocument, addDocument, delDocument, getDocument, updateDocument, changeDocumentStatus } from "@/api/system/document";
// IMPORT TYPE
import { DocumentForm, DocumentQuery, DocumentVO } from "@/api/system/document/types";
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { sys_document_type, sys_yes_no, sys_normal_disable, sys_document_image } = toRefs<any>(proxy?.useDict("sys_document_type", "sys_yes_no", "sys_normal_disable", "sys_document_image"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const loading = ref(true);
const buttonLoading = ref(false);
const documentList = ref<DocumentVO[]>([]);
const ids = ref<Array<number | string>>([]);
const total = ref(0);
const rowKey = ref('id');
const fileUploadRef = ref();
const documentFormRef = ref(ElForm);
const initFormData: DocumentForm = {
  docType: 'guide',
  docTitle: undefined,
  docUrl: undefined,
  ossId: undefined,
  docDescription: undefined,
  docTarget: undefined,
  imageType: undefined,
  isExternalLink: 'N',
  status: '0',
  remark: undefined
}
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "id", name: 'document.columns.idLb', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "docType", name: 'document.columns.docTypeLb', sortable: true, size: 120, show: true, readonly: true, align: 'left', dictData: sys_document_type },
  { prop: "docTitle", name: 'document.columns.docTitleLb', sortable: true, size: 200, show: true, readonly: true, align: 'left' },
  { prop: "docUrl", name: 'document.columns.urlLb', sortable: true, size: 150, show: true, readonly: true, align: 'left',
    click: (rowIndex: number) => { proxy?.openLink(documentList.value[rowIndex].docUrl); }
  },
  { prop: "status", name: 'document.columns.statusLb', sortable: true, size: 120, show: true, readonly: true,
    switchFunc: (rowIndex: number) => { if (documentList.value) handleStatusChange(documentList.value[rowIndex]); }
  },
  { prop: "createTime", name: 'document.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "operate", name: 'document.columns.operateLb', size: 100, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', title: 'document.columns.operateEditLb', color: 'gray', permissionKey: 'system:document:edit',
        click: (rowIndex: number) => { handleUpdate(documentList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'delete', title: 'document.columns.operateDeleteLb', color: 'red', permissionKey: 'system:document:remove',
        click: (rowIndex: number) => { handleDelete(documentList.value[rowIndex]); }
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
const data = reactive<PageData<DocumentForm, DocumentQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    docType: undefined,
    docTitle: undefined,
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    docTitle: [{ required: true, message: i18n.global.t('document.dialog.rules.docTitleRqMsg'), trigger: "blur" }]  }
});
// eslint-disable-next-line no-undef
const { queryParams, form, rules } = toRefs<PageData<DocumentForm, DocumentQuery>>(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query System document list */
const getList = async () => {
  loading.value = true;
  const res = await listDocument(queryParams.value);
  documentList.value = res.rows;
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
  queryParams.value.pageNum = 1;
  handleQuery();
}
/** Add button action */
const handleAdd = () => {
  dialog.visible = true;
  dialog.title = i18n.global.t('document.dialog.addTt');
  nextTick(() => {
    reset();
  })
}
/** Edit button action */
const handleUpdate = (row?: DocumentVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('document.dialog.editTt');
  nextTick(async () => {
    reset();
    const _id = row?.id || ids.value[0]
    const res = await getDocument(_id);
    Object.assign(form.value, res.data);
  })
}
/** Delete button action */
const handleDelete = async (row?: DocumentVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('document.operationMsg.deleteCf', { title: (row ? ' "' + row?.docTitle + '"' : '') })).finally(() => loading.value = false);
  await delDocument(_ids);
  proxy?.$modal.msgSuccess(i18n.global.t('document.operationMsg.deleteSuccess'));
  await getList();
}
/** Submit button */
const submitForm = () => {
  documentFormRef.value.validate(async (valid: boolean) => {
    if (valid && (fileUploadRef.value ? fileUploadRef.value.submitFile() : true)) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateDocument(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addDocument(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess(i18n.global.t('document.operationMsg.submitSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
}
/** Cancel button */
const cancel = () => {
  reset();
  dialog.visible = false;
}
/** Form reset */
const reset = () => {
  form.value = {...initFormData};
  documentFormRef.value.resetFields();
}
/** Document Status Modification  */
const handleStatusChange = async (row: DocumentVO) => {
  let text = row.status === "0" ? i18n.global.t('document.operationMsg.statusEnable') : i18n.global.t('user.operationMsg.statusDisable');
  try {
    await proxy?.$modal.confirmWarning(i18n.global.t('document.operationMsg.statusChangeCf', { action: text, docTitle: row.docTitle }));
    await changeDocumentStatus(row.id, row.status);
    proxy?.$modal.msgSuccess(text + i18n.global.t('document.operationMsg.submitSuccess'));
  } catch (err) {
    row.status = row.status === "0" ? "1" : "0";
  }
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
});
</script>
