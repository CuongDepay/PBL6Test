<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="cinemaList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('cinemaManagement.searchInput.cinemaNameLb')" prop="cinemaName" class="form-item-search">
        <el-input
          v-model="queryParams.cinemaName"
          :placeholder="$t('cinemaManagement.searchInput.cinemaNamePh')"
          style="width: 150px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('cinemaManagement.searchInput.cinemaAddressLb')" prop="cinemaAddress" class="form-item-search">
        <el-input
          v-model="queryParams.cinemaAddress"
          :placeholder="$t('cinemaManagement.searchInput.cinemaAddressPh')"
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
        :title="$t('cinemaManagement.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['portCustomer:cinemaManagement:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('cinemaManagement.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['portCustomer:cinemaManagement:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('cinemaManagement.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['portCustomer:cinemaManagement:remove']"
        @onClick="handleDelete"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or Modify Cinema Dialog -->
          <el-form ref="cinemaFormRef" :model="form" :rules="rules" label-width="110px" class="common-form">
            <el-form-item :label="$t('cinemaManagement.dialog.cinemaNameTt')" prop="cinemaName" class="form-item-row">
              <el-input v-model="form.cinemaName" :placeholder="$t('cinemaManagement.dialog.cinemaNamePh')" />
            </el-form-item>
            <el-form-item :label="$t('cinemaManagement.dialog.cinemaAddressTt')" prop="cinemaAddress" class="form-item-row">
              <el-input v-model="form.cinemaAddress" :placeholder="$t('cinemaManagement.dialog.cinemaAddressPh')" />
            </el-form-item>
            <el-form-item :label="$t('cinemaManagement.dialog.remarkTt')" prop="remark" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('cinemaManagement.dialog.remarkPh')" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('cinemaManagement.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton
            colorStyle="blue"
            :loadingFlag="buttonLoading"
            type="primary"
            :title="$t('cinemaManagement.dialog.footerSubmitTt')"
            :width="100"
            @onClick="submitForm"
          />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="cinema" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listCinema, getCinema, delCinema, addCinema, updateCinema } from '@/api/portCustomer/cinemaManagement';
// IMPORT TYPE
import { CinemaVO, CinemaQuery, CinemaForm } from '@/api/portCustomer/cinemaManagement/types';
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
const cinemaList = ref<CinemaVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const ids = ref<Array<string | number>>([]);
const total = ref(0);
const rowKey = ref('id');
const oprOptions = ref<string[]>([]);
const cinemaFormRef = ref(ElForm);
let opr:any;
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '600px'
});
const columns = ref<GridColumn[]>([
  { prop: "id", name: 'cinemaManagement.columns.idLb', sortable: true, size: 10, show: false, readonly: true, },
  { prop: "cinemaName", name: 'cinemaManagement.columns.cinemaNameLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "cinemaAddress", name: 'cinemaManagement.columns.cinemaAddressLb', sortable: true, size: 350, show: true, readonly: true, align: 'left' },
  { prop: "createTime", name: 'cinemaManagement.columns.createTimeLb', sortable: true, size: 250, show: true, readonly: true, formatter: 'datetime' },
  { prop: "remark", name: 'cinemaManagement.columns.remarkLb', sortable: true, size: 200, show: true, readonly: true },
  { prop: "operate", name: 'cinemaManagement.columns.operateLb', size: 120, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', color: 'gray', title: 'cinemaManagement.columns.editLb', permissionKey: 'portCustomer:cinemaManagement:edit',
        click: (rowIndex: number) => { handleUpdate(cinemaList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'delete', color: 'red', title: 'cinemaManagement.columns.deleteLb', permissionKey: 'portCustomer:cinemaManagement:remove',
        click: (rowIndex: number) => { handleDelete(cinemaList.value[rowIndex]); }
      }
    ]
  }
]);
const initFormData: CinemaForm = {
  id: undefined,
  cinemaName: '',
  cinemaAddress: '',
  remark: ''
}
const data = reactive<PageData<CinemaForm, CinemaQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    cinemaName: '',
    cinemaAddress: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    cinemaName: [
      { required: true, message: i18n.global.t('cinemaManagement.dialog.rules.cinemaNameRqMsg'), trigger: "blur" }
    ],
    cinemaAddress: [
      { required: true, message: i18n.global.t('cinemaManagement.dialog.rules.cinemaAddressRqMsg'), trigger: "blur" }
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
/** Query Cinema list */
const getList = async () => {
  loading.value = true;
  const res = await listCinema(queryParams.value);
  cinemaList.value = res.rows;
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
  cinemaFormRef.value.resetFields();
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
  dialog.title = i18n.global.t('cinemaManagement.dialog.addTt');
  nextTick(async () => {
    reset();
    const { data } = await getCinema();
  });
}
/** Edit button action */
const handleUpdate = (row?: CinemaVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('cinemaManagement.dialog.editTt');
  nextTick(async () => {
    reset();
    const id = row?.id || ids.value[0]
    const { data } = await getCinema(id);
    nextTick(async () => {
    });
    Object.assign(form.value, data);
  });
}
/** Submit button */
const submitForm = () => {
  cinemaFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateCinema(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addCinema(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess(i18n.global.t('cinemaManagement.operationMsg.submitSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
}
/** Delete button action */
const handleDelete = async (row?: CinemaVO) => {
  const apiIds = row?.id || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('cinemaManagement.operationMsg.deleteCf')).finally(() => loading.value = false);
  await delCinema(apiIds);
  proxy?.$modal.msgSuccess(i18n.global.t('cinemaManagement.operationMsg.deleteSuccess'));
  await getList();
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
});
</script>
