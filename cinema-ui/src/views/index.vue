<template>
  <Layout6 v-loading="loading" :queryParams="queryParams" :total="total" @onSearch="handleQuery" @onReset="resetQuery" @onPaging="getList">
    <template v-slot:search-input>
      <el-form-item :label="$t('bulletin.searchInput.titleLb')" prop="noticeTitle" class="form-item-search">
        <el-input
          v-model="queryParams.noticeTitle"
          :placeholder="$t('bulletin.searchInput.titlePh')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('bulletin.searchInput.createTimeLb')" style="width: 230px;" class="form-item-search">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          format="DD/MM/YYYY"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('bulletin.searchInput.createTimeStartPh')"
          :end-placeholder="$t('bulletin.searchInput.createTimeEndPh')"
          @change="handleQuery"
        />
      </el-form-item>
    </template>
    <template v-slot:body>
      <div class="bulletin-container">
        <template v-for="(item) in bulletinList" :key="item.noticeId">
          <div class="bulletin-item">
            <div class="bulletin-border">
              <div class="bulletin-mark"><div class="core"></div></div>
              <div class="bulletin-dashed"></div>
            </div>
            <div class="bulletin-right">
              <div class="bulletin-title">
                <div class="bulletin-date"><svg-icon icon-class="calendar-solid" />{{ parseTime(item.createTime, '{d}/{m}/{y}') }}</div>
                <div class="bulletin-text">{{ item.noticeTitle }}</div>
              </div>
              <div class="bulletin-content" v-html="item.noticeContent"></div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </Layout6>
</template>

<script setup name="Index" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listBulletin } from "@/api/bulletin";
// IMPORT TYPE
import { NoticeQuery, NoticeVO } from "@/api/system/notice/types";
import { DateModelType } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const loading = ref(true);
const bulletinList = ref<NoticeVO[]>([]);
const total = ref(0);
const dateRange = ref<[DateModelType, DateModelType]>(['','']);
// eslint-disable-next-line no-undef
const queryParams = reactive<NoticeQuery>({
  pageNum: 1,
  pageSize: 20,
  noticeTitle: '',
  createByName: '',
  status: '',
  noticeType: '',
  orderByColumn: 'createTime',
  isAsc: 'descending'
});
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
/** Query job list */
const getList = async () => {
  loading.value = true;
  const res = await listBulletin(proxy?.addDateRange(queryParams, dateRange.value));
  bulletinList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}
/** Search button action */
const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}
/** Reset button action */
const resetQuery = () => {
  queryParams.pageNum = 1;
  dateRange.value = ['',''];
  handleQuery();
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
});
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.bulletin-container {
  padding: 24px 24px 0 21px;
  display: flex;
  flex-direction: column;
}
.bulletin-item {
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
  .bulletin-border {
    display: flex;
    flex-direction: column;
    margin-top: 7px;
    margin-right: 20px;
    .bulletin-mark {
      position: relative;
      width: 14px;
      height: 14px;
      background: $blue-100;
      border-radius: 50%;
      margin-right: 1px;
      display: flex;
      justify-content: center;
      align-items: center;
      .core {
        width: 8px;
        height: 8px;
        background-color: $blue-500;
        border-radius: 50%;
      }
    }
    .bulletin-dashed {
      background-image: linear-gradient(to bottom, $gray-400 50%, rgba(255, 255, 255, 0) 0%);
      background-position: left;
      background-size: 1px 8px;
      background-repeat: repeat-y;
      width: 1px;
      margin-left: 6.5px;
      flex: 1;
    }
  }
  .bulletin-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
    .bulletin-title {
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: 12px;
      .bulletin-date {
        display: flex;
        border-radius: 50px;
        background: $blue-50;
        padding: 4px 12px;
        justify-content: center;
        align-items: center;
        color: $blue-500;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        .svg-icon {
          margin-right: 8px;
          filter: brightness(0) saturate(100%) invert(100%) invert(42%) sepia(99%) saturate(1727%) hue-rotate(194deg) brightness(102%) contrast(96%);
          width: 16px;
          height: 16px;
        }
      }
      .bulletin-text {
        color: $gray-900;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    }
  }
}
</style>
