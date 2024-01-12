<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <div class="main-container">
        <div class="page-title">
          <h1>{{ $t('homepage.topNav.filmLabel') }}</h1>
        </div>
        <div class="film-content">
          <div class="thumbnail">
            <img :src="route.query.posterUrl" />
          </div>
          <div class="product-shop">
            <div class="product-name">
              <span class="h1">{{ route.query.title }}</span>
            </div>
            <div class="movie-info">
              <label>Đạo diễn: </label>
              <div>&nbsp;{{ route.query.director }}</div>
            </div>
            <div class="movie-info">
              <label>Diễn viên: </label>
              <div>&nbsp;{{ route.query.actor }}</div>
            </div>
            <div class="movie-info">
              <label>Thể loại: </label>
              <div>&nbsp;{{ route.query.genre }}</div>
            </div>
            <div class="movie-info">
              <label>Khởi chiếu: </label>
              <div>&nbsp;{{ formatDate(route.query.releaseDate) }}</div>
            </div>
            <div class="movie-info">
              <label>Thời lượng: </label>
              <div>&nbsp;{{ route.query.duration }}&nbsp;phút</div>
            </div>
            <div class="movie-info">
              <label>Ngôn ngữ: </label>
              <div>&nbsp;{{ route.query.language }}</div>
            </div>
            <div class="movie-info">
              <label>Rated: </label>
              <div>&nbsp;{{ route.query.rated }}</div>
            </div>
            <div class="movie-technology-icons">
              <span class="movie-rating-detail t18">Rated : T18</span>
              <button type="button" title="Mua vé" class="button btn-booking" onclick="Quickbooking('23020300');">
                <span>Mua vé</span>
              </button>
            </div>
          </div>
        </div>
        <div class="brief">
          <span>
            {{ route.query.movieDescription }}
          </span>
        </div>
        <div style="margin-top: 30px ;">
          <h4 class="divider px-2">Lịch Chiếu</h4>
          <el-divider style="width:840px"></el-divider>
          <ShowTime :currentDate="currentDate" :showtimeInfo="showtimeInfo" @selectShowtime="handleSelectShowtime"></ShowTime>
        </div>
      </div>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup name="MovieDetail" lang="ts">
import router from "@/router";
import { useRoute } from "vue-router";
import { getShowtimeInfos } from "@/api/homepage";
import { saveToLocalStorage } from "@/utils/localStorage";
import ShowTime from "@/components/ExpansionPanels/ShowTime.vue";

interface Movie {
    id: number;
    title: string;
    rated: string;
    genre: string;
    posterUrl: string;
}

interface ShowtimeInfo {
  uniqueId: string;
  id: number;
  cinemaName: string;
  cinemaAddress: string;
  startTime: string;
  endTime: string;
}

const route = useRoute();

const selectedMovie = ref<Movie | null>();

const showtimeInfo = ref<ShowtimeInfo[] | null>([]);

const currentDate = ref<Date>(new Date());

const getShowtimeInfoList = async (movieId : string | number) => {
  const res = await getShowtimeInfos(movieId);
  showtimeInfo.value = res;
}

const handleSelectShowtime = (showtime: ShowtimeInfo) => {
  saveToLocalStorage('selectedShowtime', showtime);
  router.push({path:'/booking/seatSelection'});
};

const formatDate = (startTime: string) => {
  const timeString = startTime.split(' ')[0];

  const [year, month, day] = timeString.split('-');

  return `${day}/${month}/${year}`;
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
      console.log(selectedMovie.value);
      saveToLocalStorage('selectedMovie', selectedMovie.value);
      getShowtimeInfoList(selectedMovie.value.id);
    }
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";

.main-container {
  position: relative;
  top: -50px;
  display: flex;
  flex-direction: column;
  .search-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .search-detail-container {
      max-width: 652px;
      // min-height: 366px;
      display: flex;
      padding: 40px 0px;
      flex-direction: column;
      align-items: center;
      border-left: 4px solid $blue-500;
      background: $gray-100;
      flex: 1;
      .search-detail-title {
        color: $gray-800;
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 32px;
        margin-bottom: 8px;
      }
      .search-form {
        // height: 124px;
        width: 100%;
        padding: 0 90px;
      }
      .search-detail-button {
        display: flex;
        width: 100%;
        padding: 0 90px;
        justify-content: end;
        align-items: end;
      }
    }
  }
  @media (max-width:970px) {
  .search-row {
    flex-direction: column;
    .search-detail-container {
      width: 100%;
    }
  }
}
}

.table-container {
  padding: 0px  120px 100px 120px;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: visible;
  .title-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
    .title {
      color: $gray-800;
      text-align: center;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 32px;
      margin: 0px 24px 0px 24px
    }
    .line {
      height: 1px;
      flex:1;
      background-color: $gray-200;
    }
  }
  .datagrid-body {
    overflow: visible;
    border: 1px solid $gray-200;
    background: $gray-0;
    margin-top: 16px;
    width: 100%;
  }
  .paging-footer {
    width: 100%;
    height: 48px;
    padding: 8px 24px;
    border: 1px solid $gray-200;
    background: $gray-0;
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-content: space-between;
    align-items: center;
    overflow-y: hidden;
    overflow-x: auto;
    .right-footer {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
  }
}
.page-title {
  border-bottom: 2px solid #222;
  margin-bottom: 20px;
  width: 900px;
}

.thumbnail img{
  height: 259px;
  width: 181px;
  margin-right: 30px;
}

.film-content {
  display: flex;
  width: 900px;
}

.product-shop {
  display: flex;
  flex-direction: column;
}

.movie-info {
  display: flex;
  font-size: 14px;
  line-height: 22px;
}

.product-name {
  border-bottom: 1px solid #d9d6c8;
  margin-bottom: 10px;
  padding-bottom: 15px;
  span.h1 {
    color: #1a1919;
    font-weight: normal;
    font-size: 24px;
  }
}

.movie-technology-icons {
  margin-top: 7px;
}

.movie-rating-detail {
    float: left;
    font-size: 0px;
    display: block;
    height: 30px;
    width: 45px;
    background-position: -330px 0px;
    background-image: url('	https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/rating-sprite.png');
}

.btn-booking {
  margin-left: 10px;
  padding: 5px;
  background: none no-repeat scroll 0 0 #e71a0f;
  border-radius: 5px;
  border: unset;
}

.btn-booking > span {
  color:white;
  border: 1px solid #f07469;
  font-weight: bold;
  padding: 5px;
  padding-left: 25px;
  background: url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cate-booking.png') no-repeat scroll left center rgba(0, 0, 0, 0);
  border-radius: 5px;
}

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
  border-left: 5px solid #034ea2;
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
