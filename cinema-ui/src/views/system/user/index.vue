<template>
  <Layout2
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
    <template v-slot:left-panel>
      <div>
        <el-input v-model="deptName" :placeholder="$t('user.leftPanel.searchPlaceholder')" clearable>
          <template v-slot:prefix>
            <svg-icon class-name="search-icon" icon-class="search" />
          </template>
        </el-input>
        <el-tree
          class="mt-2"
          ref="deptTreeRef"
          node-key="id"
          :data="deptOptions"
          :props="{ label: 'label', children: 'children' }"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          highlight-current
          default-expand-all
          @node-click="handleNodeClick"
        />
      </div>
    </template>
    <template v-slot:search-input>
      <el-form-item :label="$t('user.searchInput.userNameLb')" prop="userName" class="form-item-search">
        <el-input
          v-model="queryParams.userName"
          :placeholder="$t('user.searchInput.userNamePh')"
          clearable
          style="width: 150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('user.searchInput.phonenumberLb')" prop="phonenumber" class="form-item-search">
        <el-input
          v-model="queryParams.phonenumber"
          :placeholder="$t('user.searchInput.phonenumberPh')"
          clearable
          style="width: 180px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('user.searchInput.statusLb')" prop="status" class="form-item-search">
        <el-select v-model="queryParams.status" :placeholder="$t('user.searchInput.statusPh')" clearable style="width: 150px">
          <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('user.searchInput.createTimeLb')" style="width: 230px;" class="form-item-search">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          format="DD/MM/YYYY"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('user.searchInput.createTimeStartPh')"
          :end-placeholder="$t('user.searchInput.createTimeEndPh')"
          @change="handleQuery"
        />
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('user.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['system:user:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('user.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['system:user:add']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('user.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['system:user:delete']"
        @onClick="handleDelete"
      />
      <MoreButton>
        <template v-slot:content>
          <IrButton
            colorStyle="gray"
            type="secondary"
            :title="$t('user.headerButton.importTemplateTt')"
            leftIcon="download"
            @onClick="importTemplate"
          />
          <IrButton colorStyle="gray" type="secondary" :title="$t('user.headerButton.importTt')" leftIcon="upload" @onClick="handleImport" />
          <IrButton colorStyle="gray" type="secondary" :title="$t('user.headerButton.exportTt')" leftIcon="download" @onClick="handleExport" />
        </template>
      </MoreButton>
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or Modify Post Dialog -->
          <el-form ref="userFormRef" :model="form" :rules="rules" label-width="120px" class="common-form">
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('user.dialog.cinemaLb')" prop="cinemaId" class="form-item-row">
                  <el-select v-model="form.cinemaId" :placeholder="$t('user.dialog.cinemaPh')">
                    <el-option
                      v-for="item in cinemaOptions"
                      :key="item.id"
                      :label="item.cinemaName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item :label="$t('user.dialog.nickNameLb')" prop="nickName" class="form-item-row">
                  <el-input v-model="form.nickName" :placeholder="$t('user.dialog.nickNamePh')" maxlength="255" />
                </el-form-item>
              </el-col>
              <el-col :span="2" />
              <el-col :span="11">
                <el-form-item :label="$t('user.dialog.deptIdLb')" prop="deptId" class="form-item-row">
                  <el-tree-select
                    v-model="form.deptId"
                    :data="deptOptions"
                    :props="{ value: 'id', label: 'label', children: 'children' }"
                    value-key="id"
                    :placeholder="$t('user.dialog.deptIdPh')"
                    check-strictly
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item :label="$t('user.dialog.phonenumberLb')" prop="phonenumber" class="form-item-row">
                  <el-input v-model="form.phonenumber" :placeholder="$t('user.dialog.phonenumberPh')" maxlength="11" />
                </el-form-item>
              </el-col>
              <el-col :span="2" />
              <el-col :span="11">
                <el-form-item :label="$t('user.dialog.emailLb')" prop="email" class="form-item-row">
                  <el-input v-model="form.email" :placeholder="$t('user.dialog.emailPh')" maxlength="50" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item v-if="form.userId == undefined" :label="$t('user.dialog.userNameLb')" prop="userName" class="form-item-row">
                  <el-input v-model="form.userName" :placeholder="$t('user.dialog.userNamePh')" maxlength="30" />
                </el-form-item>
              </el-col>
              <el-col :span="2" />
              <el-col :span="11">
                <el-form-item v-if="form.userId == undefined" :label="$t('user.dialog.passwordLb')" prop="password" class="form-item-row">
                  <el-input v-model="form.password" :placeholder="$t('user.dialog.passwordPh')" type="password" maxlength="20" show-password />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item :label="$t('user.dialog.sexLb')" class="form-item-row">
                  <el-select v-model="form.sex" :placeholder="$t('user.dialog.sexPh')">
                    <el-option v-for="dict in sys_user_sex" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2" />
              <el-col :span="11">
                <el-form-item :label="$t('user.dialog.statusLb')" class="form-item-row">
                  <el-radio-group v-model="form.status">
                    <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{
                    dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item :label="$t('user.dialog.postIdsLb')" class="form-item-row">
                  <el-select v-model="form.postIds" multiple :placeholder="$t('user.dialog.postIdsPh')">
                    <el-option
                      v-for="item in postOptions"
                      :key="item.postId"
                      :label="item.postName"
                      :value="item.postId"
                      :disabled="item.status == '1'"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2" />
              <el-col :span="11">
                <el-form-item :label="$t('user.dialog.roleIdsLb')" class="form-item-row">
                  <el-select v-model="form.roleIds" multiple :placeholder="$t('user.dialog.roleIdsPh')">
                    <el-option
                      v-for="item in roleOptions"
                      :key="item.roleId"
                      :label="item.roleName"
                      :value="item.roleId"
                      :disabled="item.status == '1'"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('user.dialog.remarkLb')" class="form-item-row">
                  <el-input v-model="form.remark" type="textarea" :placeholder="$t('user.dialog.remarkPh')"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('user.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton colorStyle="blue" type="primary" :title="$t('user.dialog.footerSubmitTt')" :width="100" @onClick="submitForm" />
        </template>
      </IrDialog>
      <IrDialog :dialog="uploadDialog">
        <template v-slot:body>
          <!-- User Import Dialog -->
          <IrUpload ref="uploadRef" :uploadProp="uploadProp" @onFileSuccess="handleFileSuccess" @downloadTemplate="importTemplate" />
        </template>
        <template v-slot:footer>
          <IrButton
            colorStyle="gray"
            type="secondary"
            :title="$t('user.dialog.footerCancelTt')"
            :width="100"
            @onClick="uploadDialog.visible = false"
          />
          <IrButton colorStyle="blue" type="primary" :title="$t('user.dialog.footerSubmitTt')" :width="100" @onClick="submitFileForm" />
        </template>
      </IrDialog>
    </template>
  </Layout2>
</template>
<script setup name="User" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
import { DateModelType, ElTree, ElForm } from 'element-plus';
import IrUpload from '@/components/IrUpload/index.vue';
// IMPORT API
import {
  changeUserStatus,
  listUser,
  resetUserPwd,
  delUser,
  getUser,
  getCinemas,
  updateUser,
  addUser,
  deptTreeSelect
} from "@/api/system/user"
import { treeselect } from "@/api/system/dept";
// IMPORT TYPE
import { UserForm, UserQuery, UserVO } from '@/api/system/user/types';
import { DeptVO } from "@/api/system/dept/types";
import { RoleVO } from "@/api/system/role/types";
import { PostVO } from "@/api/system/post/types";
import { CinemaVO } from "@/api/portCustomer/cinemaManagement/types";
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from "vue";
import { getToken } from "@/utils/auth";
import { to } from "await-to-js";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const router = useRouter();
// IMPORT DICTIONARY
const { sys_normal_disable, sys_user_sex } = toRefs<any>(proxy?.useDict('sys_normal_disable', 'sys_user_sex'));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const loading = ref(true);
const userList = ref<UserVO[]>();
const ids = ref<Array<number | string>>([]);
const total = ref(0);
const rowKey = ref('userId');
const dateRange = ref<[DateModelType, DateModelType]>(['','']);
const deptName = ref('');
const deptOptions = ref<DeptVO[]>([]);
const initPassword = ref('123456');
const postOptions = ref<PostVO[]>([]);
const cinemaOptions = ref<CinemaVO[]>([]);
const roleOptions = ref<RoleVO[]>([]);
const deptTreeRef = ref(ElTree);
const userFormRef = ref(ElForm);
const uploadRef = ref(IrUpload);
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '950px'
});
const uploadDialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '400px'
});
const initFormData: UserForm = {
  userId: undefined,
  deptId: undefined,
  userName: '',
  nickName: undefined,
  password: '',
  phonenumber: undefined,
  email: undefined,
  sex: undefined,
  status: "0",
  remark: '',
  postIds: [],
  roleIds: [],
  cinemaId: undefined
}
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "userId", name: 'user.columns.userIdLb', sortable: true, size: 130, show: false, readonly: true },
  { prop: "userName", name: 'user.columns.userNameLb', sortable: true, size: 120, show: true, readonly: true, align: 'left' },
  { prop: "nickName", name: 'user.columns.nickNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left'},
  { prop: "deptName", name: 'user.columns.deptNameLb', sortable: true, size: 170, show: true, readonly: true, align: 'left' },
  { prop: "phonenumber", name: 'user.columns.phonenumberLb', sortable: true, size: 140, show: true, readonly: true },
  { prop: "status", name: 'user.columns.statusLb', sortable: true, size: 120, show: true, readonly: true,
    switchFunc: (rowIndex: number) => { if (userList.value) handleStatusChange(userList.value[rowIndex]); }
  },
  { prop: "createTime", name: 'user.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "operate", name: 'user.columns.operateLb', size: 170, show: true, readonly: true, pin: 'colPinEnd',
      buttonProps: [
      {
        index: 1, icon: 'edit', color: 'gray', title: 'user.columns.operateEditLb', onlyKeys: [1], key: rowKey.value, permissionKey: 'system:user:edit',
        click: (rowIndex: number) => { if (userList.value) handleUpdate(userList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'delete', color: 'red', title: 'user.columns.operateDeleteLb', onlyKeys: [1], key: rowKey.value, permissionKey: 'system:user:remove',
        click: (rowIndex: number) => { if (userList.value) handleDelete(userList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'reset-pass', color: 'yellow', title: 'user.columns.operateResetPwdLb', onlyKeys: [1], key: rowKey.value, permissionKey: 'system:user:resetPwd',
        click: (rowIndex: number) => { if (userList.value) handleResetPwd(userList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'assign-role', color: 'green', title: 'user.columns.operateAuthRoleLb', onlyKeys: [1], key: rowKey.value, permissionKey: 'system:user:edit',
        click: (rowIndex: number) => { if (userList.value) handleAuthRole(userList.value[rowIndex]); }
      }
    ]
  }
]);
// eslint-disable-next-line no-undef
const data = reactive<PageData<UserForm, UserQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    userName: '',
    phonenumber: '',
    status: '',
    deptId: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    cinemaId: [{ required: true, message: i18n.global.t('user.dialog.rules.cinemaRqMsg'), trigger: "blur" }],
    userName: [{ required: true, message: i18n.global.t('user.dialog.rules.userNameRqMsg'), trigger: "blur" }, { min: 2, max: 40, message: i18n.global.t('user.dialog.rules.userNameMinMaxMsg', { min: 2, max: 40 }), trigger: "blur" }],
    nickName: [{ required: true, message: i18n.global.t('user.dialog.rules.nickNameRqMsg'), trigger: "blur" }],
    password: [{ required: true, message: i18n.global.t('user.dialog.rules.passwordRqMsg'), trigger: "blur" }, { min: 5, max: 255, message: i18n.global.t('user.dialog.rules.passwordMinMaxMsg', { min: 5, max: 255 }), trigger: "blur" }],
    email: [{ type: "email", message: i18n.global.t('user.dialog.rules.emailRqMsg'), trigger: ["blur", "change"] }],
    phonenumber: [{ pattern: /[0-9*]{10}$/, message: i18n.global.t('user.dialog.rules.phonenumberPtMsg'), trigger: "blur" }]
  }
})
// eslint-disable-next-line no-undef
const { queryParams, form, rules } = toRefs<PageData<UserForm, UserQuery>>(data)
/*** User Import Parameters */
// eslint-disable-next-line no-undef
const uploadProp = reactive<ImportOption>({
  // Whether to update existing user data
  updateSupport: 0,
  // Set the upload request header
  headers: { Authorization: import.meta.env.VITE_BEARER_KEY + getToken() },
  // upload address
  url: import.meta.env.VITE_APP_BASE_API + "/system/user/importData",
  type: "excel",
  accept: ".xlsx, .xls",
  templateName: 'user_template.xlsx'
})
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query the department drop-down tree structure */
const getTreeSelect = async () => {
  const res = await deptTreeSelect();
  deptOptions.value = res.data;
};
/** Query user list */
const getList = async () => {
  loading.value = true;
  const res = await listUser(proxy?.addDateRange(queryParams.value, dateRange.value));
  loading.value = false;
  userList.value = res.rows;
  total.value = res.total;
}
/** Search button action */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}
/** Reset button action */
const resetQuery = () => {
  dateRange.value = ['','']
  queryParams.value.pageNum = 1;
  queryParams.value.deptId = undefined;
  deptTreeRef.value.setCurrentKey(null);
  handleQuery();
}
/** Initialize department data */
const initTreeData = async () => {
  // Determine whether the data of the department exists, if it exists, it will not be obtained, if it does not exist, it will be obtained
  if (deptOptions.value === undefined) {
    const { data } = await treeselect();
    deptOptions.value = data;
  }
}
/** filter nodes by condition  */
const filterNode = (value: string, data: any) => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
}
/** Node click event */
const handleNodeClick = (data: DeptVO) => {
  queryParams.value.deptId = data.id;
  queryParams.value.pageNum = 1;
  handleQuery();
}
/** Add button action */
const handleAdd = () => {
  dialog.visible = true;
  dialog.title = i18n.global.t('user.dialog.addTt');
  nextTick(async () => {
    reset();
    await initTreeData();
    const { data } = await getUser();
    postOptions.value = data.posts;
    roleOptions.value = data.roles;
    
    fetchCinema1();
    
    form.value.password = initPassword.value;
  });
}

const fetchCinema1 = async () => {
  const { data } = await getCinemas();
  cinemaOptions.value = data;
}

const fetchCinema2 = async (cinemaId: string | number) => {
  const { data } = await getCinemas(cinemaId);
  cinemaOptions.value = data;
}

/** Edit button action */
const handleUpdate = (row?: UserForm | UserVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('user.dialog.editTt');
  nextTick(async () => {
    reset();
    await initTreeData();
    const userId = row?.userId || ids.value[0];
    const cinemaId = row?.cinemaId || ids.value[0];
    const { data } = await getUser(userId)
    Object.assign(form.value, data.user);
    postOptions.value = data.posts;
    roleOptions.value = data.roles;
    fetchCinema2(cinemaId);
    form.value.postIds = data.postIds;
    form.value.roleIds = data.roleIds;
    form.value.password = "";
  });
}
/** Submit button */
const submitForm = () => {
  userFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      form.value.userId ? await updateUser(form.value) : await addUser(form.value);
      proxy?.$modal.msgSuccess(i18n.global.t('user.operationMsg.submitSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
}
/** Delete button action */
const handleDelete = async (row?: UserVO) => {
  const userIds = row?.userId || ids.value;
  const [err] = await to(proxy?.$modal.confirmDelete(i18n.global.t('user.operationMsg.deleteCf', { username: (row ? ' "' + row?.userName + '"' : '') })) as any);
  if (!err) {
    await delUser(userIds);
    await getList();
    proxy?.$modal.msgSuccess(i18n.global.t('user.operationMsg.deleteSuccess'));
  }
}
/** Reset action sheet */
const reset = () => {
  form.value = { ...initFormData };
  userFormRef.value.resetFields();
}
/** Cancel button */
const cancel = () => {
  reset();
  dialog.visible = false;
}
/** User Status Modification  */
const handleStatusChange = async (row: UserVO) => {
  let text = row.status === "0" ? i18n.global.t('user.operationMsg.statusEnable') : i18n.global.t('user.operationMsg.statusDisable');
  try {
    await proxy?.$modal.confirmWarning(i18n.global.t('user.operationMsg.statusChangeCf', { action: text, username: row.userName }));
    await changeUserStatus(row.userId, row.status);
    proxy?.$modal.msgSuccess(text + i18n.global.t('user.operationMsg.submitSuccess'));
  } catch (err) {
    row.status = row.status === "0" ? "1" : "0";
  }
}
/** Download Template Action */
const importTemplate = () => {
  proxy?.download("system/user/importTemplate", {
  }, `user_template_${new Date().getTime()}.xlsx`);
}
/** Import button action */
const handleImport = () => {
  uploadDialog.title = i18n.global.t('user.operationMsg.importTt');
  uploadDialog.visible = true;
}
/** submit file upload */
function submitFileForm() {
  uploadRef.value.submit();
}
/** File upload successfully processed */
const handleFileSuccess = (response: any) => {
  uploadDialog.visible = false;
  proxy?.$modal.alertSuccess(response.msg, i18n.global.t('user.operationMsg.importResultTt'));
  getList();
}
/** Export button action */
const handleExport = () => {
  proxy?.download("system/user/export", {
    ...queryParams.value,
  }, `user_${new Date().getTime()}.xlsx`);
};
/** Reset password button action */
const handleResetPwd = async (row: UserVO) => {
  const [err, res] = await to(ElMessageBox.prompt(i18n.global.t('user.operationMsg.resetPwdCf', { username: row.userName }), '', {
    confirmButtonText: i18n.global.t('user.operationMsg.resetPwdBtnSave'),
    cancelButtonText: i18n.global.t('user.operationMsg.resetPwdBtnClose'),
    closeOnClickModal: false,
    customClass: "custom-message-box",
    showClose: false,
    inputPattern: /^.{5,20}$/,
    inputErrorMessage: i18n.global.t('user.operationMsg.resetPwdMinMaxMsg', { min: '5', max: '20' }),
  }));
  if (!err) {
    await resetUserPwd(row.userId, res.value);
    proxy?.$modal.msgSuccess(i18n.global.t('user.operationMsg.resetPwdSuccess', { newPassword: res.value }));
  }
}
/** Jump role assignment */
const handleAuthRole = (row: UserVO) => {
  const userId = row.userId;
  router.push("/system/user-auth/role/" + userId);
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
/** Filter department tree by name */
watchEffect(
  () => {deptTreeRef.value.filter(deptName.value);},
  {
    flush: 'post' // watchEffect will be triggered before the DOM is mounted or updated, this property controls to run after the DOM element is updated
  }
);
onMounted(() => {
  getList() // initialization list data
  getTreeSelect() // Initialize department data
});
</script>
