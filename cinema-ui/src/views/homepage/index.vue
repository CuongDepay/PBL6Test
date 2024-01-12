<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <div :class="{ hasTagsView: true, sidebarHide: true }" class="main-container">
        <div @scroll="onScroll" id="loginBody">
          <div class="login-container" id="showtime">
            <el-carousel height="447px" direction="horizontal" :autoplay="true" trigger="click">
              <el-carousel-item v-for="slide in slideList" :key="slide.id">
                <img class="login-background" :src="slide.slideUrl" alt="Slide Image" />
              </el-carousel-item>
            </el-carousel>
          </div>

          <div class="document-container" id="film">
            <div class="document-title">{{ $t('homepage.film.guideTt') }}</div>
            <div class="document-items">
              <Carousel v-bind="{itemsToShow: 4, snapAlign: 'center'}">
                <Slide v-for="movie in movieList" :key="movie.id">
                  <div class="document-item">
                    <img class="document-image1" :src="movie.posterUrl" />
                    <div class="play-button" @click="playYoutube(movie.trailerUrl)">
                      <div class="feature_film_content">
                        <h3>{{ movie.title }}</h3>
                        <div class="film-content-action">
                          <a title="Xem chi tiết" class="btn btn-primary btn-sm" @click.stop="goToMovieDetail(movie)">Xem chi tiết</a>
                          <button type="button" title="Mua vé" class="btn btn-sm btn-booking" @click.stop="gotoBooking(movie)">
                            <span>Mua vé</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slide>
                <template #addons>
                  <Navigation />
                </template>
              </Carousel>
            </div>
          </div>
          <IrDialog :dialog="dialog">
            <template v-slot:body>
              <YouTube :src="youtubeSrc" ref="youtube" width="100%" height="100%" style="height: calc(90vh - 111px)" @ready="onReady" />
            </template>
          </IrDialog>
          <div class="document-container" id="promotion">
            <div class="document-title">{{ $t('homepage.document.guideTt') }}</div>
            <div class="document-items">
              <Carousel v-bind="{itemsToShow: 4, snapAlign: 'center'}">
                <Slide v-for="promotion in promotionList" :key="promotion.id">
                  <div class="document-item">
                    <img class="document-image2" :src="promotion.imageUrl" />
                    <a class="document-text" :href="promotion.title" target="_blank">
                      {{ promotion.title }}
                      <br />
                      {{ promotion.promotionDescription }}
                    </a>
                    <div class="document-date">
                      <svg-icon icon-class="calendar" />
                      <span>{{ parseTime(promotion.fromDate, '{d}/{m}/{y}') }}</span>
                    </div>
                  </div>
                </Slide>
                <template #addons>
                  <Navigation />
                </template>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup lang="ts">
import { getDocuments } from '@/api/homepage';
import IrButton from '@/components/IrButton/index.vue';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import YouTube from 'vue3-youtube';
import { CustomerNavbar } from '../../layout/components'
import { getCodeImg, getTenantList } from '@/api/login';
import Cookies from 'js-cookie';
import { encrypt, decrypt } from '@/utils/jsencrypt';
import { useUserStore } from '@/store/modules/user';
import { LoginData, TenantVO } from '@/api/types';
import { FormRules } from 'element-plus';
import { to } from 'await-to-js';
import i18n from '@/lang';
import { DocumentVO } from '@/api/system/document/types';
import { removeAllFromLocalStorage } from '@/utils/localStorage';

const activeIndex = ref('login');
const activeLogin = ref('');
const navItems = ref(['login', 'search', 'present', 'guideline', 'document', 'contact']);
const customerNavbarRef = ref(CustomerNavbar);
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const youtube = ref();
const youtubeSrc = ref('');
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '80%',
  fullscreen: false,
  footer: false
});
const promotionList = ref<any[]>(
  [{ title: 'Ngày hội khuyến mãi ưu đãi thành viên', promotionDescription: 'Diễn ra duy nhất ngày 11/11', fromDate: '01/11/2023', imageUrl: 'https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/4/240x201-uu.jpg'},
  { title: 'Ngày thứ tư vui vẻ', promotionDescription: 'Diễn ra hàng tuần', fromDate: '01/11/2023', imageUrl: 'https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/0/2023_happy_wed_75k_000_240x201.png'},
  { title: 'Sinh nhật Star Cinema', promotionDescription: 'Diễn ra hàng năm vào ngày 09/11', fromDate: '01/11/2023', imageUrl: 'https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/b/i/birthday_popcorn_box_240x201.png'},
  { title: 'Nâng cấp dịch vụ phòng chiếu', promotionDescription: 'Sự kiện hot', fromDate: '01/11/2023', imageUrl: 'https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/u/2/u22-102023-240x201.jpg'}]);

const movieList = ref<any[]>(
  [{ trailerUrl: 'https://www.youtube.com/watch?v=cwLAor_smGw&ab_channel=CGVCinemasVietnam', title: 'Người Vợ Cuối Cùng', movieDescription: 'Hoa', posterUrl: 'https://ocwckgy6c1obj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/7/0/700x1000_13_1_.jpg'},
  { trailerUrl: 'https://www.youtube.com/watch?v=cwLAor_smGw&ab_channel=CGVCinemasVietnam', title: 'Năm Đêm Kinh Hoàng', movieDescription: 'Hoa', posterUrl: 'https://ocwckgy6c1obj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/7/0/700x1000-5demkinhhoang.jpg'},
  { trailerUrl: 'https://www.youtube.com/watch?v=cwLAor_smGw&ab_channel=CGVCinemasVietnam', title: 'Đất Rừng Phương Nam', movieDescription: 'Hoa', posterUrl: 'https://ocwckgy6c1obj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/7/0/700x1000_19_.jpg'},
  { trailerUrl: 'https://www.youtube.com/watch?v=cwLAor_smGw&ab_channel=CGVCinemasVietnam', title: 'Âm Hồn Đô Thị', movieDescription: 'Hoa', posterUrl: 'https://ocwckgy6c1obj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/t/o/toh_now-showing_size-poster_1_.jpg'}]);
const slideList = ref<any[]>();
const videoList = ref<DocumentVO[]>([]);
const documentList = ref<DocumentVO[]>([]);

const edoSearchForm = ref({
  containerNo: '',
  blNo: ''
});
const eirSearchForm = ref({
  containerNo: '',
  truckNo: '',
  date: ''
});
const containerSearchForm = ref({
  containerNo: ''
});
const vesselScheduleSearchForm = ref({
  fromDate: '',
  toDate: ''
});

const loginForm = ref<LoginData>({
  tenantId: "000000",
  username: '',
  password: '',
  rememberMe: false,
  code: '',
  uuid: ''
});
const loginRules: FormRules = {
  tenantId: [{ required: true, trigger: "blur", message: "Please enter your tenant number" }],
  username: [{ required: true, trigger: 'blur', message: i18n.global.t('homepage.login.rules.usernameRqMsg') }],
  password: [{ required: true, trigger: 'blur', message: i18n.global.t('homepage.login.rules.passwordRqMsg') }],
  code: [{ required: true, trigger: 'change', message: 'Please enter verification code' }]
};

const codeUrl = ref('customer');
const loading = ref(false);
// Captcha switch
const captchaEnabled = ref(true);
// tenant switch
const tenantEnabled = ref(true);
// registration switch
const register = ref(false);
const redirect = ref(undefined);
const loginRef = ref(ElForm);
// tenant list
const tenantList = ref<TenantVO[]>([]);
  interface Movie {
    id: number;
    title: string;
    rated: string;
    genre: string;
    posterUrl: string;
}
const selectedMovie = ref<Movie | null>();

const handleLogin = () => {
  loginRef.value.validate(async (valid:boolean, fields: any) => {
    if (valid) {
      loading.value = true;
      // Checked the need to remember the password setting to set the remember username and password in the cookie
      if (loginForm.value.rememberMe) {
        Cookies.set("tenantId", loginForm.value.tenantId, { expires: 30 });
        Cookies.set('username', loginForm.value.username, { expires: 30 });
        Cookies.set('password', String(encrypt(loginForm.value.password)), { expires: 30 });
        Cookies.set('rememberMe', String(loginForm.value.rememberMe), { expires: 30 });
      } else {
        // otherwise remove
        Cookies.remove("tenantId");
        Cookies.remove('username');
        Cookies.remove('password');
        Cookies.remove('rememberMe');
      }
      // Call the login method of action
      // prittier-ignore
      const [err] = await to(userStore.login(loginForm.value));
      if (!err) {
        await router.push({ path: redirect.value || '/' });
      } else {
        loading.value = false;
        // Get verification code again
        if (captchaEnabled.value) {
            await getCode();
        }
      }
    } else {
      console.log('error submit!', fields);
    }
  });
};

/**
 * get verification code
 */
const getCode = async () => {
  const res = await getCodeImg();
  const { data } = res;
  captchaEnabled.value = data.captchaEnabled === undefined ? true : data.captchaEnabled;
  if (captchaEnabled.value) {
    codeUrl.value = 'data:image/gif;base64,' + data.img;
    loginForm.value.uuid = data.uuid;
  }
};

const getCookie = () => {
  const tenantId = Cookies.get("tenantId");
  const username = Cookies.get('username');
  const password = Cookies.get('password');
  const rememberMe = Cookies.get('rememberMe');
  loginForm.value = {
    tenantId: tenantId === undefined ? loginForm.value.tenantId : tenantId,
    username: username === undefined ? loginForm.value.username : username,
    password: password === undefined ? loginForm.value.password : (decrypt(password) as string),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
  };
}

/**
 * Get a list of tenants
 */
const initTenantList = async () => {
  const { data } = await getTenantList();
  tenantEnabled.value = data.tenantEnabled === undefined ? true : data.tenantEnabled;
  if (tenantEnabled.value) {
    tenantList.value = data.voList;
    if (tenantList.value != null && tenantList.value.length !== 0) {
      loginForm.value.tenantId = tenantList.value[0].tenantId;
    }
  }
}

const handleNavigateLogin = (key: string) => {
  localStorage.setItem('system-type', key);
  activeLogin.value = key;
}

const getDocumentList = async () => {
  const res = await getDocuments();
  promotionList.value = res.data.promotions;
  movieList.value = res.data.movies;
  slideList.value = res.data.slides;
  videoList.value = res.data.videos;
  documentList.value = res.data.documents;
}

onMounted(() => {
  getCode();
  initTenantList();
  getCookie();
  getDocumentList();
  const systemType = localStorage.getItem('system-type');
  if (systemType) {
    activeLogin.value = systemType;
  } else {
    localStorage.setItem('system-type', 'customer');
    activeLogin.value = 'customer';
  }
  const activeParams = route.query && route.query.active as string;
  if (activeParams) {
    nextTick(() => {
      activeIndex.value = activeParams;
      nextTick(() => {
        handleNavigate(activeParams);
      });
    });
  }
});

const handleNavigate = (key: string) => {
  document.getElementById(key)?.scrollIntoView({behavior: 'smooth' });
}

const onScroll = () => {
  const scrollOffset = document.getElementById('loginBody')?.scrollTop;
  const scrollHeight = document.getElementById('loginBody')?.scrollHeight;
  const clientHeight = document.getElementById('loginBody')?.clientHeight;
  if (scrollOffset && scrollHeight && clientHeight && Math.abs(scrollHeight - scrollOffset - clientHeight) < 1) {
    activeIndex.value = navItems.value[navItems.value.length - 1];
    return;
  }
  if (0 === scrollOffset) {
    activeIndex.value = navItems.value[0];
    return;
  }
  for (let i = 1; i < navItems.value.length; i++) {
    const itemOffset = document.getElementById(navItems.value[i])?.offsetTop;
    const itemHeight = document.getElementById(navItems.value[i])?.clientHeight;
    if (scrollOffset && itemOffset && itemHeight) {
      const offset = scrollOffset - itemOffset + itemHeight;
      if (offset >= itemHeight && offset <= (itemHeight * 2)) {
        activeIndex.value = navItems.value[i];
        break;
      }
    }
  }
}
/** Play youtube popup */
const playYoutube = (url: string) => {
  youtubeSrc.value = url;
  dialog.visible = true;
}
const onReady = () => {
  youtube.value.playVideo();
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

const gotoBooking = async(movie: any):Promise<void> => {
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
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.fixed-main-header{
  position: fixed;
  top: 0;
  width: 100%;
  height: $base-header-height;
  z-index: 9;
  background-color: #FFDAB9;
}

.fixed-header {
  position: fixed;
  top: $base-header-height;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$base-sidebar-width});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 60px);
}

.sidebarHide .fixed-header {
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}

.nav-header {
  height: 60px;
  padding: 0 191px;
  background-color: #fcfcfc;
  border-bottom: 1px solid #3b76ff;

  .el-menu-item {
    display: flex;
    height: 60px;
    padding: 20px 24px 16px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: $gray-700 !important;
    font-size: 16px;
    border-bottom: none !important;
    height: 59px;

    &:hover {
      background: $gray-0;
      color: $gray-700 !important;
      border-top: 4px solid #e9edf1;
    }

    &.is-active {
      border-top: 4px solid #e9edf1;
      color: $gray-700 !important;
      background: #e9edf1;
      font-size: 16px;
    }
  }
}
.login-background {
  min-width: 100%;
  height: 447px;
}
.login-body {
  /* 84 = navbar + tags-view = 50 + 34 */
  max-height: calc(100vh - $base-header-height);
  top: calc($base-header-height);
  overflow: auto;
  position: fixed;
  width: 100%;
  background-color: #fff;

  &::-webkit-scrollbar-track-piece {
    background: $gray-0;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: $gray-400;
    border-radius: 100px;

    &:hover {
      background: $gray-500;
    }

    &:active {
      background: $gray-600;
    }
  }

  .login-container {
    margin: -35px auto 60px auto;
    height: 447px;
    width: 84%;
  }
  .search-container {
    margin-top: 80px;
    padding: 0 60px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    .search-row {
      display: flex;
      flex-direction: row;
      gap: 24px;
      justify-content: center;
      align-items: center;
      .search-detail-container {
        max-width: 652px;
        // min-height: 366px;
        display: flex;
        padding: 40px 0px;
        flex-direction: column;
        align-items: center;
        gap: 24px;
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
  .present-container {
    margin: 98px 0 40px 0;
    padding: 0 60px;
    .title {
      color: $gray-800;
      font-size: 40px;
      font-weight: 600;
      line-height: 40px;
    }

    .module-content {
      display: flex;
      flex-direction: row;
      min-height: 438px;
      align-items: center;
      gap: 24px;
      justify-content: center;
      .module-content-detail-container {
        width: 425px;
        height: 438px;
        position: relative;
        .background {
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0.6499999761581421;
        }
        .content {
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(180deg, rgba(17, 19, 34, 0.00) 0%, #111322 100%);
          padding: 280px 24px 24px 24px;
          .present-content-title {
            color: $gray-0;
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            line-height: 24px;
            height: 24px;
            margin-bottom: 8px;
          }
          .present-content-description {
            color: $gray-0;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            margin-bottom: 24px;
            height: 38px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .present-content-btn {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .module-content-detail-img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    @media (max-width:1080px) {
      .module-content {
        flex-direction: column;
      }
    }
    .feature-content {
      display: flex;
      flex-direction: row;
      gap: 149.8px;
      justify-content: center;
      .feature-content-container {
        height: 131px;
        display: flex;
        flex-direction: column;
        gap: 32px;
        justify-content: center;
        align-items: center;
        .feature-content-img {
          width: 72px;
          height: 80px;
          padding: 10px 6px;
          border-bottom: 2px solid $gray-200;
        }
        .feature-content-text {
          color: $gray-700;
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
      }
    }
  }
  .document-container {
    display: flex;
    flex-direction: column;
    gap: 40px;
    justify-content: center;
    align-items: center;
    padding: 0 60px;

    .document-title {
      color: $gray-800;
      font-size: 40px;
      font-style: normal;
      font-weight: 600;
      line-height: 40px;
    }
    .document-items {
      max-width: 980px;
      .carousel {
        height: 441px;
        .carousel__viewport {
          height: 343;
          .carousel__track {
            margin: 0 !important;
          }
        }
      }
      .document-item {
        display: flex;
        flex-direction: column;
        width: 240px;
        height: 344px;
        text-align: left;
        align-items: flex-start;
        .play-button {
          font-family: Verdana, Arial, sans-serif;
          opacity:0;
          position:absolute;
          top:0px;
          height: 344px;
          width: 240px;
          background-image: url('	https://www.cgv.vn/skin/frontend/cgv/default/images/bg-transparent-grey.png');
          background-position: center;
          background-size: cover;
          &:hover {
            opacity:1;
            cursor: pointer;
          }
          .feature_film_content {
            opacity:1;
            color:#000;
            font-size: 16px;
            text-align: center;
            position:relative;
            background-color: #e6dcdc;
            top: 264px;
            height: 80px;
            width: 240px;
            h3 {
              font-size: 15px;
              font-weight: 600;
              padding-top: 12px;
            }

            .film-content-action{
              display: flex;
              justify-content: space-around;
            }
            a.button {
              padding: 4px 8px;
              border-radius: 5px;
              // font-weight: bold;
              background: #e71a0f;
            }
          }
        }
        .document-image1 {
          width: 240px;
          height: 344px;
          margin-bottom: 16px;
          cursor: pointer;
        }
        .document-image2 {
          width: 240px;
          margin-bottom: 16px;
          cursor: pointer;
        }
        .video-play-icon {
          width: 73.33px;
          height: 73.33px;
          position: fixed;
          top: 102px;
          margin-left: 120px;
          cursor: pointer;
          &:hover {
            width: 75.33px;
            height: 75.33px;
            top: 101px;
            margin-left: 119px;
          }
        }
        .document-text {
          color: $gray-800;
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
          text-decoration: none;
          height: 77px;
          display: flex;
          text-align: left;
          align-items: flex-start;
          max-width: 240px;
          flex-direction: column;
          justify-content: space-around;
          &:hover {
            color: $blue-500;
          }
        }
        .document-date {
          margin-top: 12px;
          color: $gray-600;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;

          svg {
            filter: brightness(0) saturate(100%) invert(57%) sepia(33%) saturate(7495%) hue-rotate(192deg) brightness(100%) contrast(96%);
            width: 16px;
            height: 16px;
            margin-right: 12px;
          }
        }
      }
    }
    .document-download-items {
      max-width: 1320px;
      .carousel {
        height: 376px;
        .carousel__viewport {
          height: 336px;
          .carousel__track {
            margin: 0 !important;
          }
        }
      }
      .document-download-item {
        display: flex;
        flex-direction: column;
        width: 240px;
        height: 336px;
        text-align: left;
        align-items: center;
        .background-image {
          height: 196px;
          width: 265px;
        }
        .document-image {
          position: fixed;
          top: 66px;
          margin-right: 112px;
        }
        .document-content {
          display: flex;
          padding: 16px;
          flex-direction: column;
          align-items: center;
          height: 140px;
          width: 240px;
          border-radius: 8px;
          background: $blue-900;
          .target-name {
            color: $yellow-400;
            text-align: center;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
          .title {
            color: $gray-0;
            text-align: center;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            height: 38px;
            margin-bottom: 16px;
          }
        }
      }
    }
  }
  @media (max-width:1300px) {
  }
}

.title {
  color: $gray-0;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  margin: 0 0 40px 0;
  text-align: center;
}

.nav-login {
  height: 42px;
  margin-bottom: 56px;
  background: unset !important;
  border-bottom: none;
  width: 100%;

  li.el-menu-item {
    padding: 8px 16px 10px 16px;
    gap: 12px;
    background: unset !important;
    flex: 1;
    svg {
      width: 24px;
      height: 24px;
      filter: brightness(0) saturate(100%) invert(95%) sepia(8%) saturate(136%) hue-rotate(174deg) brightness(89%) contrast(93%);
    }

    span {
      color: $gray-300 !important;
      font-size: 17px;
      font-weight: 600;
      line-height: 24px;
    }

    &.is-active {
      border-bottom: 2.5px solid $blue-500;

      svg {
        filter: brightness(0) saturate(100%) invert(66%) sepia(56%) saturate(7018%) hue-rotate(194deg) brightness(102%) contrast(96%);
      }

      span {
        color: $gray-0 !important;
      }
    }

    &:hover {
      border-bottom: 2.5px solid $blue-500;
    }
  }
}

.login-form-customer {
  height: 600px;
  width: 526px;
  position: absolute;
  right: 0;
  top: 0;
  background: rgba(17, 25, 39, .8);
  padding: 52px 60px 56px 60px;
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Roboto;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 40px;
  padding-left: 12px;
}

.login-form-customer .el-checkbox .el-checkbox__label  {
  color: $gray-0 !important;
}

.remember-pass-text {
  color: $gray-0;
}

.btn-booking {
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
</style>
