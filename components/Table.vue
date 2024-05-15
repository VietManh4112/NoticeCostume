<template>
  <div class="table">
    <table cellspacing="0" v-show="type === 'userCheckCart'" id="userCheckCart">
      <thead>
        <th style="width: 5%">STT</th>
        <th style="width: 20%">Mã sản phẩm</th>
        <th style="width: 15%">Số lượng</th>
        <th style="width: 20%">Giá</th>
        <th style="width: 15%">Kích thước</th>
        <th style="width: 10%">Xóa</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartItems" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.customerId }}</td>
          <td>{{ item.quatity }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.size }}</td>
          <td @click="deleteItem(index)">Xóa</td>
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
import EthnicStore from '@/store/ethnic'

export default {
  name: 'Table',
  component: {},
  props: {
    type: String,
  },
  data() {
    return {
      cartItems: [],
    }
  },
  mounted() {
    this.fetchCartItems()
  },
  methods: {
    fetchCartItems() {
      EthnicStore.get('/api/get-all-inventories')
        .then((response) => response.json())
        .then((data) => {
          this.cartItems = data.orderDetailDto
          this.populateCartTable()
        })
        .catch((error) => {
          console.error('Lỗi khi gọi API:', error)
        })
    },
    populateCartTable() {
      const tableBody = document.querySelector('#userCheckCart tbody')
      tableBody.innerHTML = ''

      this.cartItems.forEach((item, index) => {
        const newRow = document.createElement('tr')

        const sttCell = document.createElement('td')
        sttCell.textContent = index + 1

        const productCodeCell = document.createElement('td')
        productCodeCell.textContent = item.customerId

        const quantityCell = document.createElement('td')
        quantityCell.textContent = item.quatity

        const priceCell = document.createElement('td')
        priceCell.textContent = item.price

        const sizeCell = document.createElement('td')
        sizeCell.textContent = item.size
        const deleteCell = document.createElement('td')
        deleteCell.textContent = 'Xóa'
        newRow.appendChild(sttCell)
        newRow.appendChild(productCodeCell)
        newRow.appendChild(quantityCell)
        newRow.appendChild(priceCell)
        newRow.appendChild(sizeCell)
        newRow.appendChild(deleteCell)
        tableBody.appendChild(newRow)
      })
    },
    deleteItem(index) {
      axiosInstance
        .delete('/api/remove-inventory/${customerId}')
        .then((response) => {
          console.log('Dữ liệu đã được xóa thành công')
        })
        .catch((error) => {
          console.error('Lỗi khi xóa dữ liệu:', error)
        })
      // Xóa dữ liệu tương ứng với index đó khỏi mảng cartItems
      this.cartItems.splice(index, 1)

      // Cập nhật lại table
      this.populateCartTable()
    },
  },
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
