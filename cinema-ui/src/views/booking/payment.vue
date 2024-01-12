<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <LayoutBooking :step="step">
        <template v-slot:stepper-container>
          <Payment></Payment>
        </template>
        <template v-slot:btn-group>
          <button class="btn" @click="decrementStep()">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
              <path
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
              />
            </svg>
          </button>
          <button class="btn btn--blue-1" @click="submitVnpay">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
              <path
                d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
              />
            </svg>
          </button>
        </template>
      </LayoutBooking>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup lang="ts">
import Payment from '@/components/booking/Payment.vue';
import { getFromLocalStorage, removeFromLocalStorage } from '@/utils/localStorage';
import { getVnpayUrl } from '@/api/homepage';
import { ref } from 'vue';
import router from '@/router';

interface SeatProp {
  uniqueId : string;
  id: number;
  columnCode: number;
  rowCode : string;
  price: number;
  status : number;
}

const step = ref(3);

const localStorageSeats = getFromLocalStorage<SeatProp[]>('selectedSeat') || [];

const incrementStep = () => {
  step.value += 1;
  router.push({path: '/booking/invoice'});
  return `/booking`;
}

/** Payment vnpay */
const submitVnpay = async () => {
  const localStoragePromotion = getFromLocalStorage<any>('selectedPromotion') || null;
  const localStorageSeats = getFromLocalStorage<any>('selectedSeat') || null;
  const promotionId = localStoragePromotion === null ? 0 : localStoragePromotion.id;
  const res = await getVnpayUrl(localStorageSeats.map((obj: { id: any; }) => obj.id), promotionId);
  const url = res.data;
  window.open(url, "_blank");
}

const decrementStep = () => {
  removeFromLocalStorage('selectedPromotion')
  step.value -= 1;

  const serializedSeats = localStorageSeats ? JSON.stringify(localStorageSeats) : '';
  router.push({path: '/booking/seatSelection', query: {seats: serializedSeats}});
}
onMounted(() => {
  console.log("before");
  window.addEventListener('storage', (event) => {
    console.log("after");
    if (event.key === 'redirectBeforePaymentSuccess' && event.newValue === 'true') {
      router.push({path: '/profile', query: {}});
      localStorage.setItem('redirectBeforePaymentSuccess', 'false');
    }
  });
});
</script>
