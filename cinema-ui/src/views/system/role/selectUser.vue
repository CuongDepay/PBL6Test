<template>
  <IrDialog :dialog="dialog">
    <template v-slot:body>
      <Layout1
        :loading="loading"
        :queryParams="queryParams"
        :total="total"
        :rowData="userList"
        :columnSetting="columns"
        :rowKey="rowKey"
        :checkboxCol="true"
        :dialog="true"
        @onSearch="handleQuery"
        @onReset="resetQuery"
        @onSelectedRows="handleSeletectRows"
        @onPaging="getList"
      >
        <template v-slot:search-input>
          <el-form-item :label="$t('role.authUser.selectUser.userNameLb')" prop="userName" class="form-item-search">
            <el-input
              v-model="queryParams.userName"
              :placeholder="$t('role.authUser.selectUser.userNamePh')"
              style="width: 200px"
              @keyup.enter="handleQuery"
              clearable
            />
          </el-form-item>
          <el-form-item :label="$t('role.authUser.selectUser.phonenumberLb')" prop="phonenumber" class="form-item-search">
            <el-input
              v-model="queryParams.phonenumber"
              :placeholder="$t('role.authUser.selectUser.phonenumberPh')"
              style="width: 200px"
              @keyup.enter="handleQuery"
              clearable
            />
          </el-form-item>
        </template>
      </Layout1>
    </template>
    <template v-slot:footer>
      <IrButton
        colorStyle="gray"
        type="secondary"
        :title="$t('role.authUser.selectUser.cancelBtnTt')"
        :width="100"
        @onClick="dialog.visible = false"
      />
      <IrButton colorStyle="blue" type="primary" :title="$t('role.authUser.selectUser.saveBtnTt')" :width="100" @onClick="handleSelectUser" />
    </template>
  </IrDialog>
</template>

<script setup name="SelectUser" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { authUserSelectAll, unallocatedUserList } from "@/api/system/role";
// IMPORT TYPE
import { UserVO } from '@/api/system/user/types';
import { UserQuery } from '@/api/system/user/types';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from "@/lang";
import { ComponentInternalInstance } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { sys_normal_disable } = toRefs<any>(proxy?.useDict('sys_normal_disable'));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const props = defineProps({
  roleId: {
    type: [Number, String]
  }
})
const userList = ref<UserVO[]>([]);
const total = ref(0);
const userIds = ref<Array<string | number>>([]);
const loading = ref(false);
const rowKey = ref('userId');
const queryParams = reactive<UserQuery>({
  pageNum: 1,
  pageSize: 20,
  roleId: undefined,
  userName: undefined,
  phonenumber: undefined,
  orderByColumn: 'createTime',
  isAsc: 'descending'
})
const dialog = reactive<DialogOption>({
  visible: false,
  title: i18n.global.t('role.authUser.selectUser.tt'),
  width: '800px'
});
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "userName", name: 'role.authUser.selectUser.columns.userNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "nickName", name: 'role.authUser.selectUser.columns.nickNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "email", name: 'role.authUser.selectUser.columns.emailLb', sortable: true, size: 170, show: true, readonly: true, align: 'left' },
  { prop: "phonenumber", name: 'role.authUser.selectUser.columns.phonenumberLb', sortable: true, size: 120, show: true, readonly: true },
  { prop: "status", name: 'role.authUser.selectUser.columns.statusLb', sortable: true, size: 120, show: true, readonly: true, dictData: sys_normal_disable },
  { prop: "createTime", name: 'role.authUser.selectUser.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  }
]);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  userIds.value = selectedIds.value;
}
/** Query data */
const getList = async () => {
  const res = await unallocatedUserList(queryParams);
  userList.value = res.rows;
  total.value = res.total;
}
const show = () => {
  handleQuery();
  dialog.visible = true;
}
/** Search button action */
const handleQuery = () => {
  queryParams.pageNum = 1;
  queryParams.roleId = props.roleId;
  getList();
}
/** Reset button action */
const resetQuery = () => {
  getList();
}
const emit = defineEmits(["ok"]);
/** Select Authorized User Actions */
const handleSelectUser = async () => {
  const roleId = props.roleId;
  const ids = userIds.value.join(',');
  if (ids == "") {
    proxy?.$modal.msgError(i18n.global.t('role.authUser.selectUser.saveErrorMsg'));
    return;
  }
  await authUserSelectAll({ roleId, userIds: ids });
  proxy?.$modal.msgSuccess(i18n.global.t('role.authUser.selectUser.saveSuccessMsg'));
  emit('ok');
  dialog.visible = false;
}
// exposed
defineExpose({
  show,
});
</script>

<style scoped></style>
