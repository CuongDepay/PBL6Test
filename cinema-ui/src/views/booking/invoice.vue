<template>
  <div class="bg-white woocommerce-order-received">
    <!-- SHOP ORDER COMPLETED
          ================================================== -->
    <div class="container py-8 py-lg-11">
      <div class="row">
        <div class="col-xl-8 mx-xl-auto">
          <header class="entry-header">
            <h1 class="entry-title">Thanh toán thành công</h1>
          </header>

          <div class="entry-content">
            <div class="woocommerce">
              <div class="woocommerce-order">
                <p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received"></p>
                <ul class="woocommerce-order-overview woocommerce-thankyou-order-details order_details">
                  <li class="woocommerce-order-overview__order order">
                    Mã vé
                    <strong>{{ formattedTicketId }}</strong>
                  </li>

                  <li class="woocommerce-order-overview__date date">
                    Suất chiếu
                    <strong>{{ $route.query.startTime }}</strong>
                  </li>
                  <li class="woocommerce-order-overview__payment-method method">
                    {{ $route.query.cinemaName }}
                    <strong>{{ $route.query.hallName }}</strong>
                  </li>

                  <li class="woocommerce-order-overview__total total">
                    Ghế
                    <strong>{{ $route.query.seatName }}</strong>
                  </li>
                </ul>

                <section class="woocommerce-order-details">
                  <h2 class="woocommerce-order-details__title">Chi tiết hóa đơn</h2>
                  <table class="woocommerce-table woocommerce-table--order-details shop_table order_details">
                    <thead>
                      <tr>
                        <th class="woocommerce-table__product-name product-name">{{ $route.query.seatDescription }}</th>
                        <th class="woocommerce-table__product-table product-total">Tổng cộng</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr class="woocommerce-table__line-item order_item">
                        <td class="woocommerce-table__product-name product-name">
                          <a href="#">{{ $route.query.seatName }}</a>
                        </td>

                        <td class="woocommerce-table__product-total product-total">
                          <span class="woocommerce-Price-amount amount">{{ formatCurrency(Number($route.query.totalAmount)) }}</span>
                        </td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th scope="row">Khuyến mãi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="woocommerce-table__line-item order_item">
                        <th class="woocommerce-table__product-name product-name" scope="row">
                          <a href="#">{{ $route.query.promotionName }}</a>
                        </th>
                        <td>
                          <span class="woocommerce-Price-amount amount">- {{ formatCurrency(Number($route.query.discountAmount)) }}</span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th scope="row">Phương thức thanh toán:</th>
                        <td>VNPay</td>
                      </tr>
                      <tr>
                        <th scope="row">Tổng cộng:</th>
                        <td>
                          <span class="woocommerce-Price-amount amount">{{ formatCurrency(Number($route.query.actualAmount)) }}</span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  <div class="text-center">
                    <img
                      src="https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2Fqrcode%2F2023%2F11%2F23%2Fqrcode_WSJ7KFP.png&amp;w=256&amp;q=75"
                      data-v-20c8b577=""
                      style="height: 250px; width: 250px;"
                    />
                    <p><strong>Bạn vui lòng quét mã trước khi vào rạp</strong></p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useRoute } from "vue-router";
  const route = useRoute();
    // Định dạng lại ticketId
    const formattedTicketId = formatTicketId(route.query.ticketId);
    function formatTicketId(ticketId:any) {
    // Sử dụng 5 ki tu cuoi
    return ticketId.substring(13);
  }

  const formatCurrency = (value?:any) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
</script>
<style scoped>
@import "@/assets/styles/invoice.css";
</style>
