<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="postList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('post.searchInput.postCodeLb')" prop="postCode" class="form-item-search">
        <el-input
          v-model="queryParams.postCode"
          :placeholder="$t('post.searchInput.postCodePh')"
          style="width: 200px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('post.searchInput.postNameLb')" prop="postName" class="form-item-search">
        <el-input
          v-model="queryParams.postName"
          :placeholder="$t('post.searchInput.postNamePh')"
          style="width: 200px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('post.searchInput.statusLb')" prop="status" class="form-item-search">
        <el-select v-model="queryParams.status" :placeholder="$t('post.searchInput.statusPh')" clearable style="width: 200px" @change="handleQuery">
          <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('post.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['system:post:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('post.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['system:post:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('post.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['system:post:remove']"
        @onClick="handleDelete"
      />
      <IrButton
        colorStyle="green"
        type="secondary"
        :title="$t('post.headerButton.exportTt')"
        leftIcon="download"
        v-hasPermi="['system:post:export']"
        @onClick="handleExport"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or Modify Post Dialog -->
          <el-form ref="postFormRef" :model="form" :rules="rules" label-width="150px" class="common-form">
            <el-form-item :label="$t('post.dialog.postNameLb')" prop="postName" class="form-item-row">
              <el-input v-model="form.postName" :placeholder="$t('post.dialog.postNamePh')" />
            </el-form-item>
            <el-form-item :label="$t('post.dialog.postCodeLb')" prop="postCode" class="form-item-row">
              <el-input v-model="form.postCode" :placeholder="$t('post.dialog.postCodePh')" />
            </el-form-item>
            <el-form-item :label="$t('post.dialog.postSortLb')" prop="postSort" class="form-item-row">
              <el-input-number v-model="form.postSort" controls-position="right" :min="0" />
            </el-form-item>
            <el-form-item :label="$t('post.dialog.statusLb')" prop="status" class="form-item-row">
              <el-radio-group v-model="form.status">
                <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('post.dialog.remarkLb')" prop="remark" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('post.dialog.remarkPh')" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('post.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton colorStyle="blue" type="primary" :title="$t('post.dialog.footerSubmitTt')" :width="100" @onClick="submitForm" />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>
<script setup name="Post" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listPost, addPost, delPost, getPost, updatePost } from "@/api/system/post";
// IMPORT TYPE
import { PostForm, PostQuery, PostVO } from "@/api/system/post/types";
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { sys_normal_disable } = toRefs<any>(proxy?.useDict("sys_normal_disable"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const loading = ref(true);
const postList = ref<PostVO[]>([]);
const ids = ref<Array<number | string>>([]);
const total = ref(0);
const rowKey = ref('postId');
const postFormRef = ref(ElForm);
const initFormData: PostForm = {
  postId: undefined,
  postCode: '',
  postName: '',
  postSort: 0,
  status: "0",
  remark: ''
}
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "postId", name: 'post.columns.postIdLb', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "postCode", name: 'post.columns.postCodeLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "postName", name: 'post.columns.postNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "postSort", name: 'post.columns.postSortLb', sortable: true, size: 100, show: true, readonly: true },
  { prop: "status", name: 'post.columns.statusLb', sortable: true, size: 120, show: true, readonly: true, dictData: sys_normal_disable },
  { prop: "createTime", name: 'post.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "operate", name: 'post.columns.operateLb', size: 100, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', title: 'post.columns.operateEditLb', color: 'gray', permissionKey: 'system:post:edit',
        click: (rowIndex: number) => { handleUpdate(postList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'delete', title: 'post.columns.operateDeleteLb', color: 'red', permissionKey: 'system:post:remove',
        click: (rowIndex: number) => { handleDelete(postList.value[rowIndex]); }
      }
    ]
  }
]);
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '500px'
});
// eslint-disable-next-line no-undef
const data = reactive<PageData<PostForm, PostQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    postCode: '',
    postName: '',
    status: '',
    orderByColumn: 'postSort',
    isAsc: 'ascending'
  },
  rules: {
    postName: [{ required: true, message: i18n.global.t('post.dialog.rules.postNameRqMsg'), trigger: "blur" }],
    postCode: [{ required: true, message: i18n.global.t('post.dialog.rules.postCodeRqMsg'), trigger: "blur" }],
    postSort: [{ required: true, message: i18n.global.t('post.dialog.rules.postSortRqMsg'), trigger: "blur" }],
  }
});
// eslint-disable-next-line no-undef
const { queryParams, form, rules } = toRefs<PageData<PostForm, PostQuery>>(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query job list */
const getList = async () => {
  loading.value = true;
  const res = await listPost(queryParams.value);
  postList.value = res.rows;
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
  dialog.title = i18n.global.t('post.dialog.addTt');
  nextTick(() => {
    reset();
  })
}
/** Edit button action */
const handleUpdate = (row?: PostVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('post.dialog.editTt');
  nextTick(async () => {
    reset();
    const postId = row?.postId || ids.value[0];
    const res = await getPost(postId);
    form.value = res.data;
  })
}
/** Delete button action */
const handleDelete = async (row?: PostVO) => {
  const postIds = row?.postId || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('post.operationMsg.deleteCf', { postName: (row ? ' "' + row?.postName + '"' : '') }));
  await delPost(postIds);
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('post.operationMsg.deleteSuccess'));
}
/** Export button action */
const handleExport = () => {
  proxy?.download("system/post/export", {
    ...queryParams.value
  }, `post_${new Date().getTime()}.xlsx`);
}
/** Submit button */
const submitForm = () => {
  postFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      form.value.postId ? await updatePost(form.value) : await addPost(form.value);
      proxy?.$modal.msgSuccess(i18n.global.t('post.operationMsg.submitSuccess'));
      dialog.visible = false;
      getList();
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
  postFormRef.value.resetFields();
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
});
</script>
