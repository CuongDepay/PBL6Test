<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="seatTypeList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('seatTypeManagement.searchInput.seatTypeNameLb')" prop="seatTypeName" class="form-item-search">
        <el-input
          v-model="queryParams.seatTypeName"
          :placeholder="$t('seatTypeManagement.searchInput.seatTypeNamePh')"
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
        :title="$t('seatTypeManagement.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['portCustomer:seatTypeManagement:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('seatTypeManagement.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['portCustomer:seatTypeManagement:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('seatTypeManagement.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['portCustomer:seatTypeManagement:remove']"
        @onClick="handleDelete"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or Modify SeatType Dialog -->
          <el-form ref="seatTypeFormRef" :model="form" :rules="rules" label-width="110px" class="common-form">
            <el-form-item :label="$t('seatTypeManagement.dialog.seatTypeNameTt')" prop="seatTypeName" class="form-item-row">
              <el-input v-model="form.seatTypeName" :placeholder="$t('seatTypeManagement.dialog.seatTypeNamePh')" />
            </el-form-item>
            <el-form-item :label="$t('seatTypeManagement.dialog.priceTt')" prop="price" class="form-item-row">
              <el-input v-model="form.price" :placeholder="$t('seatTypeManagement.dialog.pricePh')" />
            </el-form-item>
            <el-form-item :label="$t('seatTypeManagement.dialog.remarkTt')" prop="remark" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('seatTypeManagement.dialog.remarkPh')" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('seatTypeManagement.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton
            colorStyle="blue"
            :loadingFlag="buttonLoading"
            type="primary"
            :title="$t('seatTypeManagement.dialog.footerSubmitTt')"
            :width="100"
            @onClick="submitForm"
          />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="seatType" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listSeatType, getSeatType, delSeatType, addSeatType, updateSeatType } from '@/api/portCustomer/seatTypeManagement';
// IMPORT TYPE
import { SeatTypeVO, SeatTypeQuery, SeatTypeForm } from '@/api/portCustomer/seatTypeManagement/types';
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
const seatTypeList = ref<SeatTypeVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const ids = ref<Array<string | number>>([]);
const total = ref(0);
const rowKey = ref('id');
const seatTypeFormRef = ref(ElForm);
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '600px'
});
const columns = ref<GridColumn[]>([
  { prop: "id", name: 'seatTypeManagement.columns.idLb', sortable: true, size: 10, show: false, readonly: true, },
  { prop: "seatTypeName", name: 'seatTypeManagement.columns.seatTypeNameLb', sortable: true, size: 250, show: true, readonly: true, align: 'left'  },
  { prop: "price", name: 'seatTypeManagement.columns.priceLb', sortable: true, size: 150, show: true, readonly: true, align: 'right', formatter: 'money' },
  { prop: "createTime", name: 'seatTypeManagement.columns.createTimeLb', sortable: true, size: 150, show: true, readonly: true, formatter: 'datetime' },
  { prop: "remark", name: 'seatTypeManagement.columns.remarkLb', sortable: true, size: 150, show: true, readonly: true },
  { prop: "operate", name: 'seatTypeManagement.columns.operateLb', size: 120, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', color: 'gray', title: 'seatTypeManagement.columns.editLb', permissionKey: 'portCustomer:seatTypeManagement:edit',
        click: (rowIndex: number) => { handleUpdate(seatTypeList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'delete', color: 'red', title: 'seatTypeManagement.columns.deleteLb', permissionKey: 'portCustomer:seatTypeManagement:remove',
        click: (rowIndex: number) => { handleDelete(seatTypeList.value[rowIndex]); }
      }
    ]
  }
]);
const initFormData: SeatTypeForm = {
  id: undefined,
  seatTypeName: '',
  price: undefined,
  remark: ''
}
const data = reactive<PageData<SeatTypeForm, SeatTypeQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    seatTypeName: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    title: [
      { required: true, message: i18n.global.t('seatTypeManagement.dialog.rules.titleRqMsg'), trigger: "blur" }
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
/** Query SeatType list */
const getList = async () => {
  loading.value = true;
  const res = await listSeatType(queryParams.value);
  seatTypeList.value = res.rows;
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
  seatTypeFormRef.value.resetFields();
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
  dialog.title = i18n.global.t('seatTypeManagement.dialog.addTt');
  nextTick(async () => {
    reset();
    const { data } = await getSeatType();
  });
}
/** Edit button action */
const handleUpdate = (row?: SeatTypeVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('seatTypeManagement.dialog.editTt');
  nextTick(async () => {
    reset();
    const id = row?.id || ids.value[0]
    const { data } = await getSeatType(id);
    nextTick(async () => {
    });
    Object.assign(form.value, data);
  });
}
/** Submit button */
const submitForm = () => {
  seatTypeFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateSeatType(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addSeatType(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess(i18n.global.t('seatTypeManagement.operationMsg.submitSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
}
/** Delete button action */
const handleDelete = async (row?: SeatTypeVO) => {
  const apiIds = row?.id || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('seatTypeManagement.operationMsg.deleteCf')).finally(() => loading.value = false);
  await delSeatType(apiIds);
  proxy?.$modal.msgSuccess(i18n.global.t('seatTypeManagement.operationMsg.deleteSuccess'));
  await getList();
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
});
</script>