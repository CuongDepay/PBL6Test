<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="movieList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('movieManagement.searchInput.titleLb')" prop="title" class="form-item-search">
        <el-input
          v-model="queryParams.title"
          :placeholder="$t('movieManagement.searchInput.titlePh')"
          style="width: 150px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('movieManagement.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['portCustomer:movieManagement:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('movieManagement.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['portCustomer:movieManagement:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('movieManagement.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['portCustomer:movieManagement:remove']"
        @onClick="handleDelete"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or Modify Movie Dialog -->
          <el-form ref="movieFormRef" :model="form" :rules="rules" label-width="110px" class="common-form">
            <el-form-item :label="$t('movieManagement.dialog.titleTt')" prop="title" class="form-item-row">
              <el-input v-model="form.title" :placeholder="$t('movieManagement.dialog.titlePh')" />
            </el-form-item>
            <el-form-item :label="$t('movieManagement.dialog.movieDescriptionTt')" prop="movieDescription" class="form-item-row">
              <el-input v-model="form.movieDescription" :placeholder="$t('movieManagement.dialog.movieDescriptionPh')" />
            </el-form-item>
            <el-form-item :label="$t('movieManagement.dialog.releaseDateTt')" prop="releaseDate" class="form-item-row">
              <el-input v-model="form.releaseDate" :placeholder="$t('movieManagement.dialog.releaseDatePh')" />
            </el-form-item>
            <el-form-item :label="$t('movieManagement.dialog.endDateTt')" prop="endDate" class="form-item-row">
              <el-input v-model="form.endDate" :placeholder="$t('movieManagement.dialog.endDatePh')" />
            </el-form-item>
            <el-form-item :label="$t('movieManagement.dialog.durationTt')" prop="duration" class="form-item-row">
              <el-input v-model="form.duration" :placeholder="$t('movieManagement.dialog.durationPh')" />
            </el-form-item>
            <el-form-item :label="$t('movieManagement.dialog.languageTt')" prop="language" class="form-item-row">
              <el-input v-model="form.language" :placeholder="$t('movieManagement.dialog.languagePh')" />
            </el-form-item>
            <el-form-item :label="$t('movieManagement.dialog.ratedTt')" prop="rated" class="form-item-row">
              <el-input v-model="form.rated" :placeholder="$t('movieManagement.dialog.ratedPh')" />
            </el-form-item>
            <el-form-item :label="$t('movieManagement.dialog.genreTt')" prop="genre" class="form-item-row">
              <el-input v-model="form.genre" :placeholder="$t('movieManagement.dialog.genrePh')" />
            </el-form-item>
            <el-form-item :label="$t('movieManagement.dialog.directorTt')" prop="director" class="form-item-row">
              <el-input v-model="form.director" :placeholder="$t('movieManagement.dialog.directorPh')" />
            </el-form-item>
            <el-form-item :label="$t('movieManagement.dialog.actorTt')" prop="actor" class="form-item-row">
              <el-input v-model="form.actor" :placeholder="$t('movieManagement.dialog.actorPh')" />
            </el-form-item>
            <el-form-item :label="$t('movieManagement.dialog.ratingTt')" prop="rating" class="form-item-row">
              <el-input v-model="form.rating" :placeholder="$t('movieManagement.dialog.ratingPh')" />
            </el-form-item>
            <el-form-item :label="$t('movieManagement.dialog.posterUrlTt')" prop="posterUrl" class="form-item-row">
              <el-input v-model="form.posterUrl" :placeholder="$t('movieManagement.dialog.posterUrlPh')" />
            </el-form-item>
            <el-form-item :label="$t('movieManagement.dialog.trailerUrlTt')" prop="trailerUrl" class="form-item-row">
              <el-input v-model="form.trailerUrl" :placeholder="$t('movieManagement.dialog.trailerUrlPh')" />
            </el-form-item>
            <el-form-item :label="$t('movieManagement.dialog.remarkTt')" prop="remark" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('movieManagement.dialog.remarkPh')" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('movieManagement.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton
            colorStyle="blue"
            :loadingFlag="buttonLoading"
            type="primary"
            :title="$t('movieManagement.dialog.footerSubmitTt')"
            :width="100"
            @onClick="submitForm"
          />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="movie" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listMovie, getMovie, delMovie, addMovie, updateMovie } from '@/api/portCustomer/movieManagement';
// IMPORT TYPE
import { MovieVO, MovieQuery, MovieForm } from '@/api/portCustomer/movieManagement/types';
import { ElForm } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { sys_normal_disable } = toRefs<any>(proxy?.useDict("sys_normal_disable"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const movieList = ref<MovieVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const ids = ref<Array<string | number>>([]);
const total = ref(0);
const rowKey = ref('id');
const oprOptions = ref<string[]>([]);
const movieFormRef = ref(ElForm);
let opr:any;
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '600px'
});
const columns = ref<GridColumn[]>([
  { prop: "id", name: 'movieManagement.columns.idLb', sortable: true, size: 10, show: false, readonly: true, },
  { prop: "title", name: 'movieManagement.columns.titleLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "movieDescription", name: 'movieManagement.columns.movieDescriptionLb', sortable: true, size: 350, show: true, readonly: true, align: 'left' },
  { prop: "releaseDate", name: 'movieManagement.columns.releaseDateLb', sortable: true, size: 350, show: true, readonly: true, editor: 'datetime', datePickerProps: {
        pickerType: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        format: 'DD/MM/YYYY HH:mm',
        placeholder: 'DD/MM/YYYY HH:mm',
      }, },
  { prop: "endDate", name: 'movieManagement.columns.endDateLb', sortable: true, size: 350, show: true, readonly: true, editor: 'datetime', datePickerProps: {
        pickerType: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        format: 'DD/MM/YYYY HH:mm',
        placeholder: 'DD/MM/YYYY HH:mm',
      }, },
  { prop: "duration", name: 'movieManagement.columns.durationLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "language", name: 'movieManagement.columns.languageLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "rated", name: 'movieManagement.columns.ratedLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "genre", name: 'movieManagement.columns.genreLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "director", name: 'movieManagement.columns.directorLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "actor", name: 'movieManagement.columns.actorLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "rating", name: 'movieManagement.columns.ratingLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "posterUrl", name: 'movieManagement.columns.posterUrlLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "trailerUrl", name: 'movieManagement.columns.trailerUrlLb', sortable: true, size: 350, show: true, readonly: true },
  { prop: "createTime", name: 'movieManagement.columns.createTimeLb', sortable: true, size: 250, show: true, readonly: true, formatter: 'datetime' },
  { prop: "remark", name: 'movieManagement.columns.remarkLb', sortable: true, size: 200, show: true, readonly: true },
  { prop: "operate", name: 'movieManagement.columns.operateLb', size: 120, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', color: 'gray', title: 'movieManagement.columns.editLb', permissionKey: 'portCustomer:movieManagement:edit',
        click: (rowIndex: number) => { handleUpdate(movieList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'delete', color: 'red', title: 'movieManagement.columns.deleteLb', permissionKey: 'portCustomer:movieManagement:remove',
        click: (rowIndex: number) => { handleDelete(movieList.value[rowIndex]); }
      }
    ]
  }
]);
const initFormData: MovieForm = {
  id: undefined,
  title: '',
  movieDescription: '',
  releaseDate: '',
  endDate: '',
  duration: '',
  language: '',
  rated: '',
  genre: '',
  director: '',
  actor: '',
  rating: '',
  posterUrl: '',
  trailerUrl: '',
  remark: ''
}
const data = reactive<PageData<MovieForm, MovieQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    title: '',
    movieDescription: '',
    releaseDate: '',
    endDate: '',
    duration: '',
    language: '',
    rated: '',
    genre: '',
    director: '',
    actor: '',
    rating: '',
    posterUrl: '',
    trailerUrl: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    title: [
      { required: true, message: i18n.global.t('movieManagement.dialog.rules.titleRqMsg'), trigger: "blur" }
    ],
  }
});
const { queryParams, form, rules} = toRefs(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query Movie list */
const getList = async () => {
  loading.value = true;
  const res = await listMovie(queryParams.value);
  movieList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}
/** Cancel button */
const cancel = () => {
  reset();
  dialog.visible = false;
}
/** Form reset */
const reset = () => {
  form.value = {...initFormData};
  movieFormRef.value.resetFields();
}
/** Search button action */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}
/** Reset button action */
const resetQuery = () => {
  handleQuery();
}
/** Add button action */
const handleAdd = () => {
  dialog.visible = true;
  dialog.title = i18n.global.t('movieManagement.dialog.addTt');
  nextTick(async () => {
    reset();
    const { data } = await getMovie();
  });
}
/** Edit button action */
const handleUpdate = (row?: MovieVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('movieManagement.dialog.editTt');
  nextTick(async () => {
    reset();
    const id = row?.id || ids.value[0]
    const { data } = await getMovie(id);
    nextTick(async () => {
    });
    Object.assign(form.value, data);
  });
}
/** Submit button */
const submitForm = () => {
  movieFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMovie(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addMovie(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess(i18n.global.t('movieManagement.operationMsg.submitSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
}
/** Delete button action */
const handleDelete = async (row?: MovieVO) => {
  const apiIds = row?.id || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('movieManagement.operationMsg.deleteCf')).finally(() => loading.value = false);
  await delMovie(apiIds);
  proxy?.$modal.msgSuccess(i18n.global.t('movieManagement.operationMsg.deleteSuccess'));
  await getList();
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
});
</script>
