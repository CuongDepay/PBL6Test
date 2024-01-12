<template>
  <Layout1
    :loading="loading"
    :rowData="roles"
    :columnSetting="columns"
    :rowKey="rowKey"
    :total="total"
    :checkboxCol="true"
    :readonly="true"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('user.authRole.searchInput.nickNameLb')" prop="nickName" class="form-item-search">
        <el-input v-model="form.nickName" style="width: 200px" disabled />
      </el-form-item>
      <el-form-item :label="$t('user.authRole.searchInput.userNameLb')" prop="userName" class="form-item-search">
        <el-input v-model="form.userName" style="width: 200px" disabled />
      </el-form-item>
    </template>
    <template v-slot:right-footer>
      <IrButton colorStyle="gray" type="secondary" :title="$t('user.authRole.footerCancelTt')" :width="100" @click="close()" />
      <IrButton colorStyle="blue" type="primary" :title="$t('user.authRole.footerSubmitTt')" :width="100" @click="submitForm()" />
    </template>
  </Layout1>
</template>

<script setup name="AuthRole" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { getAuthRole, updateAuthRole } from '@/api/system/user';
// IMPORT TYPE
import { RoleVO } from '@/api/system/role/types';
import { UserForm } from '@/api/system/user/types';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from 'vue';
const route = useRoute();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const loading = ref(true);
const total = ref(0);
const rowKey = ref('roleId');
const roleIds = ref<Array<string | number>>([]);
const roles = ref<RoleVO[]>();
const form = ref<Partial<UserForm>>({
  nickName: undefined,
  userName: '',
  userId: undefined
});
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "roleId", name: 'user.authRole.columns.roleIdLb', sortable: false, size: 100, show: true, readonly: true, },
  { prop: "roleName", name: 'user.authRole.columns.roleNameLb', sortable: false, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "roleKey", name: 'user.authRole.columns.roleKeyLb', sortable: false, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "createTime", name: 'user.authRole.columns.createTimeLb', sortable: false, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  }
]);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  roleIds.value = selectedIds.value;
}
const getList = async() => {
  const userId = route.params && route.params.userId;
  if (userId) {
    loading.value = true;
    const res = await getAuthRole(userId as string);
    Object.assign(form.value, res.data.user)
    // Object.assign(roles.value, res.data.roles)
    roles.value = res.data.roles;
    total.value = roles.value.length;
    await nextTick(() => {
      roles.value?.forEach(row => {
        if (row?.flag) {
          row.checkbox = true;
        }
      });
    });
    loading.value = false;
  }
}
/** close button */
const close = () => {
  const obj = { path: "/system/user" };
  proxy?.$tab.closeOpenPage(obj);
};
/** Submit button */
const submitForm = async () => {
  const userId = form.value.userId;
  const rIds = roleIds.value.join(",");
  await updateAuthRole({ userId: userId as string, roleIds: rIds })
  proxy?.$modal.msgSuccess(i18n.global.t('user.authRole.submitSuccess'));
  close();
};
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
})
</script>
