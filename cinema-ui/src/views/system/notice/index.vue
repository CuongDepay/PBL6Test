<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="noticeList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('notice.searchInput.noticeTitleLb')" prop="noticeTitle" class="form-item-search">
        <el-input
          v-model="queryParams.noticeTitle"
          :placeholder="$t('notice.searchInput.noticeTitlePh')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('notice.searchInput.createByNameLb')" prop="createByName" class="form-item-search">
        <el-input
          v-model="queryParams.createByName"
          :placeholder="$t('notice.searchInput.createByNamePh')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('notice.searchInput.noticeTypeLb')" prop="noticeType" class="form-item-search">
        <el-select
          v-model="queryParams.noticeType"
          :placeholder="$t('notice.searchInput.noticeTypePh')"
          clearable
          style="width: 200px"
          @change="handleQuery"
        >
          <el-option v-for="dict in sys_notice_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('notice.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['system:notice:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('notice.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['system:notice:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('notice.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['system:notice:remove']"
        @onClick="handleDelete"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or modify announcement dialog -->
          <el-form ref="noticeFormRef" :model="form" :rules="rules" label-width="150px" class="common-form">
            <el-row>
              <el-col :span="11">
                <el-form-item :label="$t('notice.dialog.noticeTitleLb')" prop="noticeTitle" class="form-item-row">
                  <el-input v-model="form.noticeTitle" :placeholder="$t('notice.dialog.noticeTitlePh')" />
                </el-form-item>
              </el-col>
              <el-col :span="2"></el-col>
              <el-col :span="11">
                <el-form-item :label="$t('notice.dialog.noticeTypeLb')" prop="noticeType" class="form-item-row">
                  <el-select v-model="form.noticeType" :placeholder="$t('notice.dialog.noticeTypePh')">
                    <el-option v-for="dict in sys_notice_type" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('notice.dialog.statusLb')" class="form-item-row">
                  <el-radio-group v-model="form.status">
                    <el-radio v-for="dict in sys_notice_status" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('notice.dialog.noticeContentLb')" class="form-item-row">
                  <editor v-model="form.noticeContent" :min-height="192" style="width: 100%" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('notice.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton colorStyle="blue" type="primary" :title="$t('notice.dialog.footerSubmitTt')" :width="100" @onClick="submitForm" />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="Notice" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listNotice, getNotice, delNotice, addNotice, updateNotice } from "@/api/system/notice";
// IMPORT TYPE
import { NoticeForm, NoticeQuery, NoticeVO } from "@/api/system/notice/types";
import { ElForm } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { sys_notice_status, sys_notice_type } = toRefs<any>(proxy?.useDict("sys_notice_status", "sys_notice_type"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const noticeList = ref<NoticeVO[]>([]);
const loading = ref(true);
const ids = ref<Array<string | number>>([]);
const total = ref(0);
const rowKey = ref('noticeId');
const noticeFormRef = ref(ElForm);
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "noticeId", name: 'notice.columns.noticeIdLb', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "noticeTitle", name: 'notice.columns.noticeTitleLb', sortable: true, size: 250, show: true, readonly: true, align: 'left' },
  { prop: "noticeType", name: 'notice.columns.noticeTypeLb', sortable: true, size: 130, show: true, readonly: true, dictData: sys_notice_type },
  { prop: "status", name: 'notice.columns.statusLb', sortable: true, size: 120, show: true, readonly: true, dictData: sys_notice_status },
  { prop: "createByName", name: 'notice.columns.createByNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "createTime", name: 'notice.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "operate", name: 'notice.columns.operateLb', size: 100, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', color: 'gray', title: 'notice.columns.operateEditLb', permissionKey: 'system:notice:edit',
        click: (rowIndex: number) => { handleUpdate(noticeList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'delete', color: 'red', title: 'notice.columns.operateDeleteLb', permissionKey: 'system:notice:remove',
        click: (rowIndex: number) => { handleDelete(noticeList.value[rowIndex]); }
      }
    ]
  }
]);
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '800px'
});
const initFormData: NoticeForm = {
    noticeId: undefined,
    noticeTitle: '',
    noticeType: '',
    noticeContent: '',
    status: "0",
    remark: '',
    createByName: ''
}
// eslint-disable-next-line no-undef
const data = reactive<PageData<NoticeForm, NoticeQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    noticeTitle: '',
    createByName: '',
    status: '',
    noticeType: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    noticeTitle: [{ required: true, message: i18n.global.t('notice.dialog.rules.noticeTitleRqMsg'), trigger: "blur" }],
    noticeType: [{ required: true, message: i18n.global.t('notice.dialog.rules.noticeTypeRqMsg'), trigger: "change" }]
  },
});
const { queryParams, form, rules } = toRefs(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query Announcement List */
const getList = async () => {
  loading.value = true;
  const res = await listNotice(queryParams.value);
  noticeList.value = res.rows;
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
  form.value = { ...initFormData };
  noticeFormRef.value.resetFields();
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
  dialog.title = i18n.global.t('notice.dialog.addTt');
  nextTick(() => {
    reset();
  })
}
/** Modify button action */
const handleUpdate = (row?: NoticeVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('notice.dialog.editTt');
  nextTick(async () => {
    const noticeId = row?.noticeId || ids.value[0];
    reset();
    const { data } = await getNotice(noticeId);
    form.value = data;
  })
}
/** Submit button */
const submitForm = () => {
  noticeFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      form.value.noticeId ? await updateNotice(form.value) : await addNotice(form.value);
      proxy?.$modal.msgSuccess(i18n.global.t('notice.operationMsg.submitSuccess'));
      dialog.visible = false;
      getList();
    }
  });
}
/** Delete button action */
const handleDelete = async (row?: NoticeVO) => {
  const noticeIds = row?.noticeId || ids.value
  await proxy?.$modal.confirmDelete(i18n.global.t('notice.operationMsg.deleteCf', { noticeTitle: (row ? ' "' + row?.noticeTitle + '"' : '') }));
  await delNotice(noticeIds);
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('notice.operationMsg.deleteSuccess'));
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
})
</script>
