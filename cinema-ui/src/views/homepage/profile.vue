<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <b-container justify-content="space-between" fluid class="h-100 d-flex flex-row" :style="{ backgroundColor: '#F9F9F9', padding: '10%' }">
        <b-card style="flex: 1; max-width: 30%; margin-right: 10%; margin-bottom: 35px; height: 100%; display: flex">
          <div class="basic-avatar"><userAvatar :user="state.user" /></div>

          <h3 class="text-center mt-4 mb-7">{{state.user.userName}}</h3>
          <div class="table">
            <tbody>
              <tr>
                <td>
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512" class="mr-2">
                    <path
                      d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                    />
                  </svg>
                  <span class="d-inline">{{ state.user.nickName }}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" class="mr-2">
                    <path
                      d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"
                    />
                  </svg>
                  <span class="d-inline">{{ state.user.email }}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" class="mr-2">
                    <path
                      d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                    />
                  </svg>
                  <span class="d-inline">{{ state.user.phonenumber }}</span>
                </td>
              </tr>
            </tbody>
          </div>
        </b-card>
        <div style="flex:1">
          <b-tabs content-class="mt-3">
            <b-tab title="Lịch sử giao dịch"
              ><p><BillHistory :billHistoryData="billHistoryData"></BillHistory></p
            ></b-tab>
          </b-tabs>
        </div>
      </b-container>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup name="Profile" lang="ts">
import { ref } from 'vue';
import { BillHisToryVO } from '@/api/booking/types';
import userAvatar from "../system/user/profile/userAvatar.vue"; 
import { getUserProfile, getBookingHistorys } from "@/api/system/user";

const state = ref<{ user: any; roleGroup: string;  postGroup: string}>({
    user: {},
    roleGroup: '',
    postGroup: ''
});

const billHistoryData = ref<BillHisToryVO[]>([]);

const userForm = ref({});

const getUserInfo = async () => {
    const res = await getUserProfile();
    state.value.user = res.data.user;
    userForm.value = { ...res.data.user }
    state.value.roleGroup = res.data.roleGroup;
    state.value.postGroup = res.data.postGroup;
};

const getBillHistoryList = async () => {
  const resHistoryInfos = await getBookingHistorys();
  billHistoryData.value = resHistoryInfos.data;
}

onMounted(() => {
  getUserInfo();
  getBillHistoryList();
})
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";

.container-fluid {
  padding: 2% 10% !important;
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


.basic-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
