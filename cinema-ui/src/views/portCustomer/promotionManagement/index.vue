<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="promotionList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('promotionManagement.searchInput.titleLb')" prop="title" class="form-item-search">
        <el-input
          v-model="queryParams.title"
          :placeholder="$t('promotionManagement.searchInput.titlePh')"
          style="width: 150px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('promotionManagement.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['portCustomer:promotionManagement:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('promotionManagement.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['portCustomer:promotionManagement:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('promotionManagement.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['portCustomer:promotionManagement:remove']"
        @onClick="handleDelete"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or Modify Promotion Dialog -->
          <el-form ref="promotionFormRef" :model="form" :rules="rules" label-width="110px" class="common-form">
            <el-form-item :label="$t('promotionManagement.dialog.titleTt')" prop="title" class="form-item-row">
              <el-input v-model="form.title" :placeholder="$t('promotionManagement.dialog.titlePh')" />
            </el-form-item>
            <el-form-item :label="$t('promotionManagement.dialog.promotionDescriptionTt')" prop="promotionDescription" class="form-item-row">
              <el-input v-model="form.promotionDescription" :placeholder="$t('promotionManagement.dialog.promotionDescriptionPh')" />
            </el-form-item>
            <el-form-item :label="$t('promotionManagement.dialog.discountTt')" prop="discount" class="form-item-row">
              <el-input v-model="form.discount" :placeholder="$t('promotionManagement.dialog.discountPh')" />
            </el-form-item>
            <el-form-item :label="$t('promotionManagement.dialog.imageUrlTt')" prop="imageUrl" class="form-item-row">
              <el-input v-model="form.imageUrl" :placeholder="$t('promotionManagement.dialog.imageUrlPh')" />
            </el-form-item>
            <el-form-item :label="$t('promotionManagement.dialog.fromDateTt')" prop="fromDate" class="form-item-row">
              <el-input v-model="form.fromDate" :placeholder="$t('promotionManagement.dialog.fromDatePh')" />
            </el-form-item>
            <el-form-item :label="$t('promotionManagement.dialog.toDateTt')" prop="toDate" class="form-item-row">
              <el-input v-model="form.toDate" :placeholder="$t('promotionManagement.dialog.toDatePh')" />
            </el-form-item>
            <el-form-item :label="$t('promotionManagement.dialog.remarkTt')" prop="remark" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('promotionManagement.dialog.remarkPh')" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('promotionManagement.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton
            colorStyle="blue"
            :loadingFlag="buttonLoading"
            type="primary"
            :title="$t('promotionManagement.dialog.footerSubmitTt')"
            :width="100"
            @onClick="submitForm"
          />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="promotion" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listPromotion, getPromotion, delPromotion, addPromotion, updatePromotion } from '@/api/portCustomer/promotionManagement';
// IMPORT TYPE
import { PromotionVO, PromotionQuery, PromotionForm } from '@/api/portCustomer/promotionManagement/types';
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
const promotionList = ref<PromotionVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const ids = ref<Array<string | number>>([]);
const total = ref(0);
const rowKey = ref('id');
const oprOptions = ref<string[]>([]);
const promotionFormRef = ref(ElForm);
let opr:any;
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '600px'
});
const columns = ref<GridColumn[]>([
  { prop: "id", name: 'promotionManagement.columns.idLb', sortable: true, size: 10, show: false, readonly: true, },
  { prop: "title", name: 'promotionManagement.columns.titleLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "promotionDescription", name: 'promotionManagement.columns.promotionDescriptionLb', sortable: true, size: 350, show: true, readonly: true, align: 'left' },
  { prop: "discount", name: 'promotionManagement.columns.discountLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "imageUrl", name: 'promotionManagement.columns.imageUrlLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "fromDate", name: 'promotionManagement.columns.fromDateLb', sortable: true, size: 350, show: true, readonly: true, editor: 'datetime', datePickerProps: {
        pickerType: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        format: 'DD/MM/YYYY HH:mm',
        placeholder: 'DD/MM/YYYY HH:mm',
      },},
  { prop: "toDate", name: 'promotionManagement.columns.toDateLb', sortable: true, size: 350, show: true, readonly: true, editor: 'datetime', datePickerProps: {
        pickerType: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        format: 'DD/MM/YYYY HH:mm',
        placeholder: 'DD/MM/YYYY HH:mm',
      },},
  { prop: "createTime", name: 'promotionManagement.columns.createTimeLb', sortable: true, size: 250, show: true, readonly: true, formatter: 'datetime' },
  { prop: "remark", name: 'promotionManagement.columns.remarkLb', sortable: true, size: 200, show: true, readonly: true },
  { prop: "operate", name: 'promotionManagement.columns.operateLb', size: 120, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', color: 'gray', title: 'promotionManagement.columns.editLb', permissionKey: 'portCustomer:promotionManagement:edit',
        click: (rowIndex: number) => { handleUpdate(promotionList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'delete', color: 'red', title: 'promotionManagement.columns.deleteLb', permissionKey: 'portCustomer:promotionManagement:remove',
        click: (rowIndex: number) => { handleDelete(promotionList.value[rowIndex]); }
      }
    ]
  }
]);
const initFormData: PromotionForm = {
  id: undefined,
  title: '',
  promotionDescription: '',
  discount: '',
  imageUrl: '',
  fromDate: '',
  toDate: '',
  remark: ''
}
const data = reactive<PageData<PromotionForm, PromotionQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    title: '',
    promotionDescription: '',
    discount: '',
    imageUrl: '',
    fromDate: '',
    toDate: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    title: [
      { required: true, message: i18n.global.t('promotionManagement.dialog.rules.titleRqMsg'), trigger: "blur" }
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
/** Query Promotion list */
const getList = async () => {
  loading.value = true;
  const res = await listPromotion(queryParams.value);
  promotionList.value = res.rows;
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
  promotionFormRef.value.resetFields();
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
  dialog.title = i18n.global.t('promotionManagement.dialog.addTt');
  nextTick(async () => {
    reset();
    const { data } = await getPromotion();
  });
}
/** Edit button action */
const handleUpdate = (row?: PromotionVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('promotionManagement.dialog.editTt');
  nextTick(async () => {
    reset();
    const id = row?.id || ids.value[0]
    const { data } = await getPromotion(id);
    nextTick(async () => {
    });
    Object.assign(form.value, data);
  });
}
/** Submit button */
const submitForm = () => {
  promotionFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updatePromotion(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addPromotion(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess(i18n.global.t('promotionManagement.operationMsg.submitSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
}
/** Delete button action */
const handleDelete = async (row?: PromotionVO) => {
  const apiIds = row?.id || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('promotionManagement.operationMsg.deleteCf')).finally(() => loading.value = false);
  await delPromotion(apiIds);
  proxy?.$modal.msgSuccess(i18n.global.t('promotionManagement.operationMsg.deleteSuccess'));
  await getList();
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
});
</script>