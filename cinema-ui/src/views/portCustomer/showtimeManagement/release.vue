<template>
  <Layout4 ref="layout" v-loading="loading" v-model:rowData="showtimeList" :columnSetting="showtimeColumns" v-model:rowTotal="rowTotal">
    <template v-slot:right-footer>
      <IrButton colorStyle="gray" type="secondary" :title="$t('showtime.release.closeBtn')" :width="100" @onClick="cancel" />
      <IrButton
        colorStyle="blue"
        type="primary"
        :loadingFlag="buttonLoading"
        :title="$t('showtime.release.releaseOffical')"
        :width="100"
        @onClick="submitForm"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="uploadDialog">
        <template v-slot:body>
          <!-- Showtime Import Dialog -->
          <IrUpload ref="uploadRef" :uploadProp="uploadProp" @onFileSuccess="handleFileSuccess" @downloadTemplate="importTemplate" />
        </template>
        <template v-slot:footer>
          <IrButton
            colorStyle="gray"
            type="secondary"
            :title="$t('showtime.release.importDialogCloseBtn')"
            :width="100"
            @onClick="uploadDialog.visible = false"
          />
          <IrButton colorStyle="blue" type="primary" :title="$t('showtime.release.importDialogImportBtn')" :width="100" @onClick="submitFileForm" />
        </template>
      </IrDialog>
    </template>
  </Layout4>
</template>
<script setup lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
import IrUpload from '@/components/IrUpload/index.vue';
// IMPORT API
import { releaseShowtime } from '@/api/portCustomer/showtimeManagement';
import { listMovie } from '@/api/portCustomer/movieManagement';
import { listCinema } from '@/api/portCustomer/cinemaManagement';
import { getHallMap } from '@/api/portCustomer/hallManagement';
// IMPORT TYPE
import { ShowtimeVO } from '@/api/portCustomer/showtimeManagement/types';
import { CinemaVO } from '@/api/portCustomer/cinemaManagement/types';
import { HallVO } from '@/api/portCustomer/hallManagement/types';
// IMPORT GLOBAL TOOL (PROXY)
import { getToken } from "@/utils/auth";
import i18n from '@/lang';
import { ComponentInternalInstance } from 'vue';
import { useRoute } from "vue-router";
const route = useRoute();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////;
const layout = ref();
const buttonLoading = ref(false);
const rowTotal = ref<number>(0);
const loading = ref(false);
const showtimeList = ref<any[]>([]);
const cinemaList = ref<CinemaVO[]>([]);
const hallMap = ref<any>({});
const movieSelect = ref<SelectProp>({
  dataSource: [],
  key: 'id',
  label: 'title',
  value: 'id'
});
const hallSelect = ref<SelectProp>({
  dataSource: 'hallList',
  key: 'id',
  value: 'id',
  label: 'hallName',
  selectFunc: (rowIndex: number, value: HallVO) => {
    if (value) {
      showtimeList.value[rowIndex].hallId = value.id;
    } else {
      showtimeList.value[rowIndex].hallId = '';
    }
  }
});
const cinemaSelect = ref<SelectProp>({
  dataSource: cinemaList,
  key: 'id',
  value: 'id',
  label: 'cinemaName',
  selectFunc: (rowIndex: number, value: CinemaVO) => {
    if (value) {
      showtimeList.value[rowIndex].hallList = hallMap.value[value.id + ''];
      console.log(showtimeList.value[rowIndex].hallList);
      const hallTemp = showtimeList.value[rowIndex].hallId;
      showtimeList.value[rowIndex].hallId = undefined;
      nextTick(() => {
        showtimeList.value[rowIndex].hallId = hallTemp;
      });
    } else {
      showtimeList.value[rowIndex].hallList = [];
    }
  }
});
const showtimeColumns = ref<GridColumn[]>(
  [
    { prop: "movieId", name: 'showtime.release.movieNameLb', size: 300, editor: 'select', selectProps: movieSelect.value, required: true },
    { prop: "cinemaId", name: 'showtime.release.cinemaNameLb', size: 300, editor: 'select', selectProps: cinemaSelect.value, required: true },
    { prop: "hallId", name: 'showtime.release.hallNameLb', size: 200, editor: 'select', selectProps: hallSelect.value, required: true },
    { prop: "startTime", name: 'showtime.release.startTimeLb', sortable: true, size: 200, required: true, editor: 'datetime', datePickerProps: {
        pickerType: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        format: 'DD/MM/YYYY HH:mm',
        placeholder: 'DD/MM/YYYY HH:mm',
      },
    },
    { prop: "", name: '', size: 20 }
  ]
);
const uploadDialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '400px'
});
const uploadRef = ref(IrUpload);
/*** User Import Parameters */
const uploadProp = reactive<ImportOption>({
  // Set the upload request header
  headers: { Authorization: import.meta.env.VITE_BEARER_KEY + getToken() },
  // upload address
  url: import.meta.env.VITE_APP_BASE_API + "/shippingline/shpShowtime/edo/importShowtime",
  type: "excel",
  accept: ".xlsx, .xls",
  templateName: 'edo_template.xlsx'
})
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const cancel = () => {
  const obj = { path: "/managementCinema/showtime" };
  proxy?.$tab.closeOpenPage(obj);
}
const getHallList =async () => {
  const res = await getHallMap();
  hallMap.value = res.data;
}
const getMovieList = async () => {
  loading.value = true;
  const res = await listMovie();
  movieSelect.value.dataSource = res.rows;
  loading.value = false;
}
const getCinemaList = async () => {
  loading.value = true;
  const res = await listCinema();
  cinemaSelect.value.dataSource = res.rows;
  loading.value = false;
}
const submitForm = async () => {
  const valid = layout.value.validate();
  if (valid) {
    await proxy?.$modal.confirmWarning(i18n.global.t('showtime.release.releaseCf'));
    loading.value = true;
    buttonLoading.value = true;
    await releaseShowtime(showtimeList.value).finally(() => { buttonLoading.value = false; loading.value = false; });
    proxy?.$modal.msgSuccess(i18n.global.t('showtime.release.releaseSuccess'));
    cancel();
  }
}
/** Download Template Action */
const importTemplate = () => {
  proxy?.download("shpShowtime/edo/importTemplate", {
  }, `edo_template_${new Date().getTime()}.xlsx`);
}
/** Import button action */
const handleImport = () => {
  uploadDialog.title = i18n.global.t('edo.release.importDialogTt');
  uploadDialog.visible = true;
}
/** submit file upload */
function submitFileForm() {
  uploadRef.value.submit();
}
/** File upload successfully processed */
const handleFileSuccess = (response: any) => {
  uploadDialog.visible = false;
  proxy?.$modal.alertSuccess(i18n.global.t('edo.release.importFileSuccess'), response.msg);
  showtimeList.value = showtimeList.value.concat(response.data);
  rowTotal.value = showtimeList.value.length;
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getMovieList();
  getCinemaList();
  getHallList();
});
</script>
