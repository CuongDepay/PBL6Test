<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <LayoutBooking :step="step">
        <template v-slot:stepper-container style="height: 60%;">
          <MovieSelection></MovieSelection>
        </template>
        <template v-slot:btn-group>
          <button class="btn" @click="decrementStep()">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
              <path
                fill="#000"
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
              />
            </svg>
          </button>
          <button class="btn btn--blue-1" @click="incrementStep()">
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
import { ref } from 'vue';
import MovieSelection from '@/components/booking/MovieSelection.vue';
import router from '@/router';
import { getFromLocalStorage } from '@/utils/localStorage';

const step = ref(1);

const incrementStep = () => {
  if(getFromLocalStorage('selectedMovie') != null && getFromLocalStorage('selectedShowtime') != null){
    step.value += 1;
    router.push({path:'/booking/seatSelection'});
  }
}

const decrementStep = () => {
  step.value -= 1;
  router.push({path:'/homepage'});
}
</script>
