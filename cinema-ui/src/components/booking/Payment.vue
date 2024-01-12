<template>
  <div class="main-container">
    <div class="expansion-panels">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel>
          <div class="px-4 py-2" style="width: 100%;">
            <div class="card-body">
              <div class="my-4 d-flex justify-content-center">
                <h5 v-if="remainingTime > 0">
                  Thời gian giữ ghế : <strong class="time-out">{{ formatTime((remainingTime)) }}</strong>
                </h5>
                <div v-else-if="modalVisible" class="modal" tabindex="-1">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <p>Modal body text goes here.</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <v-select :items="[ 'VNPAY','Thanh toán bằng tiền mặt']" label="Phương Thức Thanh Toán "></v-select>
              <div class="card-subtitle text-muted my-4">
                <h6 class="d-flex flex-start">Mã khuyến mãi</h6>
                <div class="d-flex mb-1">
                  <input type="text" class="form-control me-4" style="width: 60%;" v-model="selectedTitle" readonly />
                  <button @click="handleUploadCardDetail(selectedPromotionId, selectedTitle, selectedDiscount)" class="btn-promotion btn btn-outline">
                    Áp Dụng
                  </button>
                </div>
                <span class="d-flex flex-start" style="font-size: 14px;color: #ccc;">Lưu ý : Chỉ áp dụng 1 voucher cho mỗi lần thanh toán</span>
              </div>
              <div class="card-subtitle text-muted my-4 container">
                <h6 class="d-flex flex-start my-3">Khuyến mãi của bạn</h6>
                <div v-for="code in promotionList" :key="code.id" class="card my-1" style="width: 100%;">
                  <img :src="code.imageUrl" class="card-img-top image" alt="..." style="width: 20%;" />
                  <div class="card-body d-flex justify-content-between align-items-center" style="100%">
                    <h6 class="card-title w-30">{{code.title}}</h6>
                    <span>Giảm {{ code.discount }}%</span>
                    <p class="card-title ml-1">Hạn sử dụng : {{ formatDate(code.toDate) }}</p>
                    <button @click="handleUploadInput(code.id,code.title,code.discount)" class="btn btn-outline btn-apply">Dùng ngay</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="card-container">
      <CardDetails :selectedPromotion="selectedPromotion"></CardDetails>
    </div>
    <v-dialog v-model="dialog" width="auto">
      <v-card style="padding:10px 40px">
        <img
          style="height:40px;width: 40px"
          class="align-self-center my-3"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/OOjs_UI_icon_alert-yellow.svg/2048px-OOjs_UI_icon_alert-yellow.svg.png"
        />
        <p class="text-lg font-bold my-2">Thông báo</p>
        <v-card-text>Hết thời gian giữ ghế</v-card-text>
        <v-card-actions>
          <v-btn block @click="handleCloseModal" color="orange darken-3">Đóng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup name="pay" lang="ts">
import { ref,watch , onMounted } from 'vue';
import { saveToLocalStorage, getFromLocalStorage } from '@/utils/localStorage';
import { getPromotions } from '@/api/homepage';
import { PromotionVO } from '@/api/portCustomer/promotionManagement/types';
import axios from 'axios'
import router from '@/router';
import { removeFromLocalStorage } from '@/utils/localStorage';

interface PromotionProp {
	id: number;
	title: string;
  discount: number
}

const panel = ref([2])

//giu ghe
const remainingTime = ref(300);
const dialog = ref(false);

const formatTime = (seconds : number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${minutes}:${String(secondsLeft).padStart(2, '0')}`;
};

const countDown = () => {
  if (remainingTime.value > 0) {
    remainingTime.value -= 1;
  } else {
    dialog.value = true;
  }
};

const currentDate = new Date()

const promotionList = ref<PromotionVO[]>([]);

const selectedTitle = ref<string |undefined>("");

const selectedPromotionId = ref<number |undefined>(0);

const selectedDiscount = ref<number |undefined>(0);

const handleUploadInput = (id:number, title : string, discount: number) => {
  selectedPromotionId.value = id;
  selectedTitle.value = title;
  selectedDiscount.value = discount;
}

const selectedPromotion = ref<PromotionProp | null>(null)

const handleUploadCardDetail = (id: number , title : string, discount: number) => {
  selectedPromotion.value = {
    id: id,
    title: title,
    discount: discount
  }
  saveToLocalStorage('selectedPromotion', selectedPromotion.value)
}

const handleCloseModal = () => {
  removeFromLocalStorage('selectedSeat');
  removeFromLocalStorage('selectedPromotion');
  router.push({path:'/booking/seatSelection'});
}

const formatDate = (date: string) => {
  const timeString = date.split(' ')[0];

  const [year, month, day] = timeString.split('-');

  return `${day}/${month}/${year}`;
}

const getPromotionList = async () => {
  const res = await getPromotions();
  promotionList.value = res;
  const localStoragePromotion = getFromLocalStorage<PromotionProp>('selectedPromotion') || null;
  selectedPromotion.value = localStoragePromotion;
  selectedPromotionId.value = selectedPromotion.value?.id;
  selectedTitle.value = selectedPromotion.value?.title;
  selectedDiscount.value = selectedPromotion.value?.discount;
};

onMounted(() => {
  getPromotionList();
  saveToLocalStorage('beforePathLogin', router.currentRoute.value.href);
  const intervalId = setInterval(countDown, 1000);
  watch(() => dialog.value, (newValue) => {
    if (newValue) {
      clearInterval(intervalId);
    }
  });
});
</script>

<style lang="scss" scoped>
.btn-promotion{
  width: 15%;
  border-radius: 4px;
  color:#fff;
  background-color: #ff5e19;
  opacity: 1;
}
.btn-promotion:hover{
  opacity: 0.7;
}
.btn-apply{
  border-radius: 4px;
  color:#fff;
  background-color: #ff5e19;
  opacity: 1;
  margin-right: 10px;
  margin-left: 100px;
}
.btn-apply:hover{
  opacity: 0.7;
}
.time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 10%;
    display: block;
    border-radius: 4px;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }

  .card{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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
.time-out{
  color: #ff5e19;
}
</style>
