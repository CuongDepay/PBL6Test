<template>
  <Layout5 :loading="loading" :queryParams="queryParams" :checkboxCol="true" @onSearch="handleQuery" @onReset="resetQuery" @onPaging="getList">
    <template v-slot:search-input>
      <el-form-item :label="$t('dept.searchInput.deptNameLb')" prop="deptName" class="form-item-search">
        <el-input v-model="queryParams.deptName" :placeholder="$t('dept.searchInput.deptNamePh')" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item :label="$t('dept.searchInput.statusLb')" prop="status" class="form-item-search">
        <el-select v-model="queryParams.status" :placeholder="$t('dept.searchInput.statusPh')" clearable @change="handleQuery">
          <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('dept.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['system:dept:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :title="$t('dept.headerButton.toggleExpandTt')"
        leftIcon="refresh"
        @onClick="handleToggleExpandAll"
      />
    </template>
    <template v-slot:datagrid>
      <el-table
        v-loading="loading"
        row-key="deptId"
        ref="deptTableRef"
        :data="deptList"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :default-expand-all="isExpandAll"
        :border="true"
      >
        <el-table-column prop="deptName" :label="$t('dept.columns.deptNameLb')" width="260" show-overflow-tooltip />
        <el-table-column prop="orderNum" align="center" :label="$t('dept.columns.orderNumLb')" width="200" show-overflow-tooltip />
        <el-table-column prop="status" align="center" :label="$t('dept.columns.statusLb')" width="140" show-overflow-tooltip>
          <template #default="scope">
            <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('dept.columns.createTimeLb')" align="center" prop="createTime" width="200" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" :label="$t('dept.columns.operateLb')" width="120px" show-overflow-tooltip>
          <template #default="scope">
            <div class="operate-cell">
              <IrButton
                type="grid"
                leftIcon="edit"
                colorStyle="gray"
                buttonSize="small"
                :toolTip="$t('dept.columns.operateEditLb')"
                @onClick="handleUpdate(scope.row)"
                v-hasPermi="['system:dept:edit']"
              />
              <IrButton
                type="grid"
                leftIcon="plus"
                colorStyle="blue"
                buttonSize="small"
                :toolTip="$t('dept.columns.operateAddLb')"
                @onClick="handleAdd(scope.row)"
                v-hasPermi="['system:dept:add']"
              />
              <IrButton
                type="grid"
                leftIcon="delete"
                colorStyle="red"
                buttonSize="small"
                :toolTip="$t('dept.columns.operateDeleteLb')"
                @onClick="handleDelete(scope.row)"
                v-hasPermi="['system:dept:remove']"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <el-form ref="deptFormRef" :model="form" :rules="rules" label-width="150px" class="common-form">
            <el-form-item :label="$t('dept.dialog.parentIdLb')" prop="parentId" v-if="form.parentId !== 0" class="form-item-row">
              <el-tree-select
                v-model="form.parentId"
                :data="deptOptions"
                :props="{ value: 'deptId', label: 'deptName', children: 'children' }"
                value-key="deptId"
                :placeholder="$t('dept.dialog.parentIdPh')"
                check-strictly
              />
            </el-form-item>
            <el-form-item :label="$t('dept.dialog.deptNameLb')" prop="deptName" class="form-item-row">
              <el-input v-model="form.deptName" :placeholder="$t('dept.dialog.deptNamePh')" />
            </el-form-item>
            <el-form-item :label="$t('dept.dialog.orderNumLb')" prop="orderNum" class="form-item-row">
              <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
            </el-form-item>
            <el-form-item :label="$t('dept.dialog.leaderLb')" prop="leader" class="form-item-row">
              <el-input v-model="form.leader" :placeholder="$t('dept.dialog.leaderPh')" maxlength="20" />
            </el-form-item>
            <el-form-item :label="$t('dept.dialog.phoneLb')" prop="phone" class="form-item-row">
              <el-input v-model="form.phone" :placeholder="$t('dept.dialog.phonePh')" maxlength="11" />
            </el-form-item>
            <el-form-item :label="$t('dept.dialog.emailLb')" prop="email" class="form-item-row">
              <el-input v-model="form.email" :placeholder="$t('dept.dialog.emailPh')" maxlength="50" />
            </el-form-item>
            <el-form-item :label="$t('dept.dialog.statusLb')" class="form-item-row">
              <el-radio-group v-model="form.status">
                <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('dept.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton colorStyle="blue" type="primary" :title="$t('dept.dialog.footerSubmitTt')" :width="100" @onClick="submitForm" />
        </template>
      </IrDialog>
    </template>
  </Layout5>
</template>

<script setup name="Dept" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listDept, getDept, delDept, addDept, updateDept, listDeptExcludeChild } from "@/api/system/dept"
// IMPORT TYPE
import { DeptForm, DeptQuery, DeptVO } from "@/api/system/dept/types";
import { ElTable } from "element-plus";
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance
// IMPORT DICTIONARY
const { sys_normal_disable } = toRefs<any>(proxy?.useDict("sys_normal_disable"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
interface DeptOptionsType {
  deptId: number | string;
  deptName: string;
  children: DeptOptionsType[];
}
const deptList = ref<DeptVO[]>([])
const loading = ref(true)
const deptOptions = ref<DeptOptionsType[]>([])
const isExpandAll = ref(true)
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '600px'
});
const deptTableRef = ref(ElTable);
const deptFormRef = ref(ElForm);
const initFormData: DeptForm = {
  deptId: undefined,
  parentId: undefined,
  deptName: undefined,
  orderNum: 0,
  leader: undefined,
  phone: undefined,
  email: undefined,
  status: "0"
}
// eslint-disable-next-line no-undef
const data = reactive<PageData<DeptForm, DeptQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    deptName: undefined,
    status: undefined,
    orderByColumn: '',
    isAsc: ''
  },
  rules: {
    parentId: [{ required: true, message: i18n.global.t('dept.dialog.rules.parentIdRqMsg'), trigger: "blur" }],
    deptName: [{ required: true, message: i18n.global.t('dept.dialog.rules.deptNameRqMsg'), trigger: "blur" }],
    orderNum: [{ required: true, message: i18n.global.t('dept.dialog.rules.orderNumRqMsg'), trigger: "blur" }],
    email: [{ type: "email", message: i18n.global.t('dept.dialog.rules.emailPtMsg'), trigger: ["blur", "change"] }],
    phone: [{ pattern: /[0-9*]{10}$/, message: i18n.global.t('dept.dialog.rules.phonePtMsg'), trigger: "blur" }]
  },
})
// eslint-disable-next-line no-undef
const { queryParams, form, rules } = toRefs<PageData<DeptForm, DeptQuery>>(data)
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
/** Query menu list */
const getList = async () => {
  loading.value = true;
  const res = await listDept(queryParams.value);
  const data = proxy?.handleTree<DeptVO>(res.data, "deptId")
  if (data) {
    deptList.value = data
  }
  loading.value = false
}
/** Cancel button */
const cancel = () => {
  reset()
  dialog.visible = false
}
/** Form reset */
const reset = () => {
  form.value = {...initFormData};
  deptFormRef.value.resetFields();
}
/** Search button action */
const handleQuery = () => {
  getList();
}
/** Reset button action */
const resetQuery = () => {
  handleQuery()
}
/** Add button action */
const handleAdd = (row?: DeptVO) => {
  listDept().then(res => {
    const data = proxy?.handleTree<DeptOptionsType>(res.data, "deptId");
    if (data) {
      deptOptions.value = data
      dialog.visible = true;
      dialog.title = i18n.global.t('dept.dialog.addTt');
      nextTick(() => {
        reset();
        if (row && row.deptId) {
          form.value.parentId = row?.deptId;
        }
      })
    }
  })
}
/** Expand/Collapse operation */
const handleToggleExpandAll = () => {
  isExpandAll.value = !isExpandAll.value;
  toggleExpandAll(deptList.value, isExpandAll.value)
}
/** expand/collapse all */
const toggleExpandAll = (data: DeptVO[], status: boolean) => {
  data.forEach((item) => {
    deptTableRef.value.toggleRowExpansion(item, status)
    if(item.children && item.children.length > 0) toggleExpandAll(item.children, status)
  })
}

/** Edit button action */
const handleUpdate = async (row: DeptVO) => {
  const res = await getDept(row.deptId);
  dialog.visible = true;
  dialog.title = i18n.global.t('dept.dialog.editTt');
  nextTick(async () => {
    reset();
    form.value = res.data
    const response = await listDeptExcludeChild(row.deptId);
    const data = proxy?.handleTree<DeptOptionsType>(response.data, "deptId")
    if (data) {
      deptOptions.value = data;
      if (data.length === 0) {
        const noResultsOptions: DeptOptionsType = { deptId: res.data.parentId, deptName: res.data.parentName, children: [] };
        deptOptions.value.push(noResultsOptions);
      }
    }
  })
}
/** Submit button */
const submitForm = () => {
  deptFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      form.value.deptId ? await updateDept(form.value) : await addDept(form.value);
      proxy?.$modal.msgSuccess(i18n.global.t('dept.operationMsg.submitSuccess'));
      dialog.visible = false;
      getList();
    }
  })
}
/** Delete button action */
const handleDelete = async (row: DeptVO) => {
  await proxy?.$modal.confirmDelete(i18n.global.t('dept.operationMsg.deleteCf', { deptName: row.deptName }));
  await delDept(row.deptId);
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('dept.operationMsg.deleteSuccess'));
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
});
</script>
