<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="slideList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('slideManagement.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['portCustomer:slideManagement:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('slideManagement.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['portCustomer:slideManagement:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('slideManagement.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['portCustomer:slideManagement:remove']"
        @onClick="handleDelete"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or Modify Slide Dialog -->
          <el-form ref="slideFormRef" :model="form" :rules="rules" label-width="110px" class="common-form">
            <el-form-item :label="$t('slideManagement.dialog.slideUrlTt')" prop="slideUrl" class="form-item-row">
              <el-input v-model="form.slideUrl" :placeholder="$t('slideManagement.dialog.slideUrlPh')" />
            </el-form-item>
            <el-form-item :label="$t('slideManagement.dialog.remarkTt')" prop="remark" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('slideManagement.dialog.remarkPh')" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('slideManagement.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton
            colorStyle="blue"
            :loadingFlag="buttonLoading"
            type="primary"
            :title="$t('slideManagement.dialog.footerSubmitTt')"
            :width="100"
            @onClick="submitForm"
          />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="slide" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listSlide, getSlide, delSlide, addSlide, updateSlide } from '@/api/portCustomer/slideManagement';
// IMPORT TYPE
import { SlideVO, SlideQuery, SlideForm } from '@/api/portCustomer/slideManagement/types';
import { ElForm } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { sys_normal_disable } = toRefs<any>(proxy?.useDict("sys_normal_disable"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const slideList = ref<SlideVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const ids = ref<Array<string | number>>([]);
const total = ref(0);
const rowKey = ref('id');
const oprOptions = ref<string[]>([]);
const slideFormRef = ref(ElForm);
let opr:any;
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '600px'
});
const columns = ref<GridColumn[]>([
  { prop: "id", name: 'slideManagement.columns.idLb', sortable: true, size: 10, show: false, readonly: true, },
  { prop: "slideUrl", name: 'slideManagement.columns.slideUrlLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "createTime", name: 'slideManagement.columns.createTimeLb', sortable: true, size: 250, show: true, readonly: true, formatter: 'datetime' },
  { prop: "remark", name: 'slideManagement.columns.remarkLb', sortable: true, size: 200, show: true, readonly: true },
  { prop: "operate", name: 'slideManagement.columns.operateLb', size: 120, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', color: 'gray', title: 'slideManagement.columns.editLb', permissionKey: 'portCustomer:slideManagement:edit',
        click: (rowIndex: number) => { handleUpdate(slideList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'delete', color: 'red', title: 'slideManagement.columns.deleteLb', permissionKey: 'portCustomer:slideManagement:remove',
        click: (rowIndex: number) => { handleDelete(slideList.value[rowIndex]); }
      }
    ]
  }
]);
const initFormData: SlideForm = {
  id: undefined,
  slideUrl: '',
  remark: ''
}
const data = reactive<PageData<SlideForm, SlideQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    slideUrl: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    slideUrl: [
      { required: true, message: i18n.global.t('slideManagement.dialog.rules.slideRqMsg'), trigger: "blur" }
    ],
  }
});
const { queryParams, form, rules} = toRefs(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query Slide list */
const getList = async () => {
  loading.value = true;
  const res = await listSlide(queryParams.value);
  slideList.value = res.rows;
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
  slideFormRef.value.resetFields();
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
  dialog.title = i18n.global.t('slideManagement.dialog.addTt');
  nextTick(async () => {
    reset();
    const { data } = await getSlide();
  });
}
/** Edit button action */
const handleUpdate = (row?: SlideVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('slideManagement.dialog.editTt');
  nextTick(async () => {
    reset();
    const id = row?.id || ids.value[0]
    const { data } = await getSlide(id);
    nextTick(async () => {
    });
    Object.assign(form.value, data);
  });
}
/** Submit button */
const submitForm = () => {
  slideFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateSlide(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addSlide(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess(i18n.global.t('slideManagement.operationMsg.submitSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
}
/** Delete button action */
const handleDelete = async (row?: SlideVO) => {
  const apiIds = row?.id || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('slideManagement.operationMsg.deleteCf')).finally(() => loading.value = false);
  await delSlide(apiIds);
  proxy?.$modal.msgSuccess(i18n.global.t('slideManagement.operationMsg.deleteSuccess'));
  await getList();
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
});
</script>