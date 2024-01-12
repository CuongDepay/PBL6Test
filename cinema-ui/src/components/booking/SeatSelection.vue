<template>
  <div class="main-container">
    <div class="expansion-panels">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel>
          <div class="my-4" style="width:100%;">
            <div class="seat-map mb-5">
              <div v-for="rowNumber in seatData" :key="rowNumber.id" class="seat-row">
                <h5 class="row-letter">{{ rowNumber.rowCode }}</h5>
                <div
                  v-for="seatNumber in rowNumber.seatList"
                  :key="seatNumber.columnCode"
                  :class="{ normalSeat : getNormalColor(seatNumber), coupleSeat: getCoupleSeat(seatNumber) , vipSeat: getVipSeat(seatNumber) , selected: isSelected(rowNumber, seatNumber), sold : isSold(rowNumber, seatNumber), readonly: isSold(rowNumber, seatNumber)}"
                  @click="toggleSeat(rowNumber, seatNumber)"
                >
                  {{ rowNumber.rowCode }}{{ seatNumber.columnCode }}
                </div>
              </div>
            </div>
            <div style="margin-bottom: 4px;display: flex;justify-content: center;">MÀN HÌNH</div>
            <el-divider style="margin-top: -4px ;padding: 2px; background-color: #ff5e19;"></el-divider>
            <div class="note d-flex justify-content-between">
              <div class="d-flex justify-content-center w-50">
                <div class="note-details">
                  <div class="seat-selected"></div>
                  <h6>Ghế đã bán</h6>
                </div>
                <div class="note-details">
                  <div class="seat-selecting"></div>
                  <h6>Ghế đang chọn</h6>
                </div>
              </div>
              <div class="d-flex me-5">
                <div class="note-details">
                  <div class="seat-vip"></div>
                  <h6>Ghế Vip</h6>
                </div>
                <div class="note-details">
                  <div class="seat-couple"></div>
                  <h6>Ghế Couple</h6>
                </div>
                <div class="note-details">
                  <div class="seat-normal"></div>
                  <h6>Ghế Thường</h6>
                </div>
              </div>
            </div>
          </div>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="card-container">
      <CardDetails :selectedSeat="seats"></CardDetails>
    </div>
    <v-dialog v-model="props.dialogAgeLimitation" width="auto">
      <v-card style="padding:5px 15px">
        <img
          style="height:40px;width: 40px"
          class="align-self-center my-3"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/OOjs_UI_icon_alert-yellow.svg/2048px-OOjs_UI_icon_alert-yellow.svg.png"
        />
        <p class="text-lg font-bold my-2">Xác nhận mua vé cho người có độ tuổi phù hợp</p>
        <v-card-text>Tôi xác nhận mua vé phim cho độ tuổi này</v-card-text>
        <div class="d-flex flex-row justify-space-between">
          <v-card-actions class="flex-grow-1">
            <v-btn block @click="handleExit" color="orange darken-3">Từ chối</v-btn>
          </v-card-actions>
          <v-card-actions class="flex-grow-1">
            <v-btn block @click="handleConfirm" color="orange darken-3">Xác nhận</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { saveToLocalStorage, getFromLocalStorage} from '@/utils/localStorage';
import { useRoute } from "vue-router";
import { LocationQueryValue } from 'vue-router';
import { ShowtimeVO } from '@/api/portCustomer/showtimeManagement/types';
import { getSeatOrders } from '@/api/homepage';

const route = useRoute();
const panel = ref([1])
const dialog = ref(false);

interface Column {
  id: number;
  columnCode: number;
  status : number;
}

interface HallMap {
  id: number;
  rowCode: string;
  price: number;
  seatList: Column[];
}

interface SeatProp {
  uniqueId : string;
  id: number;
  columnCode: number;
  rowCode : string;
  price: number;
  status : string | number;
}

const props = defineProps({
  dialogAgeLimitation: {
    type: Boolean,
    default:false
  }
});

const emit = defineEmits(['exit','confirm']);

const handleExit = () => {
  emit('exit');
}

const handleConfirm = () => {
  emit('confirm');
}

const hallMap = ref<HallMap[]>([]);

const seats = ref<SeatProp[]>([]);

const getNormalColor = (seatNumber: SeatProp): boolean => {
  if (seatNumber.price === 50000) {
    return true;
  }
  return false;
};

const getCoupleSeat = (seatNumber: SeatProp): boolean => {
  if (seatNumber.price === 65000) {
    return true;
  }
  return false;
};

const getVipSeat = (seatNumber: SeatProp): boolean => {
  if (seatNumber.price === 90000) {
    return true;
  }
  return false;
};

const getSeatOrderList = async () => {
  const showtimeSelected = getFromLocalStorage<ShowtimeVO>('selectedShowtime');
  const res = (await getSeatOrders(showtimeSelected?.id));
  hallMap.value = res;
  const seatsParam = route.query.seats as string | LocationQueryValue[] | undefined;

  let parsedSeats: SeatProp[] = [];

  if(seatsParam)
  {
    const parsedSeats = Array.isArray(seatsParam)
    ? JSON.parse(JSON.stringify(seatsParam))
    : JSON.parse(seatsParam);
  }

  seats.value = parsedSeats;

  hallMap.value.map(row => {
    row.seatList.map(seat => {
      if (seat.status === 'Y') {
        if(!seats.value.length) {
          soldSeats.value.push([row.id, seat.columnCode]);
        }
        else {
              // Check against Local Storage for selected seats
          if (seats.value.find(seatProp =>
            seatProp.rowCode === String(row.rowCode) && seatProp.columnCode === seat.columnCode
          ))
          {
            selectedSeats.value.push([row.id, seat.columnCode]);
          }
          else {
            soldSeats.value.push([row.id, seat.columnCode]);
          }
        }
      }
      else if (seat.status === 'P') {
        soldSeats.value.push([row.id, seat.columnCode]);
      }
    });
  });
};

const soldSeats = ref<number[][]>([]);

const isSold = (rowNumber: HallMap, seatNumber: Column): boolean => {
  return soldSeats.value.some(
    seat => seat[0] === rowNumber.id && seat[1] === seatNumber.columnCode
  );
};

const selectedSeats = ref<number[][]>([]);

const isSelected = (rowNumber: HallMap, seatNumber: SeatProp): boolean => {
  return selectedSeats.value.some(
    seat => seat[0] === rowNumber.id && seat[1] === seatNumber.columnCode
  );
};

const seatData = computed(() => {
  return hallMap.value.flatMap(hallMap => ({
    ...hallMap,
    seatList: hallMap.seatList
      .map(column => ({
        ...column,
        uniqueId: `${hallMap.id}${column.columnCode}`,
        rowCode : `${hallMap.id}`,
        price : hallMap.price
      }))
  })).filter(hallMap => hallMap.seatList.length > 0);
});

const toggleSeat = (rowNumber: HallMap,seatNumber: SeatProp): void => {
  const uniqueId = `${rowNumber.rowCode}${seatNumber.columnCode}`;
  const rowCode= `${rowNumber.rowCode}`;

  // Update status directly on the object
  seatNumber.status = (seatNumber.status === 'N' || seatNumber.status === 'P')  ? 'Y' : 'N';

  // Update selection lists based on new status
    if (seatNumber.status === 'Y') {
      selectedSeats.value.push([rowNumber.id, seatNumber.columnCode]);
      seats.value = [...(seats.value || []), {
        uniqueId: uniqueId,
        id: seatNumber.id,
        rowCode : rowCode,
        columnCode: seatNumber.columnCode,
        status: seatNumber.status,
        price: rowNumber.price
      }];
      saveToLocalStorage('selectedSeat', seats.value);
    }
    else {
      const index = selectedSeats.value.findIndex(
        seat => seat[0] === rowNumber.id && seat[1] === seatNumber.columnCode
        );
      if (index !== -1) {
        selectedSeats.value.splice(index, 1);
      }
      if (seats.value) {
        seats.value = seats.value.filter(seat => seat.uniqueId !== uniqueId);
        saveToLocalStorage('selectedSeat', seats.value);
      }
    }
};

onMounted(() => {
  getSeatOrderList();
});
</script>

<style lang="scss" scoped>
.seat-map {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0px;
  margin-right: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 120px;
}

.seat-row {
  margin: 4px;
  display: grid;
  grid-template-columns: repeat(14, 1fr); /* 10 ghế trên mỗi hàng */
}

.normalSeat {
  width: 10px;
  height: 10px;
  padding: 14px;
  border-radius: 4px;
  background-color: #fff;
  border: 2px solid #ccc;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  box-shadow: 0 0 4px 0 sloid #000;
}

.coupleSeat {
  width: 10px;
  height: 10px;
  padding: 14px;
  border-radius: 4px;
  background-color: #fff;
  border: 2px solid #0000FF;
  color : #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  box-shadow: 0 0 4px 0 sloid #000;
}

.vipSeat {
  width: 10px;
  height: 10px;
  padding: 14px;
  border-radius: 4px;
  background-color: #fff;
  border: 2px solid #CCCC00;
  color : #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  box-shadow: 0 0 4px 0 sloid #000;
}

.selected,
.normalSeat:hover {
  background-color: #87f079;
  color: #fff;
}
.coupleSeat:hover {
  background-color: #87f079;
  color: #fff;
}

.vipSeat:hover {
  background-color: #87f079;
  color: #fff;
}
.sold {
  background-color: #ccc; /* color for sold seat */
  color: #fff;
  pointer-events: none; /* disables click events */
}

.row-letter{
  margin-left: -200px;
  font-size: 20px;
}
.note,.note-details{
  display: flex;
  justify-content: center;
  margin: 4px 12px 8px 12px;
}
.seat-selected{
  width: 10px;
  height: 10px;
  padding: 10px;
  border-radius: 4px;
  margin-right: 4px;
  background-color: #ccc;
  border: 1px solid #ccc;
  cursor: default;
}
.seat-selecting{
  width: 10px;
  height: 10px;
  padding: 10px;
  border-radius: 4px;
  margin-right: 4px;
  background-color: #87f079;
  border: 1px solid #87f079;
  cursor: default;
}
.seat-vip{
  width: 10px;
  height: 10px;
  padding: 10px;
  border-radius: 4px;
  margin-right: 4px;
  background-color: #fff;
  border: 2px solid #CCCC00;
  cursor: default;
}

.seat-couple{
  width: 10px;
  height: 10px;
  padding: 10px;
  border-radius: 4px;
  margin-right: 4px;
  background-color: #fff;
  border: 2px solid #0000FF;
  cursor: default;
}
.seat-normal{
  width: 10px;
  height: 10px;
  padding: 10px;
  border-radius: 4px;
  margin-right: 4px;
  background-color: #fff;
  border: 2px solid #ccc;
  cursor: default;
}
.btn{
  height: 38px;
  width: 76px;
  align-items: center;
  display: flex;
  font-size:15px;
  justify-content: center;
}
.showtime-selected {
    background-color: #3498db;
    color: #fff;
  }
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
  font-family: sans-serif
}
.v-card-text {
  font-family: sans-serif;
}
</style>
