<template>
  <v-grid
    ref="vgrid"
    v-if="gridRefresh"
    theme="default"
    :source="rowData"
    :columns="mColumnSetting"
    :readonly="readonly"
    :row-headers="true"
    :resize="true"
    :range="true"
    :rowSize="32"
    :frameSize="10"
    :columnTypes="columnTypes"
    @beforesortingapply="handleBeforesortingapply"
    @beforecellfocus="handleBeforecellfocus"
    @beforeeditstart="handleBeforeeditstart"
    @focusout="onFocusOut"
  ></v-grid>
</template>
<script setup lang="ts">
import VGrid from "@revolist/vue3-datagrid";
import GridTag from '@/components/IrGrid/GridTag.vue';
import RowCheckbox from '@/components/IrGrid/RowCheckbox.vue';
import HeaderCheckbox from '@/components/IrGrid/HeaderCheckbox.vue';
import GridButton from '@/components/IrGrid/GridButton.vue';
import GridIconStatus from '@/components/IrGrid/GridIconStatus.vue';
import GridSwitch from '@/components/IrGrid/GridSwitch.vue';
import GridLink from '@/components/IrGrid/GridLink.vue';
import DateTimeEditor from '@/components/IrGrid/DateTimeEditor.vue';
import SelectEditor from '@/components/IrGrid/SelectEditor.vue';
import Validate from '@/components/IrGrid/Validate.vue';
import GridText from '@/components/IrGrid/GridText.vue';
import i18n from "@/lang";
import { VGridVueTemplate } from "@revolist/vue3-datagrid";
import { h } from 'vue';
import { useI18n } from 'vue-i18n';
import { ComponentInternalInstance } from "vue";
const { locale } = useI18n();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const props = defineProps({
  rowData: {
    type: Array<any>,
    default: null,
  },
  columnSetting: {
    type: Array<any>,
    default: null
  },
  rowKey: {
    type: String,
    default: 'unknown'
  },
  readonly: {
    type: Boolean,
    default: false
  },
  checkboxCol: {
    type: Boolean,
    default: false
  },
  columnTypes: {
    type: Object,
    default: null
  },
  reRender: {
    type: Boolean,
    default: false
  },
  rowDelete: {
    type: Boolean,
    default: false
  }
});
const vgrid = ref();
const gRowIndex = ref(0);
const gColName = ref('');
const colorProp = ref<string>('');
const colorDict = ref<any>(null);
const columnNames = ref<any>([]);
const buttonNames = ref<any>([]);
const preventEditCol = ref<any>([]);
const ignoreFocusOut = ref<number>(0);
const customEditorCol = ref<any>([]);
const gridRefresh = ref(true);
const ids = ref(<any>[]);
const checkAll = ref(false);
const emit = defineEmits(['update:rowData', 'update:columnSetting', 'onSelectedChange', 'onSorting', 'onSelectCell', 'spliceRowData']);
const mRowData = computed({
  get: () => props.rowData,
  set: (val: any) => {
    emit('update:rowData', val)
  }
});
const mColumnSetting = computed({
  get: () => getColumnSetting(),
  set: (val: any) => {
    emit('update:columnSetting', val)
  }
});

const checkHeaderCheckboxChange = () => {
  ids.value = [];
  for (let i = 0; i < mRowData.value.length; i++) {
    mRowData.value[i].checkbox = checkAll.value;
    if (mRowData.value[i].checkbox) {
      ids.value.push(mRowData.value[i][props.rowKey]);
    }
  }
  emit('onSelectedChange', ids);
}

const checkRowCheckboxChange = () => {
  let isAllCheck = true;
  if (mRowData.value.length === 0) {
    return;
  }
  ids.value = [];
  for (let i = 0; i < mRowData.value.length; i++) {
    if (!mRowData.value[i].checkbox) {
      isAllCheck = false;
    } else {
      ids.value.push(mRowData.value[i][props.rowKey]);
    }
  }
  checkAll.value = isAllCheck;
  emit('onSelectedChange', ids);
}
const handleBeforesortingapply = (e: any) => {
  e.preventDefault();
  let column = e.detail.column.prop;
  let order = e.detail.column.order;
  emit('onSorting', {column, order});
}
const handleBeforecellfocus = (e: any) => {
  if (customEditorCol.value.includes(e.detail.prop)) {
    ignoreFocusOut.value = 2;
  };
  for (let i = 0; i < mRowData.value.length; i++) {
    mRowData.value[i].selected = '';
  }
  const rowIndex = e.detail.rowIndex;
  mRowData.value[rowIndex].selected = ' selected';
  emit('onSelectCell', e.detail);
}
const getColumnSetting = () => {
  for (let index = 0; index < props.columnSetting.length; index++) {
    if (props.columnSetting[index].changeRowColor) {
      colorProp.value = props.columnSetting[index].prop;
      colorDict.value = props.columnSetting[index].dictData;
    }
  }
  let columns: any = props.checkboxCol ? [{
    prop: "checkbox",
    name: '',
    readonly: () => true,
    cellTemplate: VGridVueTemplate(h(RowCheckbox, {
      onChange: () => {
        checkRowCheckboxChange();
      },
      colorProp: colorProp.value,
      colorDict: colorDict.value,
      data: mRowData,
      checkAll: checkAll
    })),
    columnTemplate: VGridVueTemplate(h(HeaderCheckbox, {
      onChange: () => {
        checkHeaderCheckboxChange();
      },
      data: props.rowData,
      checkAll: checkAll,
    })),
    size: 33,
    pin: 'colPinStart'
  }].concat(props.columnSetting) : [{}].concat(props.columnSetting);
  if (!props.checkboxCol) {
    columns.splice(0, 1);
  }
  let i = columns.length
  preventEditCol.value = [];
  if (!columnNames.value.length) {
    columns.forEach((column: any) => {
      columnNames.value.push(column.name);
    });
  }
  while (i--) {
    columns[i].name = i18n.global.t(columnNames.value[i]);
    if (columns[i].show !== undefined && columns[i].show !== null && !columns[i].show && 'checkbox' !== columns[i].prop) {
      columns.splice(i, 1);
    } else {
      if ('left' === columns[i].align) {
        columns[i].cellProperties = () => { return { class: { 'align-left': true } }; };
      } else if ('right' === columns[i].align) {
        columns[i].cellProperties = () => { return { class: { 'align-right': true } }; };
      }
      if (columns[i].required) {
        columns[i].columnTemplate = (createElement: any, column: any) => { return createElement('span', {innerHTML: column.name + '<span class="grid-label-req"> *</span>'}, ''); };
      }
      if (columns[i].dictData) {
        columns[i].cellTemplate = VGridVueTemplate(h(GridTag, { dictData: ref(columns[i].dictData), colorProp: colorProp.value, colorDict: colorDict.value }));
      } else if (columns[i].buttonProps) {
        if (!buttonNames.value.length) {
          columns[i].buttonProps.forEach((button: any) => {
            buttonNames.value.push(button.title);
          });
        }
        columns[i].buttonProps.forEach((button: any, index: number) => {
          button.title = i18n.global.t(buttonNames.value[index]);
        });
        columns[i].cellTemplate = VGridVueTemplate(h(GridButton, { buttonProps: columns[i].buttonProps, colorProp: colorProp.value, colorDict: colorDict.value }));
      } else if (columns[i].iconStatusProps) {
        columns[i].cellTemplate = VGridVueTemplate(h(GridIconStatus, { iconStatusProps: columns[i].iconStatusProps, colorProp: colorProp.value, colorDict: colorDict.value }));
      } else if (columns[i].switchFunc) {
        columns[i].cellTemplate = VGridVueTemplate(h(GridSwitch, { change: columns[i].switchFunc, colorProp: colorProp.value, colorDict: colorDict.value }));
      } else if (columns[i].click) {
        columns[i].cellTemplate = VGridVueTemplate(h(GridLink, { click: columns[i].click, colorProp: colorProp.value, colorDict: colorDict.value }));
      } else if (columns[i].editor && columns[i].editor === 'datetime') {
        let props = {
          datePickerProps: {
            pickerType: 'date',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
            format: 'DD/MM/YYYY',
            placeholder: 'DD/MM/YYYY'
          },
          colorProp: colorProp.value,
          colorDict: colorDict.value
        };
        if (columns[i].datePickerProps) {
          if (columns[i].datePickerProps.pickerType && columns[i].datePickerProps.pickerType !== '') {
            props.datePickerProps.pickerType = columns[i].datePickerProps.pickerType;
          }
          if (columns[i].datePickerProps.valueFormat && columns[i].datePickerProps.valueFormat !== '') {
            props.datePickerProps.valueFormat = columns[i].datePickerProps.valueFormat;
          }
          if (columns[i].datePickerProps.format && columns[i].datePickerProps.format !== '') {
            props.datePickerProps.format = columns[i].datePickerProps.format;
          }
          if (columns[i].datePickerProps.placeholder && columns[i].datePickerProps.placeholder !== '') {
            props.datePickerProps.placeholder = columns[i].datePickerProps.placeholder;
          }
        }
        columns[i].cellTemplate = VGridVueTemplate(h(DateTimeEditor, props));
        preventEditCol.value.push(columns[i].prop);
      } else if (columns[i].editor && columns[i].editor === 'select') {
        let props = {
          selectProps: columns[i].selectProps,
          colorProp: colorProp.value,
          colorDict: colorDict.value
        }
        columns[i].cellTemplate = VGridVueTemplate(h(SelectEditor, props));
        preventEditCol.value.push(columns[i].prop);
        customEditorCol.value.push(columns[i].prop);
      } else if (columns[i].validate) {
        columns[i].cellTemplate = VGridVueTemplate(h(Validate, { validateProp: columns[i].validate, colorProp: colorProp.value, colorDict: colorDict.value, onChange: columns[i].onChange }));
      } else if (columns[i].formatter === 'date') {
        columns[i].cellTemplate = VGridVueTemplate(h(GridText, { isDate: true, pattern: '{d}/{m}/{y}', colorProp: colorProp.value, colorDict: colorDict.value }));
      } else if (columns[i].formatter === 'datetime') {
        columns[i].cellTemplate = VGridVueTemplate(h(GridText, { isDate: true, pattern: '', colorProp: colorProp.value, colorDict: colorDict.value }));
      } else if (columns[i].formatter === 'money') {
        columns[i].cellTemplate = VGridVueTemplate(h(GridText, { isMoney: true, pattern: '', colorProp: colorProp.value, colorDict: colorDict.value }));
      } else if ('checkbox' !== columns[i].prop) {
        columns[i].cellTemplate = VGridVueTemplate(h(GridText, { colorProp: colorProp.value, colorDict: colorDict.value }));
      }
    }
  }
  if (props.rowDelete) {
    columns = [{
      prop: 'deleteButton',
      name: '',
      readonly: () => true,
      cellTemplate: VGridVueTemplate(h(GridButton, {
        buttonProps: [{
          index: 1, icon: 'delete', title: '', color: 'red',
          click: (rowIndex: number) => { emit('spliceRowData', rowIndex)}
        }],
        colorProp: colorProp.value,
        colorDict: colorDict.value
      })),
      size: 50,
      pin: 'colPinStart'
    }].concat(columns);
  }
  return columns;
}
const handleBeforeeditstart = (e: any) => {
  if (ignoreFocusOut.value === 2) {
    ignoreFocusOut.value--;
  }
  if (preventEditCol.value.includes(e.detail.prop)) {
    e.preventDefault();
    gRowIndex.value = 0;
    gColName.value = '';
  } else {
    gRowIndex.value = e.detail.rowIndex
    gColName.value = e.detail.prop
  }
}
const onFocusOut = async (e: any) => {
  if (ignoreFocusOut.value === 1) {
    ignoreFocusOut.value--;
    return;
  }
  let viewData = await vgrid.value.$el.getVisibleSource();
  viewData[gRowIndex.value][gColName.value] = e.target.value;
  gRowIndex.value = 0;
  gColName.value = '';
}
const validate = () => {
  if (!props.rowData.length) {
    proxy?.$modal.alertWarning(i18n.global.t('irgrid.validateNotInput'), i18n.global.t('irgrid.validateTt'));
    return false;
  }
  for (let i = 0; i < props.rowData.length; i++) {
    for (let j = 0; j < props.columnSetting.length; j++) {
      if (props.columnSetting[j].required) {
        if (!props.rowData[i][props.columnSetting[j].prop]) {
          proxy?.$modal.alertWarning(i18n.global.t('irgrid.validateDetail', { col: props.columnSetting[j].name, row: (i + 1) }), i18n.global.t('irgrid.validateTt'));
          return false;
        }
      }
    }
  }
  return true;
}
// exposed
defineExpose({
  validate,
});
watch(() => proxy?.$route, () => {
  gridRefresh.value = false;
  nextTick(() => {
    gridRefresh.value = true;
  });
}, { immediate: true });
watch(() => props.reRender, () => {
  gridRefresh.value = false;
  nextTick(() => {
    gridRefresh.value = true;
  });
}, { immediate: true });
watch(() => mColumnSetting.value, () => {
  gridRefresh.value = false;
  nextTick(() => {
    gridRefresh.value = true;
  });
}, { immediate: true });
watch(() => locale.value, () => {
  gridRefresh.value = false;
  nextTick(() => {
    gridRefresh.value = true;
  });
});
</script>
<style lang="scss">
@import "@/assets/styles/variables.module.scss";
.grid-label-req {
  color: $red-500;
}
</style>
