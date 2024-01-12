<template>
  <Layout5 :loading="loading" :queryParams="queryParams" :checkboxCol="true" @onSearch="handleQuery" @onReset="resetQuery" @onPaging="getList">
    <template v-slot:search-input>
      <el-form-item :label="$t('menu.searchInput.menuNameLb')" prop="menuName" class="form-item-search">
        <el-input v-model="queryParams.menuName" :placeholder="$t('menu.searchInput.menuNamePh')" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item :label="$t('menu.searchInput.statusLb')" prop="status" class="form-item-search">
        <el-select v-model="queryParams.status" :placeholder="$t('menu.searchInput.menuNamePh')" clearable>
          <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('menu.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['system:menu:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :title="$t('menu.headerButton.toggleExpandTt')"
        leftIcon="refresh"
        @onClick="handleToggleExpandAll"
      />
    </template>
    <template v-slot:datagrid>
      <el-table
        v-loading="loading"
        row-key="menuId"
        ref="menuTableRef"
        :data="menuList"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :default-expand-all="isExpandAll"
        :border="true"
      >
        <el-table-column prop="menuName" :label="$t('menu.columns.menuNameLb')" :show-overflow-tooltip="true" width="250">
          <template #default="scope">
            <span>{{ getRouteTitle(scope.row.menuName) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="icon" :label="$t('menu.columns.iconLb')" align="center" width="100" show-overflow-tooltip>
          <template #default="scope">
            <svg-icon :icon-class="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column prop="orderNum" :label="$t('menu.columns.orderNumLb')" width="100" show-overflow-tooltip />
        <el-table-column prop="perms" :label="$t('menu.columns.permsLb')" :show-overflow-tooltip="true" />
        <el-table-column prop="component" :label="$t('menu.columns.componentLb')" :show-overflow-tooltip="true" />
        <el-table-column prop="status" :label="$t('menu.columns.statusLb')" width="140" show-overflow-tooltip>
          <template #default="scope">
            <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('menu.columns.createTimeLb')" align="center" prop="createTime" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" :label="$t('menu.columns.operateLb')" width="120px" show-overflow-tooltip>
          <template #default="scope">
            <div class="operate-cell">
              <IrButton
                type="grid"
                leftIcon="edit"
                colorStyle="gray"
                buttonSize="small"
                :toolTip="$t('menu.columns.operateEditLb')"
                @onClick="handleUpdate(scope.row)"
                v-hasPermi="['system:menu:edit']"
              />
              <IrButton
                type="grid"
                leftIcon="plus"
                colorStyle="blue"
                buttonSize="small"
                :toolTip="$t('menu.columns.operateAddLb')"
                @onClick="handleAdd(scope.row)"
                v-hasPermi="['system:menu:add']"
              />
              <IrButton
                type="grid"
                leftIcon="delete"
                colorStyle="red"
                buttonSize="small"
                :toolTip="$t('menu.columns.operateDeleteLb')"
                @onClick="handleDelete(scope.row)"
                v-hasPermi="['system:menu:remove']"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <el-form ref="menuFormRef" :model="form" :rules="rules" label-width="160px" class="common-form">
            <el-form-item :label="$t('menu.dialog.parentIdLb')" class="form-item-row">
              <el-tree-select
                v-model="form.parentId"
                :data="menuOptions"
                :props="{ value: 'menuId', label: 'menuName', children: 'children' }"
                value-key="menuId"
                :placeholder="$t('menu.dialog.parentIdPh')"
                check-strictly
              />
            </el-form-item>
            <el-form-item :label="$t('menu.dialog.menuTypeLb')" prop="menuType" class="form-item-row">
              <el-radio-group v-model="form.menuType">
                <el-radio label="M">{{ $t('menu.dialog.menuTypeM') }}</el-radio>
                <el-radio label="C">{{ $t('menu.dialog.menuTypeC') }}</el-radio>
                <el-radio label="F">{{ $t('menu.dialog.menuTypeF') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('menu.dialog.iconLb')" prop="icon" v-if="form.menuType !== 'F'" class="form-item-row">
              <!-- icon selector -->
              <icon-select v-model="form.icon" />
            </el-form-item>
            <el-form-item :label="$t('menu.dialog.menuNameLb')" prop="menuName" class="form-item-row">
              <vue-json-pretty v-model:data="menuNameJson" :showDoubleQuotes="false" :showLineNumber="true" editableTrigger="dblclick" editable />
            </el-form-item>
            <el-row>
              <el-col :span="11">
                <el-form-item :label="$t('menu.dialog.orderNumLb')" prop="orderNum" class="form-item-row">
                  <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
                </el-form-item>
              </el-col>
              <el-col :span="2" />
              <el-col :span="11">
                <el-form-item v-if="form.menuType !== 'F'" class="form-item-row">
                  <template #label>
                    <span>
                      <el-tooltip :content="$t('menu.dialog.linkTooltip')" placement="top">
                        <el-icon>
                          <question-filled />
                        </el-icon>
                      </el-tooltip>
                      {{ $t('menu.dialog.linkLb') }}
                    </span>
                  </template>
                  <el-radio-group v-model="form.isFrame">
                    <el-radio label="0">{{ $t('menu.dialog.linkYes') }}</el-radio>
                    <el-radio label="1">{{ $t('menu.dialog.linkNo') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item prop="path" v-if="form.menuType !== 'F'" class="form-item-row">
              <template #label>
                <span>
                  <el-tooltip :content="$t('menu.dialog.pathTooltip')" placement="top">
                    <el-icon>
                      <question-filled />
                    </el-icon>
                  </el-tooltip>
                  {{ $t('menu.dialog.pathLb') }}
                </span>
              </template>
              <el-input v-model="form.path" :placeholder="$t('menu.dialog.pathPh')" />
            </el-form-item>
            <el-form-item prop="component" v-if="form.menuType === 'C'" class="form-item-row">
              <template #label>
                <span>
                  <el-tooltip :content="$t('menu.dialog.componentTooltip')" placement="top">
                    <el-icon>
                      <question-filled />
                    </el-icon>
                  </el-tooltip>
                  {{ $t('menu.dialog.componentLb') }}
                </span>
              </template>
              <el-input v-model="form.component" :placeholder="$t('menu.dialog.componentPh')" />
            </el-form-item>
            <el-form-item v-if="form.menuType !== 'M'" class="form-item-row">
              <el-input v-model="form.perms" :placeholder="$t('menu.dialog.permsPh')" maxlength="100" />
              <template #label>
                <span>
                  <el-tooltip :content="$t('menu.dialog.permsTooltip')" placement="top">
                    <el-icon>
                      <question-filled />
                    </el-icon>
                  </el-tooltip>
                  {{ $t('menu.dialog.permsLb') }}
                </span>
              </template>
            </el-form-item>
            <el-form-item v-if="form.menuType === 'C'" class="form-item-row">
              <el-input v-model="form.query" :placeholder="$t('menu.dialog.queryPh')" maxlength="255" />
              <template #label>
                <span>
                  <el-tooltip :content="$t('menu.dialog.queryTooltip')" placement="top">
                    <el-icon>
                      <question-filled />
                    </el-icon>
                  </el-tooltip>
                  {{ $t('menu.dialog.queryLb') }}
                </span>
              </template>
            </el-form-item>
            <el-form-item v-if="form.menuType === 'C'" class="form-item-row">
              <template #label>
                <span>
                  <el-tooltip :content="$t('menu.dialog.cacheTooltip')" placement="top">
                    <el-icon>
                      <question-filled />
                    </el-icon>
                  </el-tooltip>
                  {{ $t('menu.dialog.cacheLb') }}
                </span>
              </template>
              <el-radio-group v-model="form.isCache">
                <el-radio label="0">{{ $t('menu.dialog.cacheYes') }}</el-radio>
                <el-radio label="1">{{ $t('menu.dialog.cacheNo') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="form.menuType !== 'F'" class="form-item-row">
              <template #label>
                <span>
                  <el-tooltip :content="$t('menu.dialog.displayTooltip')" placement="top">
                    <el-icon>
                      <question-filled />
                    </el-icon>
                  </el-tooltip>
                  {{ $t('menu.dialog.displayLb') }}
                </span>
              </template>
              <el-radio-group v-model="form.visible">
                <el-radio v-for="dict in sys_show_hide" :key="dict.value" :label="dict.value">{{ dict.label }} </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="form.menuType !== 'F'" class="form-item-row">
              <template #label>
                <span>
                  <el-tooltip :content="$t('menu.dialog.statusTooltip')" placement="top">
                    <el-icon>
                      <question-filled />
                    </el-icon>
                  </el-tooltip>
                  {{ $t('menu.dialog.statusLb') }}
                </span>
              </template>
              <el-radio-group v-model="form.status">
                <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">
                  {{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('menu.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton colorStyle="blue" type="primary" :title="$t('menu.dialog.footerSubmitTt')" :width="100" @onClick="submitForm" />
        </template>
      </IrDialog>
    </template>
  </Layout5>
</template>

<script setup name="Menu" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
// IMPORT API
import { addMenu, delMenu, getMenu, listMenu, updateMenu } from '@/api/system/menu';
// IMPORT TYPE
import { MenuForm, MenuQuery, MenuVO } from '@/api/system/menu/types';
import { MenuTypeEnum } from '@/enums/MenuTypeEnum';
import { ElTable, ElForm } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { getRouteTitle } from '@/utils/i18n';
import { ComponentInternalInstance } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { sys_show_hide, sys_normal_disable } = toRefs<any>(proxy?.useDict("sys_show_hide", "sys_normal_disable"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
interface MenuOptionsType {
  menuId: number;
  menuName: string;
  children: MenuOptionsType[] | undefined;
}
const menuList = ref<MenuVO[]>([])
const loading = ref(true)
const menuOptions = ref<MenuOptionsType[]>([])
const isExpandAll = ref(false)
const menuNameJson = ref({})
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '800px'
});
const menuFormRef = ref(ElForm);
const initFormData = {
  path: '',
  menuId: undefined,
  parentId: 0,
  menuName: '',
  icon: '',
  menuType: MenuTypeEnum.M,
  orderNum: 1,
  isFrame: "1",
  isCache: "0",
  visible: "0",
  status: "0"
}
// eslint-disable-next-line no-undef
const data = reactive<PageData<MenuForm, MenuQuery>>({
  form: { ...initFormData },
  queryParams: {
    menuName: undefined,
    status: undefined
  },
  rules: {
    orderNum: [{ required: true, message: i18n.global.t('menu.dialog.rules.orderNumRqMsg'), trigger: "blur" }],
    path: [{ required: true, message: i18n.global.t('menu.dialog.rules.pathRqMsg'), trigger: "blur" }]
  },
})
const menuTableRef = ref(ElTable);
// eslint-disable-next-line no-undef
const { queryParams, form, rules } = toRefs<PageData<MenuForm, MenuQuery>>(data)
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
/** Query menu list */
const getList = async () => {
  loading.value = true
  const res = await listMenu(queryParams.value);
  const data = proxy?.handleTree<MenuVO>(res.data, "menuId")
  if (data) {
    menuList.value = data
  }
  loading.value = false
}
/** Query menu drop-down tree structure */
const getTreeselect = async () => {
  menuOptions.value = []
  const response = await listMenu();
  const menu: MenuOptionsType = { menuId: 0, menuName: getRouteTitle('{"vi_VN":"Menu gốc","en_US":"Root menu"}'), children: [] }
  menu.children = proxy?.handleTree<MenuOptionsType>(response.data, "menuId")
  menuOptions.value.push(menu)
}
/** Cancel button */
const cancel = () => {
  reset()
  dialog.visible = false
}
/** Form reset */
const reset = () => {
  form.value = { ...initFormData };
  menuFormRef.value.resetFields();
}

/** Search button action */
const handleQuery = () => {
  getList();
}
/** Reset button action */
const resetQuery = () => {
  handleQuery();
}
/** Add button action */
const handleAdd = (row?: MenuVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('menu.dialog.addTt');
  menuNameJson.value = {vi_VN:"",en_US:""};
  getTreeselect();
  nextTick(() => {
    reset();
    row && row.menuId ? form.value.parentId = row.menuId : form.value.parentId = 0;
  })
}
/** Expand/Collapse operation */
const handleToggleExpandAll = () => {
  isExpandAll.value = !isExpandAll.value;
  toggleExpandAll(menuList.value, isExpandAll.value)
}
/** expand/collapse all */
const toggleExpandAll = (data: MenuVO[], status: boolean) => {
  data.forEach((item: MenuVO) => {
    menuTableRef.value.toggleRowExpansion(item, status)
    if (item.children && item.children.length > 0) toggleExpandAll(item.children, status)
  })
}
/** Edit button action */
const handleUpdate = async (row: MenuVO) => {
  await getTreeselect();
  dialog.visible = true;
  dialog.title = i18n.global.t('menu.dialog.editTt');
  await nextTick(async () => {
    if (row.menuId) {
      const { data } = await getMenu(row.menuId);
      reset();
      form.value = data;
      menuNameJson.value = JSON.parse(form.value.menuName);
    }
  })
}
/** Submit button */
const submitForm = () => {
  menuFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      form.value.menuName = JSON.stringify(menuNameJson.value);
      form.value.menuId ? await updateMenu(form.value) : await addMenu(form.value);
      proxy?.$modal.msgSuccess(i18n.global.t('menu.operationMsg.menuNameRqMsg'));
      dialog.visible = false;
      getList();
    }
  })
}
/** Delete button action */
const handleDelete = async (row: MenuVO) => {
  await proxy?.$modal.confirmDelete(i18n.global.t('menu.operationMsg.deleteCf', { menuName: row.menuName }));
  await delMenu(row.menuId);
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('menu.operationMsg.deleteSuccess'));
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
});
</script>
