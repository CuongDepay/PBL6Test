<template>
  <div class="mt-4">
    <div class="input-group d-flex align-items-center mt-3 mb-1 w-80 row text-capitalize">
      <div class="col-sm-6 justify-content-center d-flex" style="width: 500px">
        <el-radio-group v-model="activeName" size="small">
          <el-radio-button v-for="tab in tabs" :key="tab.id" class="btn-showtime mx-4" :label="tab.id">
            <div style="white-space: pre-line;width: 80px;height: 34px; font-size: 16px; font-weight: 400;line-height: 20px;">
              {{ tab.label }}
            </div>
          </el-radio-button>
        </el-radio-group>
      </div>

      <div class="col-sm-4 d-flex" style="width: 350px;">
        <select class="form-select  rounded d-flex flex-end ms-2 fs-sm text-center" id="inputGroupSelect01" v-model="selectedCinema">
          <option selected>Tất cả rạp</option>
          <option v-for="(cinema) in props.showtimeInfo" :key="cinema.id" :value="cinema.cinema.cinemaName">{{cinema.cinema.cinemaName}}</option>
        </select>
      </div>
    </div>
    <el-divider style="width:840px;height: 4px;background-color: #034ea2;"></el-divider>
    <ul v-for="cinema in selectedCinemas" :key="cinema.id" class="list-group container d-flex flex-start m-3" style="width: 720px; margin-left: 0;">
      <li class="list-group-item row d-flex my-2">
        <div class="col col-sm-3">
          <h6>{{ cinema.cinema.cinemaName }}</h6>
          <span>{{ cinema.cinema.cinemaAddress }}</span>
        </div>
        <div class="col col-sm-9 row">
          <el-card
            v-for="item in cinema.showtimeList"
            :key="item.uniqueId"
            class="col-2 mx-2 my-1 btn btn-primary "
            @click="handleSelectShowtime(item)"
            >{{ cinemaHours(item.startTime) }}</el-card
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue';

interface Showtime {
  id: number;
  hallId : number;
  startTime: string;
  endTime: string;
}

interface ShowtimeInfo {
  showtimeList: Showtime[];
  cinema: {
    cinemaName: string;
    cinemaAddress: string;
  }
  id: number;
}

interface Tab {
  id: number;
  label: string;
}

const activeName = ref(0);

interface Movie {
    id: number;
    title: string;
    rated: string;
    genre: string;
    posterUrl: string;
}

const props = defineProps({
  selectedMovie: {
    type: Object as PropType<Movie | null>,
    default:null
  },
  currentDate: {
    type: Date,
    required: true
  },
  showtimeInfo: {
    type: Array as PropType<ShowtimeInfo[]>,
    default: () => null
  }
});

const tabs= ref<Tab[]>([]);

const createTabs = (date: Date) => {
  const newTabs : Tab[] = [];
  for (let i = 0; i < 4; i++) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + i);
    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();
    newTabs.push({
      id : i,
      label : `${day}/${month}/${year}`,
    });
  }
  tabs.value = newTabs;
};

watchEffect(() => {
  createTabs(props.currentDate);
});

const cinemaHours = (startTime: string) => {
  const timeString = startTime.split(' ')[1];

  const [hours, minutes] = timeString.split(':');

  return `${hours}:${minutes}`;

};

const cinemaDays = (startTime: string) => {
  const timeString = startTime.split(' ')[0];

  const [day, month, year] = timeString.split('/');

  return `${day}/${month}`;

};

const selectedCinema = ref("Tất cả rạp");

const selectedCinemas = computed(() => {
  if (selectedCinema.value === "Tất cả rạp") {
      return selectedShowtimes.value;
  }
  else {
      return selectedShowtimes.value.filter(cinema => cinema.cinema.cinemaName === selectedCinema.value);
    }
  });


const selectedShowtimes = computed(() => {
  const activeTab = tabs.value.find(tab => tab.id === activeName.value);
  if (!activeTab) return [];
  const activeTabDayMonth = cinemaDays(activeTab.label);

  return props.showtimeInfo.flatMap(cinema => ({
    ...cinema,
    showtimeList: cinema.showtimeList
      .filter(showtime => cinemaDays(showtime.startTime) === activeTabDayMonth)
      .map(showtime => ({
        ...showtime,
        uniqueId: `${cinema.id}-${showtime.id}`,
        cinemaName: cinema.cinema.cinemaName,
        cinemaAddress: cinema.cinema.cinemaAddress
      }))
  })).filter(cinema => cinema.showtimeList.length > 0);
});

const emit = defineEmits(['selectShowtime','panel-toggle']);

interface CardDetailInfo {
  uniqueId: string;
  id: number;
  hallId : number | null;
  cinemaName: string | null;
  cinemaAddress: string;
  startTime: string;
  endTime: string;
}

const handleSelectShowtime = (cinema: CardDetailInfo) => {
  emit('selectShowtime', cinema);
  emit('panel-toggle');
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";
.button {
  text-transform: uppercase;
  padding: 6px 2px 6px 2px;
  font-family: Verdana, Arial, sans-serif;
  font-size: 14px;
  line-height: 19px;
  cursor: pointer;
}

.button + .button {
    margin-left: 5px;
}

.brief {
  margin-top: 10px;
  width: 900px;
}
.divider{
  display: flex ;
  align-items: center;
  height: 24px;
  margin: 10px 0;
  border-left: 5px solid #5073af;
}
.btn-showtime{
  width: 70px;
  height: 56px;
  white-space: pre-line;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn{
  height: 38px;
  width: 76px;
  align-items: center;
  display: flex;
  font-size:15px;
  justify-content: center;
}
</style>
