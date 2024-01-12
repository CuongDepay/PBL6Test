<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="roleList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('role.searchInput.roleNameLb')" prop="roleName" class="form-item-search">
        <el-input
          v-model="queryParams.roleName"
          :placeholder="$t('role.searchInput.roleNamePh')"
          clearable
          style="width: 150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('role.searchInput.roleKeyLb')" prop="roleKey" class="form-item-search">
        <el-input
          v-model="queryParams.roleKey"
          :placeholder="$t('role.searchInput.roleKeyPh')"
          clearable
          style="width: 180px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('role.searchInput.statusLb')" prop="status" class="form-item-search">
        <el-select v-model="queryParams.status" :placeholder="$t('role.searchInput.statusPh')" clearable style="width: 100px">
          <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('role.searchInput.createTimeLb')" style="width: 230px;" class="form-item-search">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          format="DD/MM/YYYY"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('role.searchInput.createTimeStartPh')"
          :end-placeholder="$t('role.searchInput.createTimeEndPh')"
          @change="handleQuery"
        />
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('role.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['system:role:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('role.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['system:role:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('role.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['system:role:delete']"
        @onClick="handleDelete"
      />
      <IrButton
        colorStyle="green"
        type="secondary"
        :title="$t('role.headerButton.exportTt')"
        leftIcon="download"
        v-hasPermi="['system:role:export']"
        @onClick="handleExport"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or Modify Role Dialog -->
          <el-form ref="roleFormRef" :model="form" :rules="rules" label-width="120px" class="common-form">
            <el-form-item :label="$t('role.dialog.roleNameLb')" prop="roleName" class="form-item-row">
              <el-input v-model="form.roleName" :placeholder="$t('role.dialog.roleNamePh')" />
            </el-form-item>
            <el-form-item prop="roleKey" class="form-item-row">
              <template #label>
                <span>
                  <el-tooltip :content="$t('role.dialog.roleKeyTooltip')" placement="top">
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                  {{ $t('role.dialog.roleKeyLb') }}
                </span>
              </template>
              <el-input v-model="form.roleKey" :placeholder="$t('role.dialog.roleKeyPh')" />
            </el-form-item>
            <el-form-item :label="$t('role.dialog.roleSortLb')" prop="roleSort" class="form-item-row">
              <el-input-number v-model="form.roleSort" controls-position="right" :min="0" />
            </el-form-item>
            <el-form-item :label="$t('role.dialog.statusLb')" class="form-item-row">
              <el-radio-group v-model="form.status">
                <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{
                dict.label
                }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('role.dialog.menuPermissionLb')" class="form-item-row">
              <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">
                {{ $t('role.dialog.menuPermissionExpand') }}
              </el-checkbox>
              <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">
                {{ $t('role.dialog.menuPermissionAll') }}
              </el-checkbox>
              <el-checkbox v-model="form.menuCheckStrictly" @change="handleCheckedTreeConnect($event, 'menu')">
                {{ $t('role.dialog.menuPermissionLink') }}
              </el-checkbox>
              <el-tree
                class="tree-border"
                :data="menuOptions"
                show-checkbox
                ref="menuRef"
                node-key="id"
                :check-strictly="!form.menuCheckStrictly"
                :empty-text="$t('role.dialog.menuPermissionLoadingLb')"
                :props="{ label: 'label', children: 'children' }"
              >
                <template #default="{ node }">
                  {{ getRouteTitle(node.label) }}
                </template>
              </el-tree>
            </el-form-item>
            <el-form-item :label="$t('role.dialog.remarkLb')" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('role.dialog.remarkPh')" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('role.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton colorStyle="blue" type="primary" :title="$t('role.dialog.footerSubmitTt')" :width="100" @onClick="submitForm" />
        </template>
      </IrDialog>
      <IrDialog :dialog="roleDataDialog">
        <template v-slot:body>
          <!-- Assign Role Data Permissions Dialog -->
          <el-form ref="dataScopeRef" :model="form" label-width="120px" class="common-form">
            <el-form-item :label="$t('role.dataPermission.roleNameLb')" class="form-item-row">
              <el-input v-model="form.roleName" :disabled="true" />
            </el-form-item>
            <el-form-item :label="$t('role.dataPermission.roleKeyLb')" class="form-item-row">
              <el-input v-model="form.roleKey" :disabled="true" />
            </el-form-item>
            <el-form-item :label="$t('role.dataPermission.dataScopeLb')" class="form-item-row">
              <el-select v-model="form.dataScope" @change="dataScopeSelectChange">
                <el-option v-for="item in dataScopeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('role.dataPermission.dataPermissionLb')" v-show="form.dataScope === '2'" class="form-item-row">
              <el-checkbox v-model="deptExpand" @change="handleCheckedTreeExpand($event, 'dept')">
                {{ $t('role.dataPermission.dataPermissionExpand') }}
              </el-checkbox>
              <el-checkbox v-model="deptNodeAll" @change="handleCheckedTreeNodeAll($event, 'dept')">
                {{ $t('role.dataPermission.dataPermissionAll') }}
              </el-checkbox>
              <el-checkbox v-model="form.deptCheckStrictly" @change="handleCheckedTreeConnect($event, 'dept')">
                {{ $t('role.dataPermission.dataPermissionLink') }}
              </el-checkbox>
              <el-tree
                class="tree-border"
                :data="deptOptions"
                show-checkbox
                default-expand-all
                ref="deptRef"
                node-key="id"
                :check-strictly="!form.deptCheckStrictly"
                :empty-text="$t('role.dataPermission.dataPermissionLoadingLb')"
                :props="{ label: 'label', children: 'children' }"
              ></el-tree>
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('role.dataPermission.footerCancelTt')" :width="100" @onClick="cancelDataScope" />
          <IrButton colorStyle="blue" type="primary" :title="$t('role.dataPermission.footerSubmitTt')" :width="100" @onClick="submitDataScope" />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="Role" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { addRole, changeRoleStatus, dataScope, delRole, getRole, listRole, updateRole, deptTreeSelect } from "@/api/system/role";
import { roleMenuTreeselect, treeselect as menuTreeselect } from '@/api/system/menu/index';
// IMPORT TYPE
import { RoleVO, RoleForm, RoleQuery, DeptTreeOption } from '@/api/system/role/types';
import { MenuTreeOption, RoleMenuTree } from '@/api/system/menu/types';
import { ElTree, ElForm, DateModelType } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from "@/lang";
import { getRouteTitle } from '@/utils/i18n';
import { ComponentInternalInstance } from 'vue';
const router = useRouter();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { sys_normal_disable } = toRefs<any>(proxy?.useDict('sys_normal_disable'));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const roleList = ref<RoleVO[]>();
const loading = ref(true)
const ids = ref<Array<string | number>>([])
const total = ref(0)
const rowKey = ref('roleId');
const dateRange = ref<[DateModelType, DateModelType]>(['', ''])
const menuOptions = ref<MenuTreeOption[]>([])
const menuExpand = ref(false)
const menuNodeAll = ref(false)
const deptExpand = ref(true)
const deptNodeAll = ref(false)
const deptOptions = ref<DeptTreeOption[]>([])
const roleFormRef = ref(ElForm);
const dataScopeRef = ref(ElForm);
const menuRef = ref(ElTree);
const deptRef = ref(ElTree);
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "roleId", name: 'role.columns.roleIdLb', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "roleName", name: 'role.columns.roleNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "roleKey", name: 'role.columns.roleKeyLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "roleSort", name: 'role.columns.roleSortLb', sortable: true, size: 100, show: true, readonly: true },
  { prop: "status", name: 'role.columns.statusLb', sortable: true, size: 100, show: true, readonly: true,
    switchFunc: (rowIndex: number) => { if (roleList.value) handleStatusChange(roleList.value[rowIndex]); }
  },
  { prop: "createTime", name: 'role.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "operate", name: 'role.columns.operateLb', size: 170, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', title: 'role.columns.operateEditLb', color: 'gray', onlyKeys: [1], key: rowKey.value, permissionKey: 'system:role:edit',
        click: (rowIndex: number) => { roleList.value ? handleUpdate(roleList.value[rowIndex]) : () => { return } }
      },
      {
        index: 2, icon: 'delete', title: 'role.columns.operateDeleteLb', color: 'red', onlyKeys: [1], key: rowKey.value, permissionKey: 'system:role:remove',
        click: (rowIndex: number) => { roleList.value ? handleDelete(roleList.value[rowIndex]) : () => { return } }
      },
      {
        index: 2, icon: 'data-permission', title: 'role.columns.operateDataScopeLb', color: 'yellow', onlyKeys: [1], key: rowKey.value, permissionKey: 'system:role:edit',
        click: (rowIndex: number) => { if (roleList.value) handleDataScope(roleList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'people', title: 'role.columns.operateAuthUserLb', color: 'green', onlyKeys: [1], key: rowKey.value, permissionKey: 'system:role:edit',
        click: (rowIndex: number) => { if (roleList.value) handleAuthUser(roleList.value[rowIndex]); }
      }
    ]
  }
]);
/** Data range options */
const dataScopeOptions = ref([
  { value: "1", label: i18n.global.t('role.dataPermission.option1') },
  { value: "2", label: i18n.global.t('role.dataPermission.option2') },
  { value: "3", label: i18n.global.t('role.dataPermission.option3') },
  { value: "4", label: i18n.global.t('role.dataPermission.option4') },
  { value: "5", label: i18n.global.t('role.dataPermission.option5') }
])
const initForm: RoleForm = {
  roleId: undefined,
  roleSort: 1,
  status: '0',
  roleName: '',
  roleKey: '',
  menuCheckStrictly: true,
  deptCheckStrictly: true,
  remark: '',
  dataScope: '1',
  menuIds: [],
  deptIds: [],
}
// eslint-disable-next-line no-undef
const data = reactive<PageData<RoleForm, RoleQuery>>({
  form: {...initForm},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    roleName: '',
    roleKey: '',
    status: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    roleName: [{ required: true, message: i18n.global.t('role.dialog.rules.roleNameRqMsg'), trigger: "blur" }],
    roleKey: [{ required: true, message: i18n.global.t('role.dialog.rules.roleKeyRqMsg'), trigger: "blur" }],
    roleSort: [{ required: true, message: i18n.global.t('role.dialog.rules.roleSortRqMsg'), trigger: "blur" }]
  }
})
const { form, queryParams, rules } = toRefs(data)
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '700px'
});
const roleDataDialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '700px'
});
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/**
 * Query role list
 */
const getList = () => {
  loading.value = true
  listRole(proxy?.addDateRange(queryParams.value, dateRange.value)).then(res => {
    roleList.value = res.rows
    total.value = res.total
    loading.value = false
  })
}
/**
 * Search button action
 */
const handleQuery = () => {
    queryParams.value.pageNum = 1;
    getList();
}
/** reset */
const resetQuery = () => {
  dateRange.value = ['', '']
  handleQuery();
}
/** add role */
const handleAdd = () => {
  dialog.visible = true;
  dialog.title = i18n.global.t('role.dialog.addTt');
  nextTick(() => {
    reset();
    getMenuTreeselect();
  })
}
/** modify role */
const handleUpdate = async (row?: RoleVO) => {
  const roleId = row?.roleId || ids.value[0]
  const roleMenu = getRoleMenuTreeselect(roleId)
  const { data } = await getRole(roleId);
  dialog.visible = true;
  dialog.title = i18n.global.t('role.dialog.editTt');
  nextTick(() => {
    reset();
    Object.assign(form.value, data);
    form.value.roleSort = Number(form.value.roleSort);
    nextTick(async () => {
      const res = await roleMenu;
      let checkedKeys = res.checkedKeys;
      checkedKeys.forEach((v) => {
        nextTick(() => {
          menuRef.value.setChecked(v, true, false);
        })
      })
    })
  })
}
/** delete button action */
const handleDelete = async (row?: RoleVO) => {
  const roleids = row?.roleId || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('role.operationMsg.deleteCf', { roleName: (row ? ' "' + row?.roleName + '"' : '') }));
  await delRole(roleids);
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('role.operationMsg.deleteSuccess'));
}
/** Export button action */
const handleExport = () => {
  proxy?.download("system/role/export", {
    ...queryParams.value,
  }, `role_${new Date().getTime()}.xlsx`)
}
/** Character Status Modification */
const handleStatusChange = async (row: RoleVO) => {
  let text = row.status === "0" ? i18n.global.t('role.operationMsg.statusEnable') : i18n.global.t('role.operationMsg.statusDisable');
  try {
    await proxy?.$modal.confirmWarning(i18n.global.t('role.operationMsg.statusChangeCf', { action: text, roleName: row.roleName }));
    await changeRoleStatus(row.roleId, row.status);
    proxy?.$modal.msgSuccess(text + i18n.global.t('role.operationMsg.statusChangeSuccess'));
  } catch {
    row.status = row.status === "0" ? "1" : "0";
  }
}

/** assign users */
const handleAuthUser = (row: RoleVO) => {
  router.push("/system/role-auth/user/" + row.roleId);
}

/** Query menu tree structure */
const getMenuTreeselect = async () => {
  const res = await menuTreeselect();
  menuOptions.value = res.data;
}
/** All department node data */
const getDeptAllCheckedKeys = () => {
  // The currently selected department node
  let checkedKeys = deptRef.value.getCheckedKeys();
  // Half-selected department nodes
  let halfCheckedKeys = deptRef.value.getHalfCheckedKeys();
  checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
  return checkedKeys
}
/** Reset newly added forms and other data  */
const reset = () => {
  menuRef.value.setCheckedKeys([]);
  menuExpand.value = false
  menuNodeAll.value = false
  deptExpand.value = true
  deptNodeAll.value = false
  form.value = { ...initForm };
  roleFormRef.value.resetFields();
}
/** Query the menu tree structure according to the role ID */
const getRoleMenuTreeselect = (roleId: string | number) => {
  return roleMenuTreeselect(roleId).then((res): RoleMenuTree => {
    menuOptions.value = res.data.menus;
    return res.data;
  })
}
/** Query the department tree structure according to the role ID */
const getRoleDeptTreeSelect = async (roleId: string | number) => {
  const res = await deptTreeSelect(roleId);
  deptOptions.value = res.data.depts;
  return res.data;
}
/** Tree Permissions (Expand/Collapse) */
const handleCheckedTreeExpand = (value: any, type: string) => {
  if (type == "menu") {
    let treeList = menuOptions.value;
    for (let i = 0; i < treeList.length; i++) {
      menuRef.value.store.nodesMap[treeList[i].id].expanded = value;
    }
  } else if (type == "dept") {
    let treeList = deptOptions.value;
    for (let i = 0; i < treeList.length; i++) {
      deptRef.value.store.nodesMap[treeList[i].id].expanded = value;
    }
  }
}
/** Tree permissions (select all/unselect all) */
const handleCheckedTreeNodeAll = (value: any, type: string) => {
  if (type == "menu") {
    menuRef.value.setCheckedNodes(value ? menuOptions.value : []);
  } else if (type == "dept") {
    deptRef.value.setCheckedNodes(value ? deptOptions.value : []);
  }
}
/** Tree permissions (parent-child linkage) */
const handleCheckedTreeConnect = (value: any, type: string) => {
  if (type == "menu") {
    form.value.menuCheckStrictly = value;
  } else if (type == "dept") {
    form.value.deptCheckStrictly = value;
  }
}
/** All menu node data */
const getMenuAllCheckedKeys = () => {
  // The currently selected menu node
  let checkedKeys = menuRef.value.getCheckedKeys();
  // Half-selected menu node
  let halfCheckedKeys = menuRef.value.getHalfCheckedKeys();
  checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
  return checkedKeys;
}
/** Submit button */
const submitForm = () => {
  roleFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      form.value.menuIds = getMenuAllCheckedKeys()
      form.value.roleId ? await updateRole(form.value) : await addRole(form.value);
      proxy?.$modal.msgSuccess(i18n.global.t('role.operationMsg.submitSuccess'))
      dialog.visible = false
      getList()
    }
  })
}
/** Cancel button */
const cancel = () => {
  reset()
  dialog.visible = false;
}
/** Select role scope trigger */
const dataScopeSelectChange = (value: string) => {
  if (value !== "2") {
      deptRef.value.setCheckedKeys([])
  }
}
/** Assign data permission operations */
const handleDataScope = async (row: RoleVO) => {
  const roleDeptTreeselect = getRoleDeptTreeSelect(row.roleId);
  const response = await getRole(row.roleId);
  Object.assign(form.value, response.data);
  roleDataDialog.title = i18n.global.t('role.dataPermission.tt');
  roleDataDialog.visible = true;
  nextTick(async () => {
    const res = await roleDeptTreeselect;
    nextTick(() => {
      if (deptRef.value) {
        deptRef.value.setCheckedKeys(res.checkedKeys);
      }
    })
  })
}
/** Submit button (data permissions) */
const submitDataScope = async () => {
  if (form.value.roleId) {
    form.value.deptIds = getDeptAllCheckedKeys();
    await dataScope(form.value);
    proxy?.$modal.msgSuccess(i18n.global.t('role.operationMsg.submitSuccess'));
    roleDataDialog.visible = false;
    getList();
  }
}
/** Cancel button (data permission) */
const cancelDataScope = () => {
  dataScopeRef.value.resetFields();
  form.value = {...initForm};
  roleDataDialog.visible = false;
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
/** Filter department tree by name */
onMounted(() => {
  getList();
});
</script>
