<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="dataList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('dict.data.searchInput.dictTypeLb')" prop="dictType" class="form-item-search">
        <el-select v-model="queryParams.dictType" style="width: 200px" @change="handleQuery">
          <el-option v-for="item in typeOptions" :key="item.dictId" :label="item.dictName" :value="item.dictType" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('dict.data.searchInput.dictLabelLb')" prop="dictLabel" class="form-item-search">
        <el-input
          v-model="queryParams.dictLabel"
          :placeholder="$t('dict.data.searchInput.dictLabelPh')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('dict.data.searchInput.statusLb')" prop="status" class="form-item-search">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('dict.data.searchInput.statusPh')"
          clearable
          style="width: 200px"
          @change="handleQuery"
        >
          <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('dict.data.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['system:dict:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('dict.data.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['system:dict:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('dict.data.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['system:dict:remove']"
        @onClick="handleDelete"
      />
      <IrButton
        colorStyle="green"
        type="secondary"
        :title="$t('dict.data.headerButton.exportTt')"
        leftIcon="download"
        v-hasPermi="['system:dict:export']"
        @onClick="handleExport"
      />
      <IrButton colorStyle="gray" type="secondary" :title="$t('dict.data.headerButton.closeTt')" leftIcon="close" @onClick="handleClose" />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or modify parameter configuration dialog -->
          <el-form ref="dataFormRef" :model="form" :rules="rules" label-width="120px" class="common-form">
            <el-form-item :label="$t('dict.data.dialog.dictTypeLb')" class="form-item-row">
              <el-input v-model="form.dictType" :disabled="true" />
            </el-form-item>
            <el-form-item :label="$t('dict.data.dialog.dictLabelLb')" prop="dictLabel" class="form-item-row">
              <el-input v-model="form.dictLabel" :placeholder="$t('dict.data.dialog.dictLabelPh')" />
            </el-form-item>
            <el-form-item :label="$t('dict.data.dialog.dictValueLb')" prop="dictValue" class="form-item-row">
              <el-input v-model="form.dictValue" :placeholder="$t('dict.data.dialog.dictValuePh')" />
            </el-form-item>
            <el-form-item :label="$t('dict.data.dialog.cssClassLb')" prop="cssClass" class="form-item-row">
              <el-input v-model="form.cssClass" :placeholder="$t('dict.data.dialog.cssClassPh')" />
            </el-form-item>
            <el-form-item :label="$t('dict.data.dialog.dictSortLb')" prop="dictSort" class="form-item-row">
              <el-input-number v-model="form.dictSort" controls-position="right" :min="0" />
            </el-form-item>
            <el-form-item :label="$t('dict.data.dialog.listClassLb')" prop="listClass" class="form-item-row">
              <el-select v-model="form.listClass">
                <el-option v-for="item in listClassOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('dict.data.dialog.statusLb')" prop="status" class="form-item-row">
              <el-radio-group v-model="form.status">
                <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('dict.data.dialog.remarkLb')" prop="remark" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('dict.data.dialog.remarkPh')"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('dict.data.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton colorStyle="blue" type="primary" :title="$t('dict.data.dialog.footerSubmitTt')" :width="100" @onClick="submitForm" />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="Data" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
import CustomGridTag from "@/components/IrGrid/CustomGridTag.vue";
// IMPORT API
import { optionselect as getDictOptionselect, getType } from "@/api/system/dict/type";
import { listData, getData, delData, addData, updateData } from "@/api/system/dict/data";
// IMPORT TYPE
import { DictTypeVO } from '@/api/system/dict/type/types';
import { DictDataForm, DictDataQuery, DictDataVO } from "@/api/system/dict/data/types";
import { ElForm } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { VGridVueTemplate } from "@revolist/vue3-datagrid";
import { h } from 'vue';
import useDictStore from '@/store/modules/dict'
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const route = useRoute();
// IMPORT DICTIONARY
const { sys_normal_disable } = toRefs<any>(proxy?.useDict("sys_normal_disable"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const dataList = ref<DictDataVO[]>([]);
const loading = ref(true);
const ids = ref<Array<string | number>>([]);
const total = ref(0);
const rowKey = ref('dictCode');
const defaultDictType = ref("");
const typeOptions = ref<DictTypeVO[]>([]);
const dataFormRef = ref(ElForm);
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "dictCode", name: 'dict.data.columns.dictCodeLb', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "dictLabel", name: 'dict.data.columns.dictLabelLb', sortable: true, size: 150, show: true, readonly: true, align: 'left',
    cellTemplate: VGridVueTemplate(h(CustomGridTag, { rowStyle: 'listClass', rowValue: 'dictLabel' }))
  },
  { prop: "dictValue", name: 'dict.data.columns.dictValueLb', sortable: true, size: 170, show: true, readonly: true, align: 'left' },
  { prop: "dictSort", name: 'dict.data.columns.dictSortLb', sortable: true, size: 140, show: true, readonly: true },
  { prop: "status", name: 'dict.data.columns.statusLb', sortable: true, size: 120, show: true, readonly: true, dictData: sys_normal_disable },
  { prop: "createTime", name: 'dict.data.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "remark", name: 'dict.data.columns.remarkLb', sortable: true, size: 200, show: true, readonly: true, align: 'left' },
  { prop: "operate", name: 'dict.data.columns.operateLb', size: 100, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', color: 'gray', title: 'dict.data.columns.operateEditLb', permissionKey: 'system:dict:edit',
        click: (rowIndex: number) => { dataList.value ? handleUpdate(dataList.value[rowIndex]) : () => { return } }
      },
      {
        index: 2, icon: 'delete', color: 'red', title: 'dict.data.columns.operateDeleteLb', permissionKey: 'system:dict:remove',
        click: (rowIndex: number) => { dataList.value ? handleDelete(dataList.value[rowIndex]) : () => { return } }
      },
    ]
  }
]);
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '500px'
});
// Data label echo style
const listClassOptions = ref<Array<{ value: string, label: string }>>([
  { value: "violet", label: "Violet" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "gray", label: "Gray" },
  { value: "yellow", label: "Yellow" },
  { value: "red", label: "Red" }
]);
const initFormData: DictDataForm = {
  dictCode: undefined,
  dictLabel: '',
  dictValue: '',
  cssClass: '',
  listClass: "blue",
  dictSort: 0,
  status: "0",
  remark: ''
}
// eslint-disable-next-line no-undef
const data = reactive<PageData<DictDataForm, DictDataQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    dictName: '',
    dictType: '',
    status: '',
    dictLabel: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    dictLabel: [{ required: true, message: i18n.global.t('dict.data.dialog.rules.dictLabelRqMsg'), trigger: "blur" }],
    dictValue: [{ required: true, message: i18n.global.t('dict.data.dialog.rules.dictValueRqMsg'), trigger: "blur" }],
    dictSort: [{ required: true, message: i18n.global.t('dict.data.dialog.rules.dictSortRqMsg'), trigger: "blur" }]
  }
});
const { queryParams, form, rules } = toRefs(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query dictionary type details */
const getTypes = async (dictId: string | number) => {
  const { data } = await getType(dictId);
  queryParams.value.dictType = data.dictType;
  defaultDictType.value = data.dictType;
  getList();
}
/** Query list of dictionary types */
const getTypeList = async () => {
  const res = await getDictOptionselect()
  typeOptions.value = res.data;
}
/** Query dictionary data list */
const getList = async () => {
  loading.value = true;
  const res = await listData(queryParams.value);
  dataList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}
/** Cancel button */
const cancel = () => {
  dialog.visible = false;
  reset();
}
/** Form reset */
const reset = () => {
  form.value = { ...initFormData };
  dataFormRef.value.resetFields();
}
/** Search button action */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}
/** back button action */
const handleClose = () => {
  const obj = { path: "/system/dict" };
  proxy?.$tab.closeOpenPage(obj);
}
/** Reset button action */
const resetQuery = () => {
  queryParams.value.dictType = defaultDictType.value;
  handleQuery();
}
/** Add button action */
const handleAdd = () => {
  dialog.visible = true;
  dialog.title = i18n.global.t('dict.data.dialog.addTt');
  nextTick(() => {
    reset();
    form.value.dictType = queryParams.value.dictType;
  })
}
/** Edit button action */
const handleUpdate = (row?: DictDataVO) => {
  const dictCode = row?.dictCode || ids.value[0];
  dialog.visible = true;
  dialog.title = i18n.global.t('dict.data.dialog.editTt');
  nextTick(async () => {
    const res =  await getData(dictCode);
    reset();
    form.value = res.data;
  })
}
/** Submit button */
const submitForm = () => {
  dataFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      form.value.dictCode ? await updateData(form.value) : await addData(form.value);
      useDictStore().removeDict(queryParams.value.dictType);
      proxy?.$modal.msgSuccess(i18n.global.t('dict.data.operationMsg.submitSuccess'));
      dialog.visible = false;
      getList();

    }
  });
}
/** Delete button action */
const handleDelete = async (row?: DictDataVO) => {
  const dictCodes = row?.dictCode || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('dict.data.operationMsg.deleteCf', { dictLabel: (row ? ' "' + row?.dictLabel + '"' : '') }));
  await delData(dictCodes);
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('dict.data.operationMsg.deleteSuccess'));
  useDictStore().removeDict(queryParams.value.dictType);
}
/** Export button action */
const handleExport = () => {
  proxy?.download("system/dict/data/export", {
    ...queryParams.value
  }, `dict_data_${new Date().getTime()}.xlsx`);
}

onMounted(() => {
  getTypes(route.params && route.params.dictId as string);
  getTypeList();
})
</script>
