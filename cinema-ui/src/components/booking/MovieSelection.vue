<template>
  <div class="main-container">
    <div class="expansion-panels">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel value="MovieCarousel">
          <v-expansion-panel-title>Chọn phim</v-expansion-panel-title>
          <v-expansion-panel-text>
            <div>
              <MovieCarousel @selectMovie="handleSelectMovie" @panel-toggle="togglePanelMovie"></MovieCarousel>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="Showtime">
          <v-expansion-panel-title>Chọn suất</v-expansion-panel-title>
          <v-expansion-panel-text>
              <Showtime v-if="selectedMovie" :currentDate = "currentDate" :showtimeInfo = "showtimeInfo" @selectShowtime="handleSelectShowtime" @panel-toggle="togglePanelShowtime"></Showtime>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="card-container">
      <CardDetails :selectedMovie="selectedMovie" :selectedShowtime="selectedShowtime"></CardDetails>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref} from 'vue';
import MovieCarousel from '@/components/ExpansionPanels/MovieCarousel.vue';
import Showtime from '@/components/ExpansionPanels/ShowTime.vue';
import CardDetails from '@/components/ExpansionPanels/CardDetails.vue';
import { saveToLocalStorage, removeFromLocalStorage } from '@/utils/localStorage';
import { useRoute } from 'vue-router';
import { getShowtimeInfos } from '../../api/homepage/index';
import { getFromLocalStorage } from '@/utils/localStorage';

interface Movie {
    id: number;
    title: string;
    rated: string;
    genre: string;
    posterUrl: string;
}

const route = useRoute();

const panel=ref<string[]>([]);

interface ShowtimeInfo {
  uniqueId: string;
  id: number;
  cinemaName: string;
  cinemaAddress: string;
  startTime: string;
  endTime: string;
}

const selectedMovie = ref<Movie | null>();

const selectedShowtime = ref<ShowtimeInfo | null>(null);

const currentDate = ref<Date>(new Date());

const showtimeInfo = ref<ShowtimeInfo[] | null>([]);

const handleSelectMovie = (movie: Movie) => {
  selectedMovie.value = movie;
  selectedShowtime.value = null;
  saveToLocalStorage('selectedMovie', movie);
  removeFromLocalStorage('selectedShowtime');
  currentDate.value = new Date();
  getShowtimeInfoList(selectedMovie.value);
};

const getShowtimeInfoList = async (selectedMovie : Movie) => {
  const res = await getShowtimeInfos(selectedMovie?.id);
  showtimeInfo.value = res;
}

const togglePanelMovie = () => {
  panel.value = ['Showtime'];
}

const handleSelectShowtime = (showtime: ShowtimeInfo) => {
  selectedShowtime.value = showtime;
  saveToLocalStorage('selectedShowtime', showtime);
};

const togglePanelShowtime = () => {
  panel.value = [''];
}

onMounted(() => {
    if (route.query.id) {
      selectedMovie.value = {
        id: Number(route.query.id) as number,
        title: route.query.title as string,
        rated: route.query.rated as string,
        genre: route.query.genre as string,
        posterUrl: route.query.posterUrl as string,
      };
      saveToLocalStorage('selectedMovie', selectedMovie.value);
      currentDate.value = new Date();
      getShowtimeInfoList(selectedMovie.value);
      panel.value = ['ShowTime'];
    }
  }
);
</script>

<style lang="scss" scoped>
.main-container {
  position: relative;
  display:flex;
}
.expansion-panels {
  flex:1;
}
.v-expansion-panel {
  margin-bottom:20px;
}
.v-expansion-panel-title {
  font-size: 19px;
  font-weight: 700;
  min-height: 53px;
}
.text-wrapper {
    display: flex;
    gap: 0.5rem;
}
.position-btn:hover {
  background-color: #5073af;
  color: #fff;
}
.vertical-divider {
 width: 1px;
 background-color: #181818;
 margin: 0 10px;
}
.bold-font {
 font-weight:700 ;
 font-size: 1rem;
}
.card-container {
  flex: 1;
  max-width: 400px;
  padding-left:1rem;
  display:flex-column;
  justify-content: start;
}
</style>
