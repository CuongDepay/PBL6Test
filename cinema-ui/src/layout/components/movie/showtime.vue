<template>
  <div class="container">
    <div class="row">
      <div v-for="movie in nowPlayingMovies" :key="movie.id" class="col-md mb-4 w-100">
        <div class="card">
          <img class="card-img-top" :src="movie.posterUrl" alt="Image" />
          <div class="votes">
            <svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 12px;" fill="#fde047" height="1em" viewBox="0 0 576 512">
              <path
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              />
            </svg>
            {{ movie.rating }}
          </div>
          <div class="card-overlay d-flex flex-column">
            <button class="overlay-button btn btn-buy my-2" @click="gotoBooking(movie)">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" style="margin-right: 4px;" fill="#fff" viewBox="0 0 576 512">
                <path
                  d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
                /></svg
              >Mua Vé
            </button>
            <button class="overlay-button btn btn-trailer" @click="playYoutube(movie.trailerUrl)">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" style="margin-right: 4px;" fill="#000">
                <path
                  d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z"
                /></svg
              >Trailer
            </button>
            <button class="overlay-button btn btn-trailer mt-2" style="background: #4682b4" @click="goToMovieDetail(movie)">
              <svg class="me-1" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                <path
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                />
              </svg>
              Chi Tiết
            </button>
          </div>
        </div>
        <h6 class="card-title mt-2 ml-3">{{ movie.title }}</h6>
      </div>
    </div>
    <IrDialog :dialog="dialog">
      <template v-slot:body>
        <YouTube :src="youtubeSrc" ref="youtube" width="100%" height="100%" style="height: calc(90vh - 111px)" @ready="onReady" />
      </template>
    </IrDialog>
  </div>
</template>

<script setup lang="ts">
import YouTube from 'vue3-youtube';
import { getNowplayingmovies } from '@/api/homepage';
import { removeAllFromLocalStorage } from '@/utils/localStorage';

const router = useRouter();
const youtube = ref();
const youtubeSrc = ref('');
const nowPlayingMovies = ref([]);
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '80%',
  fullscreen: false,
  footer: false
});
const onReady = () => {
  youtube.value.playVideo();
}
const getDocumentList = async () => {
  const res = await getNowplayingmovies();
  nowPlayingMovies.value = res;
}

const playYoutube = (url: string) => {
  youtubeSrc.value = `https://www.youtube.com/watch?v=${url}`;
  dialog.visible = true;
}
const gotoBooking = async (movie: any):Promise<void> => {
  removeAllFromLocalStorage();
    try {
        router.push({ path: '/booking/movieSelection',query: {
          id : movie.id,
          title: movie.title,
          rated: movie.rated,
          genre: movie.genre,
          posterUrl: movie.posterUrl,
        }});
      } catch (error) {
        console.error('Error:', error);
      }
    }
    /** */
const goToMovieDetail = async(movie: any):Promise<void> => {
  removeAllFromLocalStorage();
  try{
    router.push({path: '/homepage/movie-detail', query: {
      id: movie.id,
      title: movie.title,
      movieDescription: movie.movieDescription,
      director: movie.director,
      actor: movie.actor,
      rated: movie.rated,
      language: movie.language,
      duration: movie.duration,
      genre: movie.genre,
      releaseDate: movie.releaseDate,
      posterUrl: movie.posterUrl,
  }});
  } catch (error) {
      console.error('Error:', error);
    }
}
onMounted(() => {
  getDocumentList();
})
</script>

<style lang="scss" scoped>
.image-container {
    width: 240px;
    position: relative;
    height: auto;
}

.card {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    height: auto;
    width: 260px;
}

.card-img-top {
    width: 100%;
    height: 372px;
    display: block;
    transition: transform 0.3s ease-in-out;
}

.card-title{
  justify-content: flex-start;
  display: flex;
  width: 100%;
}

.card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
}

.overlay-button {
    width: 120px;
    padding: 10px 20px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}
.btn-buy{
    font-size: 16px;
    background-color: #ff5e19;
    opacity: 0.9;
    display: flex;
    align-items: center;
}
.btn-buy:hover{
    opacity: 1 ;
}
.btn-trailer{
    font-size: 16px;
    background-color: #fff;
    opacity: 0.9;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
}
.btn-trailer:hover{
    opacity: 1;
}
.card:hover {
    .card-overlay {
        opacity: 1;
    }

    .card-image {
        transform: scale(1.1);
    }
}
.votes{
    display: flex;
    padding: 2px 20px;
    align-items: center;
    flex-direction: row;
    color: #fff;
    font-weight: bold;
    content: "";
    position: absolute;
    bottom: 40px;
    right: -10px;
    background: rgba(0, 0, 0, .4);
}
.age__limit{
    position: absolute;
    display: flex;
    border-radius: 5px;
    font-weight: 600;
    color: #fff;
    padding: 2px 6px;
    bottom:5px;
    right:5px;
    min-width: 36px;
    justify-content: center;
    background-color: #f58020;
}
</style>
