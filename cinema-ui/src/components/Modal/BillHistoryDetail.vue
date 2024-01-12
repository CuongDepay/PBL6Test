<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <span type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></span>
          <div class="flex-column modal-header">
            <img :src="props.bill?.posterUrl" style="height:120px" />
            <div class="modal-title">{{ bill?.movieName }}</div>
            <p>{{ props.bill?.genre }}</p>
          </div>
          <div class="custom-dotted-line"></div>
          <div class="modal-body">
            <div class="time-info">
              <p class="bold-font mb-1">Star Cinema - {{props.bill?.cinemaName}} - {{bill?.hallName}}</p>
              <div class="d-inline-block">
                <p v-html="formatTime(props.bill?.startTime)"></p>
              </div>
              <div class="text-center">
                <qrcode-vue :value="props.bill?.bookingId" style="height:116px; width:116px" level="H"></qrcode-vue>
              </div>
            </div>
            <div class="custom-dotted-line"></div>
            <div class="seat_info">
              <p>
                <div class="d-flex flex-row">
                Ghế - <div><strong>{{showSeat(props.bill?.seatIds)}}</strong></div>
                </div>
              </p>
            </div>
            <div class="custom-dotted-line"></div>
            <div class="cost-info">
              <div class="grid-container">
                <div class="grid-item">Mã vé</div>
                <div class="grid-item">KM</div>
                <div class="grid-item">Giá</div>
                <div class="grid-item bold-font">{{ props.bill?.bookingId }}</div>
                <div class="grid-item bold-font">{{ props.bill?.promotionId }}</div>
                <div class="grid-item bold-font">{{ props.bill?.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import { BillHisToryVO } from '../../api/booking/types';
import QrcodeVue from 'qrcode.vue';

const formatCurrency = (value?:any) => {
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

const props = defineProps({
  bill: {
    type: Object as PropType<BillHisToryVO | null>,
    required: true
  }
})

const formatTime = (date?: string) => {
  if (!date) return '';

  const timeStringDays = date.split(' ')[0];

  const timeStringHours = date.split(' ')[1];

  const [year, month, day] = timeStringDays.split('-');

  const [hours, minutes] = timeStringHours.split(':');

  return `Suất: <b>${hours}:${minutes} - ${day}/${month}/${year}</b>`;
}

const showSeat = (selectedSeats?: string[]) => {
  if (!selectedSeats) {
    return '';
  }

  return selectedSeats.join(', ');
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-wrapper {
  padding: 10px;
  width: 365px;
  height: 635px;
}
.modal-container {
  position: relative;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  border-radius: 20px;
  max-width: 700px;
  width: 100%;
  overflow: hidden;
}
.modal-header {
  justify-content: center;
  padding:  0px 10px 0px 10px ;
}
.modal-body {
  padding: 0px 23px;
}
.time-info {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
}
.seat_info {
  padding: 0px 10px;
}
.cost-info {
 padding: 0px 0px 35px 0px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 0.8fr);
  grid-template-rows: repeat(2, 25px);
  gap: 5px;
}
.grid-item {
  padding: 2px;
  text-align: center;
}
.modal-title {
  text-align:center;
  margin: 15px 0px 5px 0px;
  padding: 0px 25px;
  font-size: 1.15em;
  font-weight: 650;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.btn-close {
  padding-right: 540px;
  margin: 15px;
}
.custom-dotted-line {
  margin:5px 0px;
  height:20px;
  background:
    repeating-linear-gradient(90deg,#000100 0 5px ,#0000 0 7px) top;
  background-size:280px 2px;
  background-repeat:no-repeat;
}
.bold-font {
 font-weight:600;
 font-size: 1rem;
}
</style>
