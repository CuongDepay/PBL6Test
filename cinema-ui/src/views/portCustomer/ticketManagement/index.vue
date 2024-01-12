<template>
  <Layout3
    ref="layout"
    v-loading="layoutLoading"
    :loadingLeft="bookingLoading"
    :loadingRight="bookingDetailLoading"
    :queryParamsLeft="bookingQueryParams"
    :queryParamsRight="bookingDetailQueryParams"
    :totalLeft="bookingTotal"
    :rowDataLeft="bookingList"
    v-model:rowDataRight="bookingDetailList"
    :columnSettingLeft="bookingColumns"
    :columnSettingRight="bookingDetailColumns"
    :rowKeyLeft="bookingRowKey"
    :rowKeyRight="bookingDetailRowKey"
    :checkboxColLeft="true"
    :checkboxColRight="true"
    @onSelectedRowsLeft="handleSelectBookingRows"
    @onSelectedRowsRight="handleSelectContainerRows"
    @onSelectCellLeft="handleSelectCellBooking"
    @onSearchLeft="handleQuery"
    @onResetLeft="resetQuery"
    @onPagingLeft="getBookingList"
    @onPagingRight="getBookingDetailList"
  >
  </Layout3>
</template>
<script setup name="booking" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { getCinemas } from "@/api/system/user"
import { listBooking, getBooking, delBooking, addBooking, updateBooking, listBookingDetail, updateBookingDetail } from '@/api/portCustomer/ticketManagement';
// IMPORT TYPE
import { CinemaVO } from "@/api/portCustomer/cinemaManagement/types";
import { BookingVO, BookingDetailVO, BookingQuery, BookingDetailQuery, BookingForm } from '@/api/portCustomer/ticketManagement/types';

import { ElForm, FormRules } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import { ComponentInternalInstance, reactive } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const bookingId = ref<any>('');
const bookingSelected = ref<any>({});
const layoutLoading = ref(false);
const layoutBookingFormLoading = ref(false);
const fileUploadRef = ref();
const bookingList = ref<BookingVO[]>([]);

const bookingIds = ref(<any>[]);
const bookingLoading = ref(true);
const bookingTotal = ref(0);
const bookingRowKey = ref("id");
const cinemaOptions = ref<CinemaVO[]>([]);
const bookingColumns = ref<GridColumn[]>([
  { prop: "nickName", name: 'ticketManagement.columns.nickNameLb', size: 120, readonly: true, align: 'left' },
  { prop: "cinemaName", name: 'ticketManagement.columns.cinemaNameLb', sortable: true, size: 120, readonly: true, align: 'left' },
  { prop: "numTicket", name: 'ticketManagement.columns.numTicketLb', sortable: true, size: 100, readonly: true, align: 'right'  },
  { prop: "totalPrice", name: 'ticketManagement.columns.totalPriceLb', sortable: true, size: 100, readonly: true, align: 'right'  },
  { prop: "promotionId", name: 'ticketManagement.columns.promotionIdLb', sortable: true, size: 100, readonly: true, align: 'right'  },
  { prop: "movieName", name: 'ticketManagement.columns.movieNameLb', sortable: true, size: 100, readonly: true, align: 'right'  },
  { prop: "createTime", name: 'ticketManagement.columns.createTimeLb', sortable: true, size: 160, readonly: true, formatter: 'datetime' },
]);
const bookingDetailIds = ref(<any>[]);
const bookingDetailList = ref<any[]>([]);
const bookingDetailLoading = ref(false);
const bookingDetailRowKey = ref("id");
const bookingDetailColumns = ref<GridColumn[]>([
  { prop: "rowCode", name: 'ticketManagement.bookingDetailColumns.rowCodeLb', sortable: true, size: 100, align: 'center' },
  { prop: "columnCode", name: 'ticketManagement.bookingDetailColumns.columnCodeLb', sortable: true, size: 150, align: 'left' },
]);
const bookingQueryParams = reactive<BookingQuery>({
  pageNum: 1,
  pageSize: 20,
  bookingId: '',
  cinemaId: '',
  cinemaName: '',
  orderByColumn: 'id',
  isAsc: 'descending',
});
const bookingDetailQueryParams = reactive<BookingDetailQuery>({
  bookingId: undefined
});
const bookingFormRef = ref(ElForm);
const initBookingFormData: BookingForm = {
  id: undefined,
  remark: undefined
}
const bookingDialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '600px'
});
const bookingForm = ref<BookingForm>({...initBookingFormData});
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSelectBookingRows = (selectedIds: { value: (string | number)[]; }) => {
  bookingIds.value = selectedIds.value;
}
const handleSelectContainerRows = (selectedIds: { value: (string | number)[]; }) => {
  bookingDetailIds.value = selectedIds.value;
}
const handleSelectCellBooking = (modal: any) => {
  bookingDetailIds.value = [];
  resetBookingDetailList();
  bookingDetailQueryParams.bookingId = bookingList.value[modal.rowIndex].id;
  bookingSelected.value = bookingList.value[modal.rowIndex];
  bookingId.value = bookingList.value[modal.rowIndex].id;
  getBookingDetailList();
}
/** Query category vessel voyage pod */
// const getSeatTypeList =async () => {
//   const res = await listSeatType({
//     pageNum: 1,
//     pageSize: 20,
//     orderByColumn: 'createTime',
//     isAsc: 'descending'
//   });
//   seatTypeList.value = res.rows;
// }
/** Query hall list */
const getBookingList = async () => {
  bookingLoading.value = true;
  const res = await listBooking(bookingQueryParams);
  bookingList.value = res.rows;
  bookingTotal.value = res.total;
  bookingLoading.value = false;
  resetBookingDetailList();
  if (bookingList.value.length > 0) {
    bookingDetailQueryParams.bookingId = bookingList.value[0].id;
    bookingSelected.value = bookingList.value[0];
    bookingId.value = bookingList.value[0].id;
    getBookingDetailList();
  }
}
/** Query hall detail list */
const getBookingDetailList = async () => {
  // eslint-disable-next-line no-undef
  bookingDetailLoading.value = true;
  const res = await listBookingDetail(bookingDetailQueryParams);
  bookingDetailList.value = res.rows;
  const diff = bookingSelected.value.rowNumber - bookingDetailList.value.length;
  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      bookingDetailList.value.push({ key: i });
    }
  }
  for (let i = 0; i < bookingDetailList.value.length; i++) {
    if (bookingDetailList.value[i].id) {
      bookingDetailList.value[i].key = bookingDetailList.value[i].id;
    }
  }
  // eslint-disable-next-line no-undef
  bookingDetailLoading.value = false;
}
/** Reset container list */
const resetBookingDetailList = () => {
  bookingSelected.value = {};
  bookingId.value = '';
  bookingDetailList.value = [];
  bookingIds.value = [];
  bookingDetailQueryParams.bookingId = undefined;
}
/** Cancel button */
const cancel = () => {
  reset();
  bookingDialog.visible = false;
}
/** Form reset */
const reset = () => {
  bookingForm.value = {...initBookingFormData};
  bookingFormRef.value.resetFields();
}
/** Search button action */
const handleQuery = () => {
  bookingQueryParams.pageNum = 1;
  getBookingList();
}
/** Reset button action */
const resetQuery = () => {
  handleQuery();
}

/** Validate delete */
const handleDeleteBooking = async () => {
  const ids = bookingIds.value
  await proxy?.$modal.confirmDelete("Xác nhận xóa vé?").then(action => {
    layoutLoading.value = true;
    if (action === 'cancel') return;
    delBooking(ids).finally(() => layoutLoading.value = false);
  })
  getBookingList();
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getBookingList();
});
</script>
