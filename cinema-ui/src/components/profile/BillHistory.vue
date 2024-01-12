<template>
  <div class="mt-4">
    <div class="container my-1" v-for="data in paginatedData" :key="data.id">
      <div class="card">
        <img style="height:160px;width: 120px;" class="card-img-top" :src="data.posterUrl" alt="Image" />
        <div class="card-body col col-md-6">
          <div class="d-flex justify-content-between align-items-center mt-3">
            <div class="absolute-left" style="left:110px; top:30px;width: 30%;">
              <b-card-text class="bold-font">{{ data.movieName }}</b-card-text>
              <b-card-text>{{ data.genre }}</b-card-text>
            </div>
            <div class="absolute-right p-3" style="right:-50px; top:30px">
              <b-card-text class="d-inline-block">Star Cinema -</b-card-text
              ><b-card-text class="d-inline-block bold-font">{{ data.hallName }}</b-card-text>
              <b-card-text v-html="formatDate(data.startTime)"></b-card-text>
            </div>
            <div class="absolute-left" style="left: 50rem; top: 50px;">
              <button class="accordion-button bold-font text-color" @click.prevent="openDetail(data)">Chi tiết</button>
              <BillHistoryDetail v-if="showDetail" @close="closeDetail" :bill="selectedBill" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-4">
      <button class="btn btn-primary mx-2" @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="btn btn-primary mx-2" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps,PropType } from 'vue';
import { BillHisToryVO } from '@/api/booking/types';
import BillHistoryDetail from '../Modal/BillHistoryDetail.vue';

const props = defineProps({
  billHistoryData: {
    type: Array as PropType<BillHisToryVO[]>,
    default: null
  }
})

const showDetail = ref(false);
const selectedBill = ref<BillHisToryVO | null>(null);

const openDetail = (billData: BillHisToryVO) => {
  selectedBill.value = billData;
  showDetail.value = true;
};

const closeDetail = () => {
  showDetail.value = false;
  selectedBill.value = null; // optional: clear the selectedBill when closing
};

const formatDate = (date: string) => {
  if (!date) return '';

  const timeStringDays = date.split(' ')[0];

  const timeStringHours = date.split(' ')[1];

  const [year, month, day] = timeStringDays.split('-');

  const [hours, minutes] = timeStringHours.split(':');

  return `<b>${hours}:${minutes}</b> - ${day}/${month}/${year}`;
}

const currentPage = ref(1);
const itemsPerPage = ref(3);

const totalPages = computed(() => Math.ceil(props.billHistoryData.length / itemsPerPage.value));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return props.billHistoryData.slice(start, end);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};
</script>

<style scoped>
.absolute-right {
  /* position: absolute; */
  right: 0;
  padding-right: 20rem;
}

.absolute-left {
  /* position: absolute; */
  left: 0;
}
.bold-font {
 font-weight:600 ;
 font-size: 1rem;
}
.text-color {
  color: #409EFF
}
.card{
  display: flex;
  flex-direction: row;
}
.card-img-top{
  border-top-left-radius:5px ;
  border-top-right-radius: 0;
  border-bottom-left-radius: 5px;
}
</style>
