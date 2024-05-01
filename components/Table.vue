<template>
  <div class="table">
    <table cellspacing="0" v-show="type === 'userCheckCart'">
      <thead>
        <th style="width: 5%">STT</th>
        <th style="width: 30%">Sản Phẩm</th>
        <th style="width: 15%">Giá</th>
        <th style="width: 10%">Số lượng</th>
        <th style="width: 15%">Thành tiền</th>
        <th style="width: 25%">Thời gian đặt hàng</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Trang phục cống</td>
          <td>100.000 đ</td>
          <td>2</td>
          <td>200.000 đ</td>
          <td>13/3/2024. 10:21:15 PM</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Trang phục cống</td>
          <td>100.000 đ</td>
          <td>2</td>
          <td>200.000 đ</td>
          <td>13/3/2024. 10:21:15 PM</td>
        </tr>
      </tbody>
    </table>
    <table cellspacing="0" v-show="type === 'adminCheckOrder'">
      <thead>
        <th style="width: 5%">STT</th>
        <th style="width: 15%">Mã đơn hàng</th>
        <th style="width: 30%">Tên sản phẩm</th>
        <th style="width: 10%">Số lượng</th>
        <th style="width: 15%">Tên khách hàng</th>
        <th>Thời gian đặt hàng</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>dj455dgg5</td>
          <td>Trang Phục Thái</td>
          <td>3</td>
          <td>Nùng A Sủ</td>
          <td>13/3/2024. 10:21:15 PM</td>
        </tr>
        <tr>
          <td>1</td>
          <td>dj455dgg5</td>
          <td>Trang Phục Thái</td>
          <td>3</td>
          <td>Nùng A Sủ</td>
          <td>13/3/2024. 10:21:15 PM</td>
        </tr>
      </tbody>
    </table>
    <table cellspacing="0" v-show="type === 'adminCheckProduct'">
      <thead>
        <th>STT</th>
        <th>Tên sản phẩm</th>
        <th>Size</th>
        <th>Số lượng</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Trang Phục Kinh</td>
          <td>M</td>
          <td>150</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Trang Phục Tày</td>
          <td>L</td>
          <td>150</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Trang Phục Tày</td>
          <td>M</td>
          <td>150</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axiosInstance, { setBearerToken } from '@/helper/api.js'
export default {
  name: 'Table',
  component: {},
  props: {
    type: String,
  },
  computed: {},
  methods: {},
}
</script>
<style>
.table {
  width: 100%;
}
table {
  width: 80%;
  padding: 0;
  border-collapse: collapse;
  margin: 50px auto;
}
thead {
  background: rgba(249, 220, 200, 100%);
}
th,
td {
  border: 0.5px solid rgb(234, 168, 138);
  border-collapse: collapse;
  text-align: center;
  padding: 1px 10px;
}
tr:hover {
  background: #f4efef;
}
</style>
