<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <div class="main-container" style="margin-left: 50px;margin-top: 0;">
        <div class="d-flex mt-2">
          <h3 class="divider">{{ $t('homepage.topNav.film') }}</h3>
          <el-tabs class="mx-4 mb-3 mt-1" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="$t('homepage.film.showtime')" name="1"><Showtime></Showtime></el-tab-pane>
            <el-tab-pane :label="$t('homepage.film.comingSoon')" name="2"><ComingSoon></ComingSoon></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup name="CategoryMovie" lang="ts">
import { getNowplayingmovies, getUpcommingmovies } from '@/api/homepage';
import Showtime from "@/layout/components/movie/showtime.vue";
import ComingSoon from "@/layout/components/movie/comingsoon.vue";
import { MovieVO } from '@/api/portCustomer/movieManagement/types';
const activeName = ref('1')
const nowPlayingMovies = ref<MovieVO[]>([]);
const upcomingMovies = ref<MovieVO[]>([]);
const handleClick = (tab: any, event : Event) => {
    console.log(tab, event)
}
const getNowplayingmovieList = async () => {
  const res = await getNowplayingmovies();
  nowPlayingMovies.value = res.rows;
}
const getUpcommingmovieList = async () => {
  const res = await getUpcommingmovies();
  upcomingMovies.value = res.rows;
}
// onMounted(() => {
//   getNowplayingmovieList();
//   getUpcommingmovieList();
// });
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";

.divider {
    display: flex;
    align-items: center;
    height: 24px;
    margin: 10px;
    border-left: 5px solid #034ea2;
}
</style>
