<template>
  <Layout3
    v-loading="layoutLoading"
    :loadingLeft="showtimeLoading"
    :loadingRight="seatLoading"
    :queryParamsLeft="showtimeQueryParams"
    :queryParamsRight="seatQueryParams"
    :totalLeft="showtimeTotal"
    :rowDataLeft="showtimeList"
    :rowDataRight="seatList"
    :columnSettingLeft="showtimeColumns"
    :columnSettingRight="seatColumns"
    :rowKeyLeft="showtimeRowKey"
    :rowKeyRight="seatRowKey"
    :checkboxColLeft="false"
    :checkboxColRight="true"
    @onSelectedRowsRight="handleSeletectSeatRows"
    @onSelectCellLeft="handleSelectCellShowtime"
    @onSearchLeft="handleQuery"
    @onSearchRight="getSeatList"
    @onResetLeft="resetQuery"
    @onPagingLeft="getShowtimeList"
    @onPagingRight="getSeatList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('showtime.searchInput.movieNameLb')" prop="movieName" class="form-item-search">
        <el-input
          v-model="showtimeQueryParams.movieName"
          :placeholder="$t('showtime.searchInput.movieNameLb')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('showtime.searchInput.cinemaNameLb')" prop="cinemaId" class="form-item-search">
        <el-select v-model="showtimeQueryParams.cinemaId" :placeholder="$t('showtime.searchInput.cinemaNamePh')" clearable style="width: 250px" @change="handleQuery" filterable>
          <el-option
            v-for="cinema in cinemaList"
            :key="cinema.id"
            :label="cinema.cinemaName"
            :value="cinema.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('showtime.searchInput.hallNameLb')" prop="hallName" class="form-item-search">
        <el-input
          v-model="showtimeQueryParams.hallName"
          :placeholder="$t('showtime.searchInput.hallNamePh')"
          clearable
          style="width: 150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('showtime.searchInput.releaseDateLb')" style="width: 230px" class="form-item-search">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          format="DD/MM/YYYY"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('showtime.searchInput.startTimePh')"
          :end-placeholder="$t('showtime.searchInput.endTimePh')"
          @change="handleQuery"
        />
      </el-form-item>
    </template>
    <template v-slot:header-button-left>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('showtime.headerButtonLeft.releaseShowtimeTt')"
        v-hasPermi="['portCustomer:showtimeManagement:release']"
        leftIcon="plus"
        @onClick="goToReleaseShowtime"
      />
    </template>
    <template v-slot:header-button-right>
      <IrButton
        colorStyle="yellow"
        type="secondary"
        :title="$t('showtime.headerButtonRight.editTt')"
        v-hasPermi="['portCustomer:showtimeManagement:edit']"
        :disabledFlag="!!!seatIds.length"
        leftIcon="edit"
        @onClick="handleUpdate"
      />
    </template>
  </Layout3>
</template>
<script setup name="Showtime" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listShowtime } from '@/api/portCustomer/showtimeManagement';
import { listSeat, getSeat } from '@/api/portCustomer/seatManagement';
import { listCinema } from '@/api/portCustomer/cinemaManagement';
// IMPORT TYPE
import { ShowtimeVO, ShowtimeQuery } from '@/api/portCustomer/showtimeManagement/types';
import { SeatVO, SeatQuery, SeatForm } from '@/api/portCustomer/seatManagement/types';
import { CinemaVO } from '@/api/portCustomer/cinemaManagement/types';
import { DateModelType } from 'element-plus';
import { ElForm } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const router = useRouter();
const route = useRoute();
// IMPORT DICTIONARY
const { order_status } = toRefs<any>(proxy?.useDict("order_status"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const showtimeId = ref<any>('');
const showtimeSelected = ref<any>({});
const cinemaList = ref<CinemaVO[]>([]);
const layoutLoading = ref(false);
const dateRange = ref<[DateModelType, DateModelType]>(['', '']);
const showtimeList = ref<ShowtimeVO[]>([]);
const showtimeLoading = ref(true);
const showtimeTotal = ref(0);
const showtimeRowKey = ref("id");
const showtimeColumns = ref<GridColumn[]>(
  [
    { prop: "movieName", name: 'showtime.showtimeColumns.movieNameLb', sortable: true, size: 150, readonly: true, align: 'left' },
    { prop: "cinemaName", name: 'showtime.showtimeColumns.cinemaNameLb', sortable: true, size: 120, readonly: true, align: 'left' },
    { prop: "hallName", name: 'showtime.showtimeColumns.hallNameLb', sortable: true, size: 120, readonly: true, align: 'left' },
    { prop: "startTime", name: 'showtime.showtimeColumns.startTimeLb', sortable: true, size: 150, readonly: true },
    { prop: "endTime", name: 'showtime.showtimeColumns.endTimeLb', sortable: true, size: 150, readonly: true }
  ]
);
const seatDialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '500px'
});
const initSeatFormData: SeatForm = {
  id: undefined,
  hallId: undefined,
  showtimeId: undefined,
  seatTypeId: undefined,
  rowCode: '',
  columnCode: '',
  status: ''
}
const seatId = ref<string | number>(0);
const seatForm = reactive<SeatForm>({...initSeatFormData});
const seatList = ref<SeatVO[]>([]);
const seatLoading = ref(false);
const seatRowKey = ref("id");
const seatIds = ref(<any>[]);
const iconStatusProps = ref<GridIconStatus[]>([
  { prop: 'status', dictData: order_status, icon: 'window' }
]);
const seatColumns = ref<GridColumn[]>([
  { prop: "iconStatus", name: 'showtime.seatColumns.iconStatusLb', size: 100, readonly: true, pin: 'colPinStart', iconStatusProps: iconStatusProps.value },
  { prop: "rowCode", name: 'showtime.seatColumns.rowCodeLb', sortable: true, size: 80, readonly: true, pin: 'colPinStart' },
  { prop: "columnCode", name: 'showtime.seatColumns.columnCodeLb', sortable: true, size: 80, readonly: true },
  { prop: "seatTypeName", name: 'showtime.seatColumns.seatTypeNameLb', sortable: true, size: 120, readonly: true },
  { prop: "price", name: 'showtime.seatColumns.priceLb', sortable: true, size: 100, readonly: true, align: 'right', formatter: 'money' },
  { prop: "", name: '', sortable: true, size: 80, readonly: true, align: 'right' }
]);
const showtimeQueryParams = reactive<ShowtimeQuery>({
  pageNum: 1,
  pageSize: 20,
  cinemaId: undefined,
  movieName: '',
  hallName: '',
  startTime: '',
  endTime: '',
  orderByColumn: 'startTime',
  isAsc: 'descending'
});
const seatQueryParams = reactive<SeatQuery>({
  pageNum: 1,
  pageSize: 200,
  id: undefined,
  hallId: undefined,
  showtimeId: undefined,
  seatTypeId: undefined,
  orderByColumn: 'rowCode',
  isAsc: 'ascending'
});
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectSeatRows = (selectedIds: { value: (string | number)[]; }) => {
  seatIds.value = selectedIds.value;
}
/** Query showtime table list */
const getShowtimeList = async () => {
  showtimeLoading.value = true;
  const res = await listShowtime(proxy?.addDateRange(showtimeQueryParams, dateRange.value));
  showtimeList.value = res.rows;
  showtimeTotal.value = res.total;
  showtimeLoading.value = false;
  resetSeatList();
  if (showtimeList.value.length > 0) {
    seatQueryParams.showtimeId = showtimeList.value[0].id;
    showtimeSelected.value = showtimeList.value[0];
    showtimeId.value = showtimeList.value[0].id;
    getSeatList();
  }
}
const handleSelectCellShowtime = (modal: any) => {
  resetSeatList();
  seatQueryParams.showtimeId = showtimeList.value[modal.rowIndex].id;
  showtimeSelected.value = showtimeList.value[modal.rowIndex];
  showtimeId.value = showtimeList.value[modal.rowIndex].id;
  getSeatList();
}
/** Get cinema list */
const getCinemaList = async () => {
  const res = await listCinema();
  cinemaList.value = res.rows;
}
/** Query EDO Detail table list */
const getSeatList = async () => {
  seatLoading.value = true;
  const res = await listSeat(seatQueryParams);
  seatList.value = res.rows;
  seatLoading.value = false;
}
/** Reset seat list */
const resetSeatList = () => {
  seatList.value = [];
  seatIds.value = [];
  seatQueryParams.showtimeId = '';
}
/** Search button action */
const handleQuery = () => {
  showtimeQueryParams.pageNum = 1;
  getShowtimeList();
}
/** Reset button action */
const resetQuery = () => {
  dateRange.value = ['', ''];
  handleQuery();
}
const goToReleaseShowtime = () => {
  router.push("/portCustomer/showtime-seat/index");
}
/** Edit button action */
const handleUpdate = (row?: SeatVO) => {
  seatDialog.visible = true;
  seatDialog.title = i18n.global.t('showtime.dialog.editSingleTt');
  nextTick(async () => {
    if (row?.id) {
      const res = await getSeat(row?.id);
      Object.assign(seatForm, res.data);
    }
  })
  reset();
}

/** Form reset */
const reset = () => {
  Object.assign(seatForm, { ...initSeatFormData });
};

///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
watch(() => route.query.cinemaId, (v) => {
  if (v && typeof v === 'string') {
    showtimeQueryParams.cinemaId = v;
    handleQuery();
  }
}, { immediate: true });
watch(() => route.query.hallId, (v) => {
  if (v && typeof v === 'string') {
    showtimeQueryParams.hallId = v;
    handleQuery();
  }
}, { immediate: true });
watch(() => route.query.showtimeId, (v) => {
  if (v && typeof v === 'string') {
    showtimeQueryParams.id = v;
    handleQuery();
  }
}, { immediate: true });
onMounted(() => {
  getShowtimeList();
  getCinemaList();
});
</script>
