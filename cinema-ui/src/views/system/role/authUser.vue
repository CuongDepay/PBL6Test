<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="userList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('role.authUser.searchInput.userNameLb')" prop="userName" class="form-item-search">
        <el-input
          v-model="queryParams.userName"
          :placeholder="$t('role.authUser.searchInput.userNamePh')"
          style="width: 200px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('role.authUser.searchInput.phonenumberLb')" prop="phonenumber" class="form-item-search">
        <el-input
          v-model="queryParams.phonenumber"
          :placeholder="$t('role.authUser.searchInput.phonenumberPh')"
          style="width: 200px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('role.authUser.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['system:role:add']"
        @onClick="openSelectUser"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!userIds.length"
        :title="$t('role.authUser.headerButton.deauthorizeTt')"
        leftIcon="close-circle"
        v-hasPermi="['system:role:remove']"
        @onClick="cancelAuthUserAll"
      />
      <IrButton colorStyle="gray" type="secondary" :title="$t('role.authUser.headerButton.closeTt')" leftIcon="close" @onClick="handleClose" />
    </template>
    <template v-slot:dialog>
      <select-user ref="selectRef" :roleId="queryParams.roleId" @ok="handleQuery" />
    </template>
  </Layout1>
</template>

<script setup name="AuthUser" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
import SelectUser from "./selectUser.vue";
// IMPORT API
import { allocatedUserList, authUserCancel, authUserCancelAll } from "@/api/system/role";
// IMPORT TYPE
import { UserQuery } from "@/api/system/user/types";
import { UserVO } from "@/api/system/user/types";
// IMPORT GLOBAL TOOL (PROXY)
import i18n from "@/lang";
import { ComponentInternalInstance } from "vue";
// import { ElForm, ElSelect} from 'element-plus';
const route = useRoute();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { sys_normal_disable } = toRefs<any>(proxy?.useDict("sys_normal_disable"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const userList = ref<UserVO[]>([]);
const loading = ref(true);
const total = ref(0);
const rowKey = ref('userId');
const userIds = ref<Array<string | number>>([]);
const selectRef = ref(SelectUser);
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "userName", name: 'role.authUser.columns.userNameLb', sortable: true, size: 200, show: true, readonly: true, align: 'left' },
  { prop: "nickName", name: 'role.authUser.columns.nickNameLb', sortable: true, size: 200, show: true, readonly: true, align: 'left' },
  { prop: "email", name: 'role.authUser.columns.emailLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "phonenumber", name: 'role.authUser.columns.phonenumberLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "status", name: 'role.authUser.columns.statusLb', sortable: true, size: 120, show: true, readonly: true, dictData: sys_normal_disable },
  { prop: "createTime", name: 'role.authUser.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "operate", name: 'role.authUser.columns.operateLb', size: 80, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'close-circle', title: 'role.authUser.columns.operateAuthUserLb', color: 'red', permissionKey: 'system:role:remove',
        click: (rowIndex: number) => { cancelAuthUser(userList.value[rowIndex]); }
      }
    ]
  }
]);
const queryParams = reactive<UserQuery>({
  pageNum: 1,
  pageSize: 20,
  roleId: route.params.roleId as string,
  userName: undefined,
  phonenumber: undefined,
  orderByColumn: 'createTime',
  isAsc: 'descending'
});
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  userIds.value = selectedIds.value;
}
/** Query the list of authorized users */
const getList = async () => {
  loading.value = true;
  const res = await allocatedUserList(queryParams);
  userList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}
// back button
const handleClose = () => {
  const obj = { path: "/system/role" };
  proxy?.$tab.closeOpenPage(obj);
}
/** Search button action */
const handleQuery=() => {
  queryParams.pageNum = 1;
  getList();
}
/** Reset button action */
const resetQuery=() =>{
  handleQuery();
}
/** Open the authorized user form popup */
const openSelectUser = () => {
    selectRef.value.show();
}
/** Deauthorize button action */
const cancelAuthUser = async (row: UserVO) => {
  await proxy?.$modal.confirmWarning(i18n.global.t('role.authUser.operationMsg.cancelAuthCf', { username: row.userName }));
  await authUserCancel({ userId: row.userId, roleId: queryParams.roleId });
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('role.authUser.operationMsg.cancelAuthSuccess'));
}
/** Batch deauthorize button actions */
const cancelAuthUserAll = async () => {
  const roleId = queryParams.roleId;
  const uIds = userIds.value.join(",");
  await proxy?.$modal.confirmWarning(i18n.global.t('role.authUser.operationMsg.cancelAuthUserAllCf'));
  await authUserCancelAll({ roleId: roleId, userIds: uIds });
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('role.authUser.operationMsg.cancelAuthUserAllSuccess'));
}

onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped></style>
