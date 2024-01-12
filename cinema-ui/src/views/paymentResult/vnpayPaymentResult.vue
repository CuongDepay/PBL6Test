<template>
  <div class="vnpay-result-container">
    <div class="result">
      <div v-if="isSuccess()" class="icon-result icon-success">
        <svg-icon icon-class="check-circle" />
      </div>
      <div v-if="isSuccess()" class="title title-success">Giao dịch thành công</div>
      <div v-if="!isSuccess()" class="icon-result icon-fail">
        <svg-icon icon-class="close" />
      </div>
      <div v-if="!isSuccess()" class="title title-fail">Giao dịch thất bại</div>
    </div>
    <div class="content">
      <div class="amount">
        Số tiền:&nbsp;&nbsp;<span class="value">{{ formattedAmount }} đồng</span>
      </div>
      <div class="sub-content">
        Mã giao dịch:&nbsp;<span class="value">{{ $route.query.vnp_TxnRef }}</span>
      </div>
      <div class="sub-content">
        Mã ngân hàng:&nbsp;<span class="value">{{ $route.query.vnp_BankCode }}</span>
      </div>
      <div class="sub-content">
        Mã giao dịch của ngân hàng:&nbsp;<span class="value">{{ $route.query.vnp_BankTranNo }}</span>
      </div>
      <div class="sub-content">
        Loại thẻ:&nbsp;<span class="value">{{ $route.query.vnp_CardType }}</span>
      </div>
      <div class="sub-content">
        Thông tin đơn hàng:&nbsp;<span class="value">{{ $route.query.vnp_OrderInfo }}</span>
      </div>
      <div class="sub-content">
        Ngày thanh toán:&nbsp;<span class="value">{{ formattedPayDate }}</span>
      </div>
      <div class="sub-content">
        Số giao dịch:&nbsp;<span class="value">{{ $route.query.vnp_TransactionNo }}</span>
      </div>
    </div>
    <IrButton colorStyle="blue" type="primary" buttonSize="large" title="Thông tin vé" :width="210" @onClick="goToInvoice" />
    <WarningTextbox title="Lưu ý:">
      <template v-slot:content>
        Để bảo mật thông tin tài khoản, vui lòng không cung cấp chi tiết thẻ hoặc tài khoản ngân hàng cho bất kỳ ai Mọi thắc mắc vui lòng liên hệ Bộ
        phận hỗ trợ Star cinema:<br />
        <span class="blue-highlight-text">(84-28) 9999 9999</span> hoặc <span class="blue-highlight-text">(84-28) 9999 9999</span> để được hỗ trợ!
      </template>
    </WarningTextbox>
  </div>
</template>
<script setup lang="ts">
  import { useRoute } from "vue-router";
  import { handleBookingTicket } from '@/api/homepage';
  const route = useRoute();
  const router = useRouter();
  // Lấy giá trị vnp_PayDate từ URL
  const vnpPayDate = route.query.vnp_PayDate;
  const vnpAmount = route.query.vnp_Amount;
  // Định dạng lại giá trị vnp_PayDate thành ngày và giờ
  const formattedPayDate = formatVnpPayDate(vnpPayDate);
  // Định dạng lại số tiền
  const formattedAmount = formatVnpAmount(vnpAmount);

  // $route.query.vnp_TransactionStatus === '00' ? 'Thành công' : 'Thất bại'
  const trangThaiGiaoDich = route.query.vnp_TransactionStatus;
  const isSuccess = () => {
    return trangThaiGiaoDich === '00' ? true : false;
  }

  let queryObj = {};
  const goToInvoice = () => {
    router.push({path: '/booking/invoice', query: queryObj});
  }

  function formatVnpPayDate(dateTime:any) {
    const year = dateTime.substring(0, 4);
    const month = dateTime.substring(4, 6);
    const day = dateTime.substring(6, 8);
    const hours = dateTime.substring(8, 10);
    const minutes = dateTime.substring(10, 12);
    const seconds = dateTime.substring(12, 14);

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  function formatVnpAmount(amount:any) {
    // Chia số amount cho 100
    const amountDivided = amount / 100;
    // Sử dụng regex replace để định dạng số
    return amountDivided.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  /** Add booking info */
  const addBookingInfo = async () => {
    let invoiceInfo = await handleBookingTicket(route.query.vnp_TxnRef + '');
    queryObj = {
      "ticketId": invoiceInfo.data.ticketId,
      "startTime": invoiceInfo.data.startTime,
      "cinemaName": invoiceInfo.data.cinemaName,
      "hallName": invoiceInfo.data.hallName,
      "seatName": invoiceInfo.data.seatName,
      "promotionName": invoiceInfo.data.promotionName,
      "seatDescription": invoiceInfo.data.seatDescription,
      "totalAmount": invoiceInfo.data.totalAmount,
      "discountAmount": invoiceInfo.data.discountAmount,
      "actualAmount": invoiceInfo.data.actualAmount
    }
  }
onMounted(() => {
  if (isSuccess()) {
    addBookingInfo();
    localStorage.setItem('redirectBeforePaymentSuccess', 'true');
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.vnpay-result-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  gap: 32px;
  .result {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .title {
      font-family: Roboto;
      font-size: 32px;
      font-style: normal;
      font-weight: 600;
      line-height: 40px;
      margin-top: 24px;
      &.title-success {
        color: $green-500;
      }
      &.title-fail {
        color: $red-500;
      }
    }
    .icon-result {
      padding: 9px;
      border-radius: 60px;
      width: 90px;
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 52px;
        height: 52px;
      }
    }
    .icon-success {
      border: 10px solid $green-50;
      background-color: $green-100;
      svg {
        filter: brightness(0) saturate(0) invert(0) invert(70%) sepia(39%) saturate(7230%) hue-rotate(111deg) brightness(92%) contrast(83%);
      }
    }
    .icon-fail {
      border: 10px solid $red-50;
      background-color: $red-100;
      svg {
        filter: brightness(0) saturate(0) invert(0) invert(56%) sepia(69%) saturate(7378%) hue-rotate(343deg) brightness(99%) contrast(90%);
      }
    }
  }
  .content {
    border-radius: 8px;
    background: $gray-100;
    padding: 24px 108px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    align-items: center;
    .amount {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: $gray-700;
      text-align: right;
      font-family: Roboto;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 120%;
      .value {
        font-size: 32px;
        font-weight: 600;
        line-height: 40px;
      }
    }
    .sub-content {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: $gray-700;
      text-align: right;
      font-family: Roboto;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 120%;
      .value {
        font-weight: 600;
        line-height: normal;
      }
    }
  }
}
</style>
