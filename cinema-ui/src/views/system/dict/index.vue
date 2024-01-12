<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="typeList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('dict.searchInput.dictNameLb')" prop="dictName" class="form-item-search">
        <el-input
          v-model="queryParams.dictName"
          :placeholder="$t('dict.searchInput.dictNamePh')"
          clearable
          style="width: 150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('dict.searchInput.dictTypeLb')" prop="dictType" class="form-item-search">
        <el-input
          v-model="queryParams.dictType"
          :placeholder="$t('dict.searchInput.dictTypePh')"
          clearable
          style="width: 180px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('dict.searchInput.statusLb')" prop="status" class="form-item-search">
        <el-select v-model="queryParams.status" :placeholder="$t('dict.searchInput.statusPh')" clearable style="width: 100px">
          <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('dict.searchInput.createTimeLb')" style="width: 230px;" class="form-item-search">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          format="DD/MM/YYYY"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('dict.searchInput.createTimeStartPh')"
          :end-placeholder="$t('dict.searchInput.createTimeEndPh')"
          @change="handleQuery"
        />
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('dict.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['system:dict:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('dict.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['system:dict:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('dict.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['system:dict:remove']"
        @onClick="handleDelete"
      />
      <IrButton
        colorStyle="green"
        type="secondary"
        :title="$t('dict.headerButton.exportTt')"
        leftIcon="download"
        v-hasPermi="['system:dict:export']"
        @onClick="handleExport"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :title="$t('dict.headerButton.refreshTt')"
        leftIcon="refresh"
        v-hasPermi="['system:dict:remove']"
        @onClick="handleRefreshCache"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or Modify Role Dialog -->
          <el-form ref="dictFormRef" :model="form" :rules="rules" label-width="140px" class="common-form">
            <el-form-item :label="$t('dict.dialog.dictNameLb')" prop="dictName" class="form-item-row">
              <el-input v-model="form.dictName" :placeholder="$t('dict.dialog.dictNamePh')" />
            </el-form-item>
            <el-form-item :label="$t('dict.dialog.dictTypeLb')" prop="dictType" class="form-item-row">
              <el-input v-model="form.dictType" :placeholder="$t('dict.dialog.dictTypePh')" />
            </el-form-item>
            <el-form-item :label="$t('dict.dialog.statusLb')" prop="status" class="form-item-row">
              <el-radio-group v-model="form.status">
                <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('dict.dialog.remarkLb')" prop="remark" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('dict.dialog.remarkPh')"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('dict.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton colorStyle="blue" type="primary" :title="$t('dict.dialog.footerSubmitTt')" :width="100" @onClick="submitForm" />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="Dict" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listType, getType, delType, addType, updateType, refreshCache } from "@/api/system/dict/type";
// IMPORT TYPE
import useDictStore from '@/store/modules/dict'
import { DictTypeForm, DictTypeQuery, DictTypeVO } from "@/api/system/dict/type/types";
import { DateModelType } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const router = useRouter();
// IMPORT DICTIONARY
const { sys_normal_disable } = toRefs<any>(proxy?.useDict("sys_normal_disable"))
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const typeList = ref<DictTypeVO[]>([]);
const loading = ref(true);
const ids = ref<Array<number | string>>([]);
const total = ref(0);
const rowKey = ref('dictId');
const dateRange = ref<[DateModelType, DateModelType]>(['', '']);
const dictFormRef = ref(ElForm);
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "dictId", name: 'dict.columns.dictIdLb', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "dictName", name: 'dict.columns.dictNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "dictType", name: 'dict.columns.dictTypeLb', sortable: true, size: 170, show: true, readonly: true, align: 'left',
    click:  (rowIndex: number) => { openDictData(typeList.value[rowIndex]) }
  },
  { prop: "status", name: 'dict.columns.statusLb', sortable: true, size: 120, show: true, readonly: true, dictData: sys_normal_disable },
  { prop: "createTime", name: 'dict.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "remark", name: 'dict.columns.remarkLb', sortable: true, size: 200, show: true, readonly: true, align: 'left' },
  { prop: "operate", name: 'dict.columns.operateLb', size: 100, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', color: 'gray', title: 'dict.columns.operateEditLb', permissionKey: 'system:role:edit',
        click: (rowIndex: number) => { typeList.value ? handleUpdate(typeList.value[rowIndex]) : () => { return } }
      },
      {
        index: 2, icon: 'delete', color: 'red', title: 'dict.columns.operateDeleteLb', permissionKey: 'system:role:remove',
        click: (rowIndex: number) => { typeList.value ? handleDelete(typeList.value[rowIndex]) : () => { return } }
      },
    ]
  }
]);
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '500px'
});
const initFormData: DictTypeForm = {
  dictId: undefined,
  dictName: '',
  dictType: '',
  status: "0",
  remark: ''
}
// eslint-disable-next-line no-undef
const data = reactive<PageData<DictTypeForm, DictTypeQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    dictName: '',
    dictType: '',
    status: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    dictName: [{ required: true, message: i18n.global.t('dict.dialog.rules.dictNameRqMsg'), trigger: "blur" }],
    dictType: [{ required: true, message: i18n.global.t('dict.dialog.rules.dictTypeRqMsg'), trigger: "blur" }]
  },
});
const { queryParams, form, rules } = toRefs(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query list of dictionary types */
const getList = () => {
  loading.value = true;
  listType(proxy?.addDateRange(queryParams.value, dateRange.value)).then(res => {
    typeList.value = res.rows;
    total.value = res.total;
    loading.value = false;
  });
}
/** Cancel button */
const cancel = () => {
  reset();
  dialog.visible = false;
}
/** Form reset */
const reset = () => {
  form.value = {...initFormData};
  dictFormRef.value.resetFields();
}
/** Search button action */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}
/** Reset button action */
const resetQuery = () => {
  dateRange.value = ['', ''];
  handleQuery();
}
/** Add button action */
const handleAdd = () => {
  dialog.visible = true;
  dialog.title = i18n.global.t('dict.dialog.addTt');
  nextTick(() => {
    reset();
  })
}
/** Open dict data screen */
const openDictData = (row?: DictTypeVO) => {
  const dictId = row?.dictId;
  router.push("/system/dict-data/index/" + dictId);
}
/** Edit button action */
const handleUpdate = (row?: DictTypeVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('dict.dialog.editTt');
  const dictId = row?.dictId || ids.value[0];
  nextTick(async () => {
    reset();
    const res = await getType(dictId);
    form.value = res.data;
  })
}
/** Submit button */
const submitForm = () => {
  dictFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      form.value.dictId ? await updateType(form.value) : await addType(form.value);
      proxy?.$modal.msgSuccess(i18n.global.t('dict.operationMsg.submitSuccess'));
      dialog.visible = false;
      getList();
    }
  });
}
/** Delete button action */
const handleDelete = async (row?: DictTypeVO) => {
  const dictIds = row?.dictId || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('dict.operationMsg.deleteCf', { dictName: (row ? ' "' + row?.dictName + '"' : '') }));
  await delType(dictIds);
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('dict.operationMsg.deleteSuccess'));
}
/** Export button action */
const handleExport = () => {
  proxy?.download("system/dict/type/export", {
    ...queryParams.value
  }, `dict_${new Date().getTime()}.xlsx`);
}
/** Refresh cache button action */
const handleRefreshCache = async () => {
  await refreshCache();
  proxy?.$modal.msgSuccess(i18n.global.t('dict.operationMsg.refreshSuccess'));
  useDictStore().cleanDict();
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(()=>{
  getList();
})
</script>
