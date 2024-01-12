<template>
  <Layout3
    ref="layout"
    v-loading="layoutLoading"
    :loadingLeft="hallLoading"
    :loadingRight="hallSeatLoading"
    :queryParamsLeft="hallQueryParams"
    :queryParamsRight="hallSeatQueryParams"
    :totalLeft="hallTotal"
    :rowDataLeft="hallList"
    v-model:rowDataRight="hallSeatList"
    :columnSettingLeft="hallColumns"
    :columnSettingRight="hallSeatColumns"
    :rowKeyLeft="hallRowKey"
    :rowKeyRight="hallSeatRowKey"
    :checkboxColLeft="true"
    :checkboxColRight="true"
    @onSelectedRowsLeft="handleSelectHallRows"
    @onSelectedRowsRight="handleSelectContainerRows"
    @onSelectCellLeft="handleSelectCellHall"
    @onSearchLeft="handleQuery"
    @onResetLeft="resetQuery"
    @onPagingLeft="getHallList"
    @onPagingRight="getHallSeatList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('hallManagement.searchInput.hallNameLb')" class="form-item-search">
        <el-input
          v-model="hallQueryParams.cinemaName"
          :placeholder="$t('hallManagement.searchInput.hallNamePh')"
          clearable
          style="width: 120px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('hallManagement.searchInput.cinemaIdLb')" prop="cinemaId" class="form-item-search">
        <el-select
          v-model="hallQueryParams.cinemaId"
          :placeholder="$t('hallManagement.searchInput.cinemaIdPh')"
          clearable
          style="width: 150px"
          @change="handleQuery"
        >
          <el-option
            v-for="cinema in cinemaOptions"
            :key="cinema.id"
            :label="cinema.cinemaName"
            :value="cinema.id"
          />
        </el-select>
      </el-form-item>
    </template>
    <template v-slot:header-button-left>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('hallManagement.headerButton.addTt')"
        v-hasPermi="['portCustomer:hallManagement:add']"
        leftIcon="plus"
        @onClick="handleHallAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="hallIds.length !== 1 ? true : false"
        :title="$t('hallManagement.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['portCustomer:hallManagement:edit']"
        @onClick="handleHallUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!hallIds.length"
        :title="$t('hallManagement.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['portCustomer:hallManagement:edit']"
        @onClick="handleDeleteHall"
      />
    </template>
    <template v-slot:header-button-right>
      <IrButton
        colorStyle="green"
        type="secondary"
        title="Lưu"
        leftIcon="save"
        @onClick="handleHallSeatUpdate"
        :disabledFlag="!!!hallSeatIds.length"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="hallDialog">
        <template v-slot:body>
          <el-form
            ref="hallFormRef"
            :rules="hallFormRules"
            :model="hallForm"
            label-width="150px"
            class="common-form"
            v-loading="layoutHallFormLoading"
          >
            <el-form-item label="Rạp chiếu" prop="cinemaId" class="form-item-row">
              <el-select v-model="hallForm.cinemaId" placeholder="Nhập">
                <el-option
                  v-for="item in cinemaOptions"
                  :key="item.id"
                  :label="item.cinemaName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Tên phòng" prop="hallName" class="form-item-row">
              <el-input v-model="hallForm.hallName" placeholder="Nhập" />
            </el-form-item>
            <el-form-item label="Số hàng ghế" prop="rowNumber" class="form-item-row">
              <el-input v-model="hallForm.rowNumber" placeholder="Nhập" />
            </el-form-item>
            <el-form-item label="Ghi chú" prop="remark" class="form-item-row">
              <el-input v-model="hallForm.remark" type="textarea" placeholder="Nhập" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" title="Đóng" :width="100" @onClick="cancel" />
          <IrButton colorStyle="blue" type="primary" :title="$t('user.dialog.footerSubmitTt')" :width="100" @onClick="submitHallForm" />
        </template>
      </IrDialog>
    </template>
  </Layout3>
</template>
<script setup name="hall" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { getCinemas } from "@/api/system/user"
import { listHall, getHall, delHall, addHall, updateHall, listHallSeat, updateHallSeats } from '@/api/portCustomer/hallManagement';
import { listSeatType } from '@/api/portCustomer/seatTypeManagement';
// IMPORT TYPE
import { CinemaVO } from "@/api/portCustomer/cinemaManagement/types";
import { HallVO, HallSeatVO, HallQuery, HallSeatQuery, HallForm } from '@/api/portCustomer/hallManagement/types';
import { SeatTypeVO } from '@/api/portCustomer/seatTypeManagement/types';
import { ElForm, FormRules } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import { ComponentInternalInstance, reactive } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const hallId = ref<any>('');
const hallSelected = ref<any>({});
const layoutLoading = ref(false);
const layoutHallFormLoading = ref(false);
const fileUploadRef = ref();
const hallList = ref<HallVO[]>([]);
  const seatTypeList = ref<SeatTypeVO[]>([]);
const hallIds = ref(<any>[]);
const hallLoading = ref(true);
const hallTotal = ref(0);
const hallRowKey = ref("id");
const cinemaOptions = ref<CinemaVO[]>([]);
const hallColumns = ref<GridColumn[]>([
  { prop: "hallName", name: 'hallManagement.columns.hallNameLb', size: 120, readonly: true, align: 'left' },
  { prop: "cinemaName", name: 'hallManagement.columns.cinemaNameLb', sortable: true, size: 120, readonly: true, align: 'left' },
  { prop: "rowNumber", name: 'hallManagement.columns.rowNumberLb', sortable: true, size: 100, readonly: true, align: 'right'  },
  { prop: "createTime", name: 'hallManagement.columns.createTimeLb', sortable: true, size: 160, readonly: true, formatter: 'datetime' },
  { prop: "remark", name: 'hallManagement.columns.remarkLb', sortable: true, size: 150, readonly: true, align: 'left' },
]);
const hallSeatIds = ref(<any>[]);
const hallSeatList = ref<any[]>([]);
const hallSeatLoading = ref(false);
const hallSeatRowKey = ref("id");
const seatTypeSelect = ref<SelectProp>({
  dataSource: seatTypeList,
  key: 'id',
  value: 'id',
  label: 'seatTypeName',
  selectFunc: (rowIndex: number, value: SeatTypeVO) => {
    if (value) {
      hallSeatList.value[rowIndex].seatTypeId = value.id;
    } else {
      hallSeatList.value[rowIndex].seatTypeId = '';
    }
  }
});
const hallSeatColumns = ref<GridColumn[]>([
  { prop: "rowCode", name: 'hallManagement.hallSeatColumns.rowCodeLb', sortable: true, size: 100, align: 'center' },
  { prop: "rowSeatNumber", name: 'hallManagement.hallSeatColumns.rowSeatNumberLb', sortable: true, size: 150, align: 'left' },
  { prop: "seatTypeId", name: 'hallManagement.hallSeatColumns.seatTypeIdLb', sortable: true, size: 150, editor: 'select', selectProps: seatTypeSelect.value },
  { prop: "remark", name: 'hallManagement.hallSeatColumns.remarkLb', size: 150, align: 'left' }
]);
const hallQueryParams = reactive<HallQuery>({
  pageNum: 1,
  pageSize: 20,
  cinemaId: '',
  cinemaName: '',
  hallName: '',
  orderByColumn: 'createTime',
  isAsc: 'descending',
});
const hallSeatQueryParams = reactive<HallSeatQuery>({
  hallId: undefined
});
const hallFormRef = ref(ElForm);
const initHallFormData: HallForm = {
  id: undefined,
  remark: undefined
}
const hallDialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '600px'
});
const hallForm = ref<HallForm>({...initHallFormData});
const hallFormRules: FormRules = {
  cinemaId: [{required: true, trigger: "blur", message: "Rạp chiếu không được trống", }],
  hallName: [{ required: true, trigger: "blur", message: "Tên phòng chiếu không được trống" }]
};
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSelectHallRows = (selectedIds: { value: (string | number)[]; }) => {
  hallIds.value = selectedIds.value;
}
const handleSelectContainerRows = (selectedIds: { value: (string | number)[]; }) => {
  hallSeatIds.value = selectedIds.value;
}
const handleSelectCellHall = (modal: any) => {
  hallSeatIds.value = [];
  resetHallSeatList();
  hallSeatQueryParams.hallId = hallList.value[modal.rowIndex].id;
  hallSelected.value = hallList.value[modal.rowIndex];
  hallId.value = hallList.value[modal.rowIndex].id;
  getHallSeatList();
}
/** Query category vessel voyage pod */
const getSeatTypeList =async () => {
  const res = await listSeatType({
    pageNum: 1,
    pageSize: 20,
    orderByColumn: 'createTime',
    isAsc: 'descending'
  });
  seatTypeList.value = res.rows;
}
/** Query hall list */
const getHallList = async () => {
  hallLoading.value = true;
  const res = await listHall(hallQueryParams);
  hallList.value = res.rows;
  hallTotal.value = res.total;
  hallLoading.value = false;
  resetHallSeatList();
  if (hallList.value.length > 0) {
    hallSeatQueryParams.hallId = hallList.value[0].id;
    hallSelected.value = hallList.value[0];
    hallId.value = hallList.value[0].id;
    getHallSeatList();
  }
}
/** Query hall detail list */
const getHallSeatList = async () => {
  hallSeatLoading.value = true;
  const res = await listHallSeat(hallSeatQueryParams);
  hallSeatList.value = res.rows;
  const diff = hallSelected.value.rowNumber - hallSeatList.value.length;
  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      hallSeatList.value.push({ key: i });
    }
  }
  for (let i = 0; i < hallSeatList.value.length; i++) {
    if (hallSeatList.value[i].id) {
      hallSeatList.value[i].key = hallSeatList.value[i].id;
    }
  }
  hallSeatLoading.value = false;
}
/** Reset container list */
const resetHallSeatList = () => {
  hallSelected.value = {};
  hallId.value = '';
  hallSeatList.value = [];
  hallIds.value = [];
  hallSeatQueryParams.hallId = undefined;
}
/** Cancel button */
const cancel = () => {
  reset();
  hallDialog.visible = false;
}
/** Form reset */
const reset = () => {
  hallForm.value = {...initHallFormData};
  hallFormRef.value.resetFields();
}
/** Search button action */
const handleQuery = () => {
  hallQueryParams.pageNum = 1;
  getHallList();
}
/** Reset button action */
const resetQuery = () => {
  handleQuery();
}
/** Add button action */
const handleHallAdd = () => {
  hallDialog.visible = true;
  hallDialog.title = 'Tạo phòng chiếu';
  nextTick(() => {
    resetHallForm();
    fetchCinema1();
  })
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
const handleHallUpdate = (row?: HallForm | HallVO) => {
  hallDialog.visible = true;
  hallDialog.title = 'Cập nhật thông tin phòng chiếu';
  nextTick(async () => {
    resetHallForm();
    const cinemaId = row?.cinemaId || hallIds.value[0];
    const _id = hallIds.value[0]
    const res = await getHall(_id);
    Object.assign(hallForm.value, res.data);
    fetchCinema2(cinemaId);
  })
}
/** Form reset */
const resetHallForm = () => {
  hallForm.value = {...initHallFormData};
  hallFormRef.value.resetFields();
}
/** Submit button */
const submitHallForm = () => {
  hallFormRef.value.validate(async (valid: boolean) => {
    if (valid && (fileUploadRef.value ? fileUploadRef.value.submitFile() : true)) {
      layoutHallFormLoading.value = true;
      if (hallForm.value.id) {
        await updateHall(hallForm.value).finally(() => layoutHallFormLoading.value = false);
      } else {
        await addHall(hallForm.value).finally(() => layoutHallFormLoading.value = false);
      }
      proxy?.$modal.msgSuccess('Lưu thành công');
      hallDialog.visible = false;
      await getHallList();
    }
  });
}
/** Save list hall seat */
const handleHallSeatUpdate = async () => {
  layoutLoading.value = true;
  //let listHallSeatData = hallSeatList.value.filter((hallSeat) => hallSeatIds.value.includes(parseInt(hallSeat.id + '')))
  let listHallSeatData = hallSeatList.value;
  await updateHallSeats(listHallSeatData, hallSelected.value.id).finally(() => layoutLoading.value = false);
  getHallSeatList();
}

/** Validate delete */
const handleDeleteHall = async () => {
  const ids = hallIds.value
  await proxy?.$modal.confirmDelete("Xác nhận xóa phòng?").then(action => {
    layoutLoading.value = true;
    if (action === 'cancel') return;
    delHall(ids).finally(() => layoutLoading.value = false);
  })
  getHallList();
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getHallList();
  getSeatTypeList();
});
</script>
