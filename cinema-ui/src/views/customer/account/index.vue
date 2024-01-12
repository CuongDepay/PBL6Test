<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="customerList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('account.searchInput.nickNameLb')" prop="nickName" class="form-item-search">
        <el-input
          v-model="queryParams.nickName"
          :placeholder="$t('account.searchInput.nickNamePh')"
          style="width: 150px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or Modify  Dialog -->
          <el-form ref="customerFormRef" :model="form" :rules="rules" label-width="110px" class="common-form">
            <el-form-item :label="$t('account.dialog.userNameTt')" prop="userName" class="form-item-row">
              <el-input v-model="form.userName" :placeholder="$t('account.dialog.userNamePh')" />
            </el-form-item>
            <el-form-item :label="$t('account.dialog.nickNameTt')" prop="nickName" class="form-item-row">
              <el-input v-model="form.nickName" :placeholder="$t('account.dialog.nickNamePh')" />
            </el-form-item>
            <el-form-item :label="$t('account.dialog.customerTypeTt')" prop="customerType" class="form-item-row">
              <el-input v-model="form.customerType" :placeholder="$t('account.dialog.customerTypePh')" />
            </el-form-item>
            <el-form-item :label="$t('account.dialog.emailTt')" prop="email" class="form-item-row">
              <el-input v-model="form.email" :placeholder="$t('account.dialog.emailPh')" />
            </el-form-item>
            <el-form-item :label="$t('account.dialog.phonenumberTt')" prop="phonenumber" class="form-item-row">
              <el-input v-model="form.phonenumber" :placeholder="$t('account.dialog.phonenumberPh')" />
            </el-form-item>
            <el-form-item :label="$t('account.dialog.sexTt')" prop="sex" class="form-item-row">
              <el-input v-model="form.sex" :placeholder="$t('account.dialog.sexPh')" />
            </el-form-item>
            <el-form-item :label="$t('account.dialog.avatarTt')" prop="avatar" class="form-item-row">
              <el-input v-model="form.avatar" :placeholder="$t('account.dialog.avatarPh')" />
            </el-form-item>
            <el-form-item :label="$t('account.dialog.passwordTt')" prop="password" class="form-item-row">
              <el-input v-model="form.password" :placeholder="$t('account.dialog.passwordPh')" />
            </el-form-item>
            <el-form-item :label="$t('account.dialog.statusTt')" prop="status" class="form-item-row">
              <el-input v-model="form.status" :placeholder="$t('account.dialog.statusPh')" />
            </el-form-item>
            <el-form-item :label="$t('account.dialog.remarkTt')" prop="remark" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('account.dialog.remarkPh')" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('account.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton
            colorStyle="blue"
            :loadingFlag="buttonLoading"
            type="primary"
            :title="$t('account.dialog.footerSubmitTt')"
            :width="100"
            @onClick="submitForm"
          />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="customer" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listCustomer, getCustomer, delCustomer, addCustomer, updateCustomer } from '@/api/customer/account';
// IMPORT TYPE
import { CustomerVO, CustomerQuery, CustomerForm } from '@/api/customer/account/types';
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
const customerList = ref<CustomerVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const ids = ref<Array<string | number>>([]);
const total = ref(0);
const rowKey = ref('id');
const oprOptions = ref<string[]>([]);
const customerFormRef = ref(ElForm);
let opr:any;
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '600px'
});
const columns = ref<GridColumn[]>([
  { prop: "userId", name: 'account.columns.userIdLb', sortable: true, size: 10, show: false, readonly: true, },
  { prop: "userName", name: 'account.columns.userNameLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "nickName", name: 'account.columns.nickNameLb', sortable: true, size: 350, show: true, readonly: true, align: 'left' },
  { prop: "customerType", name: 'account.columns.customerTypeLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "email", name: 'account.columns.emailLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "phonenumber", name: 'account.columns.phonenumberLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "sex", name: 'account.columns.sexLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "avatar", name: 'account.columns.avatarLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "password", name: 'account.columns.passwordLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "status", name: 'account.columns.statusLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "remark", name: 'account.columns.remarkLb', sortable: true, size: 200, show: true, readonly: true },
  { prop: "operate", name: 'account.columns.operateLb', size: 120, show: true, readonly: true, pin: 'colPinEnd',
  }
]);
const initFormData: CustomerForm = {
  userId: undefined,
  userName: '',
  nickName: '',
  customerType: '',
  email: '',
  phonenumber: '',
  sex: '',
  avatar: '',
  password: '',
  status: '',
  remark: ''
}
const data = reactive<PageData<CustomerForm, CustomerQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    userName: '',
  nickName: '',
  customerType: '',
  email: '',
  phonenumber: '',
  sex: '',
  avatar: '',
  password: '',
  status: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
});
const { queryParams, form, rules} = toRefs(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query  list */
const getList = async () => {
  loading.value = true;
  const res = await listCustomer(queryParams.value);
  customerList.value = res.rows;
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
  customerFormRef.value.resetFields();
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
  dialog.title = i18n.global.t('account.dialog.addTt');
  nextTick(async () => {
    reset();
    const { data } = await getCustomer();
  });
}
/** Edit button action */
const handleUpdate = (row?: CustomerVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('account.dialog.editTt');
  nextTick(async () => {
    reset();
    const id = row?.id || ids.value[0]
    const { data } = await getCustomer(id);
    nextTick(async () => {
    });
    Object.assign(form.value, data);
  });
}
/** Submit button */
const submitForm = () => {
  customerFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateCustomer(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addCustomer(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess(i18n.global.t('account.operationMsg.submitSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
}
/** Delete button action */
const handleDelete = async (row?: CustomerVO) => {
  const apiIds = row?.id || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('account.operationMsg.deleteCf')).finally(() => loading.value = false);
  await delCustomer(apiIds);
  proxy?.$modal.msgSuccess(i18n.global.t('account.operationMsg.deleteSuccess'));
  await getList();
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
});
</script>
