<template>
  <b-card>
    <div class="d-flex flex-row" style="max-height: 600px; min-height: 100px;padding-bottom: 20px;">
      <img
        v-if="processedMovie && processedMovie.posterUrl"
        style="height:150px;width: 100px;border-radius: 0.25rem; margin-right: 12px"
        class="card-img-top"
        :src="processedMovie?.posterUrl"
        alt="Image"
      />
      <img
        v-else
        style="height:150px;width: 100px;border-radius: 0.25rem; margin-right: 12px"
        class="card-img-top"
        :src="defaulImageSvg"
        alt="Default Image"
      />
      <div>
        <b-card-text class="text-start"
          ><strong>{{ processedMovie?.title }}</strong></b-card-text
        >
        <b-card-text class="text-start">{{ processedMovie?.genre }} - {{ processedMovie?.rated }}</b-card-text>
      </div>
    </div>

    <div class="text-justify ">
      <b-card-text class="mb-2" v-html="showMovieSelection(processedShowtime?.cinemaName, processedShowtime?.hallName ) || ''"></b-card-text>
      <b-card-text v-html="showDate(processedShowtime?.startTime || '')"></b-card-text>
    </div>
    <div v-if="processedSeat && processedSeat.length > 0">
      <hr class="hr" />
      <div class="row" style="font-size: 14px;">
        <div v-if="getNumberOfSelectedNormalSeat() !== 0" class="col-sm-6 align-self-start text-start">
          <b-card-text class="mb-0"
            ><strong>{{getNumberOfSelectedNormalSeat()}}x</strong> Ghế Thường</b-card-text
          >
          <div class="d-flex flex-row">
            <b-card-text class="mb-0">Ghế:</b-card-text>
            <div v-for="item, index in processedSeat" :key="index">
              <b-card-text v-html="showNormalSeat(item, index)"></b-card-text>
            </div>
          </div>
        </div>
        <div v-if="getNumberOfSelectedNormalSeat() !== 0" class="col-sm-6 align-self-end text-end">
          <b-card-text class="bold-font">{{ seatNormalPrice }}đ</b-card-text>
        </div>
        <div v-if="getNumberOfSelectedCoupleSeat() !== 0" class="col-sm-6 align-self-start text-start mt-2">
          <b-card-text class="mb-0"
            ><strong>{{getNumberOfSelectedCoupleSeat()}}x</strong> Ghế Đôi</b-card-text
          >
          <div v-if="getNumberOfSelectedCoupleSeat() !== 0" class="d-flex flex-row">
            <b-card-text class="mb-0">Ghế:</b-card-text>
            <div v-for="item, index in processedSeat" :key="index">
              <b-card-text v-html="showCoupleSeat(item, index)"></b-card-text>
            </div>
          </div>
        </div>
        <div v-if="getNumberOfSelectedCoupleSeat() !== 0" class="col-sm-6 align-self-end text-end">
          <b-card-text class="bold-font">{{ seatCouplePrice }}đ</b-card-text>
        </div>
        <div v-if="getNumberOfSelectedVipSeat() !== 0" class="col-sm-6 align-self-start text-start mt-2">
          <b-card-text class="mb-0"
            ><strong>{{getNumberOfSelectedVipSeat()}}x</strong> Ghế Vip</b-card-text
          >
          <div class="d-flex flex-row">
            <b-card-text class="mb-0">Ghế:</b-card-text>
            <div v-for="item, index in processedSeat" :key="index">
              <b-card-text v-html="showVipSeat(item, index)"></b-card-text>
            </div>
          </div>
        </div>
        <div v-if="getNumberOfSelectedVipSeat() !== 0" class="col-sm-6 align-self-end text-end">
          <b-card-text class="bold-font">{{ seatVipPrice }}đ</b-card-text>
        </div>
      </div>
    </div>
    <div v-if="processedPromotion">
      <hr class="hr" />
      <div class="row" style="font-size: 14px;">
        <div class="col-sm-6 align-self-start text-start">
          <strong>Mã Khuyến Mãi</strong>

          <div class="d-flex">
            <b-card-text>{{ processedPromotion?.title }}</b-card-text>
          </div>
        </div>
        <div class="col-sm-6 align-self-end text-end">
          <b-card-text class="font-weight-bold">{{discountPrice}}đ</b-card-text>
        </div>
      </div>
    </div>
    <hr class="hr" />
    <div class="row">
      <div class="col-sm-6 align-self-start text-start">
        <b-card-text class="bold-font">Tổng cộng:</b-card-text>
      </div>
      <div class="col-sm-6 align-self-end text-end">
        <b-card-text class="bold-font"
          ><strong>{{ totalPrice }}đ</strong></b-card-text
        >
      </div>
    </div>
  </b-card>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import { getFromLocalStorage } from '@/utils/localStorage';
import defaulImageSvg from '@/assets/images/empty-img.svg'

interface Movie {
    id: number;
    title: string;
    rated: string;
    genre: string;
    posterUrl: string;
}

interface Showtime {
  uniqueId: string;
  id: number;
  hallId : number;
  hallName : string;
  cinemaName: string;
  cinemaAddress: string;
  startTime: string;
  endTime: string;
}

interface Seat {
  uniqueId : string;
  id: number;
  columnCode: number;
  rowCode : string;
  price: number;
  status : number;
}

interface Promotion {
	id: number;
	title: string;
  discount: number
}

const props = defineProps({
  selectedMovie: {
    type: Object as PropType<Movie | null>,
    default:null
  },
  selectedShowtime: {
    type: Object as PropType<Showtime | null>,
    default:null
  },
  selectedSeat: {
    type: Array as PropType<Seat[] |null>,
    default: () => null
  },
  selectedPromotion: {
    type: Object as PropType<Promotion | null>,
    default: () => null
  }
});

const retrievedMovie = getFromLocalStorage<Movie>('selectedMovie') || null;

const retrievedShowtime = getFromLocalStorage<Showtime>('selectedShowtime') || null;

const retrievedSeatsArray = getFromLocalStorage<Seat[]>('selectedSeat') || [];

const retrievedPromotion = getFromLocalStorage<Promotion>('selectedPromotion') || null;

const showDate = (startTime?: string) => {
  if (!startTime) return '';

  const timeStringDays = startTime.split(' ')[0];

  const timeStringHours = startTime.split(' ')[1];

  const [day, month, year] = timeStringDays.split('/');

  const [hours, minutes] = timeStringHours.split(':');

  return `
  <div class="d-flex justify-content-between">
    <p>Ngày: <strong>${day}/${month}/${year}</strong></p>
    <p>Suất: <strong>${hours}:${minutes}</strong></p>
  </div>
  `;
};

const showMovieSelection = (cinemaName?: string, hallId?: number) => {
  if(cinemaName === undefined || hallId === undefined ) {
    return ``;
  }
  return `
  <div class="d-flex justify-content-between">
    <p>Rạp: <small class="text-uppercase font-weight-bold">${cinemaName}</small></p>
    <strong>${hallId}</strong>
  </div>
  `;
}

const showNormalSeat = (selectedSeat?: Seat, count?: number) => {
  if(selectedSeat?.price === 50000) {
    if (count === 0) {
    return `<strong>&nbsp${selectedSeat.uniqueId}</strong>`;
    }
    else if (count === 8) {
      return `,...`;
    }
    else if (count > 8) {
      return null;
    }
    else {
      return `<strong>,&nbsp;${selectedSeat.uniqueId}</strong>`;
    }
  }
}

const showCoupleSeat = (selectedSeat?: Seat, count?: number) => {
  if(selectedSeat?.price === 65000) {
    if (count === 0) {
    return `<strong>&nbsp${selectedSeat.uniqueId}</strong>`;
    }
    else if (count === 8) {
      return `,...`;
    }
    else if (count > 8) {
      return null;
    }
    else {
      return `<strong>,&nbsp;${selectedSeat.uniqueId}</strong>`;
    }
  }
}

const showVipSeat = (selectedSeat?: Seat, count?: number) => {
  if(selectedSeat?.price === 90000) {
    if (count === 0) {
    return `<strong>&nbsp${selectedSeat.uniqueId}</strong>`;
    }
    else if (count === 8) {
      return `,...`;
    }
    else if (count > 8) {
      return null;
    }
    else {
      return `<strong>,&nbsp;${selectedSeat.uniqueId}</strong>`;
    }
  }
}


const processedMovie = computed(() => {
  if (props.selectedMovie) {
    return props.selectedMovie;
  }
  return retrievedMovie;
});

const processedShowtime = computed(() => {
  if (props.selectedShowtime) {
    return props.selectedShowtime;
  }
  return retrievedShowtime;
});

const processedSeat = computed(() => {
  if (props.selectedSeat) {
    return props.selectedSeat;
  }
  return retrievedSeatsArray || [];
});

const processedPromotion = computed(() => {
  if (props.selectedPromotion) {
    return props.selectedPromotion;
  }
  return retrievedPromotion;
});

const seatNormalPrice = computed(() => {
  return processedSeat.value.reduce((acc, seat) =>
  {
    if(seat.price === 50000) {
      return acc + seat.price;
    } else {
      return acc;
    }
  }, 0);
});

const seatCouplePrice = computed(() => {
  return processedSeat.value.reduce((acc, seat) =>
  {
    if(seat.price === 65000) {
      return acc + seat.price;
    } else {
      return acc;
    }
  }, 0);
});

const seatVipPrice = computed(() => {
  return processedSeat.value.reduce((acc, seat) =>
  {
    if(seat.price === 90000) {
      return acc + seat.price;
    } else {
      return acc;
    }
  }, 0);
});

const getNumberOfSelectedNormalSeat = () => {
  if(!processedSeat){
    return 0;
  }
  return processedSeat.value.filter(seat=> seat.price === 50000).length;
};

const getNumberOfSelectedCoupleSeat = () => {
  if(!processedSeat){
    return 0;
  }
  return processedSeat.value.filter(seat=> seat.price === 65000).length;
};

const getNumberOfSelectedVipSeat = () => {
  if(!processedSeat){
    return 0;
  }
  return processedSeat.value.filter(seat=> seat.price === 90000).length;
};

const discountPrice = computed(() => {
  const rawDiscount = (seatNormalPrice.value + seatCouplePrice.value + seatVipPrice.value) * (processedPromotion.value?.discount || 0) / 100;
  const roundedDiscount = parseFloat(rawDiscount.toFixed(2));

  return roundedDiscount;
});

const totalPrice = computed(() => {
  const rawTotal = seatNormalPrice.value + seatCouplePrice.value + seatVipPrice.value - discountPrice.value;
  const roundedTotal = parseFloat(rawTotal.toFixed(2));
  const formattedNumber = roundedTotal.toLocaleString('en-US');
  return formattedNumber;
});

onMounted(() => {
});
</script>
<style lang="scss">
@import "@/assets/styles/stepper-component.scss";
</style>
