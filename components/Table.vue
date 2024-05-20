<template>
  <Toast type="toastFail" :messageFail="messageFail" v-if="visibleToastFail"></Toast>
  <div class="table">
    <table cellspacing="0" v-show="type === 'userCheckCart'" id="userCheckCart">
      <thead>
        <th style="width: 5%">STT</th>
        <th style="width: 15%">
          <p v-if="!isEnglish">Mã sản phẩm</p>
          <p v-else>Product code</p>
        </th>
        <th style="width: 15%">
          <p v-if="!isEnglish">Mã khách hàng</p>
          <p v-else>Customer's code</p>
        </th>
        <th style="width: 10%">
          <p v-if="!isEnglish">Giá tiền</p>
          <p v-else>Price</p>
        </th>
        <th style="width: 20%">
          <p v-if="!isEnglish">Thời gian đặt</p>
          <p v-else>Set time</p>
        </th>
        <th style="width: 15%">
          <p v-if="!isEnglish">Thanh toán</p>
          <p v-else>Payment</p>
        </th>
        <th style="width: 10%">
          <p v-if="!isEnglish">Hủy</p>
          <p v-else>Cancel</p>
        </th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartItemsUserOrder" :key="index">
          <td @click="openModalDetail(item.id)">{{ index + 1 }}</td>
          <td @click="openModalDetail(item.id)">{{ item.id }}</td>
          <td @click="openModalDetail(item.id)">{{ item.userId }}</td>
          <td @click="openModalDetail(item.id)">{{ item.totalAmount }}</td>
          <td @click="openModalDetail(item.id)">{{ item.orderDate }}</td>
          <td @click="openModalDetail(item.id)">{{ item.status }}</td>
          <td>
            <span @click="cancelOrder(item.id)" style="cursor: pointer; text-decoration: underline; color: red">
              <p v-if="!isEnglish">Hủy</p>
              <p v-else>Cancel</p>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <Modal v-if="hideModalDetail" type="modal-detail" :costumeIdDetail="costumeIdDetail"
      :quantityDetail="quantityDetail" :priceDetail="priceDetail" :sizeDetail="sizeDetail" :nameDetail="nameDetail"
      :phoneNumberDetail="phoneNumberDetail" :addressDetail="addressDetail"></Modal>
    <table cellspacing="0" v-show="type === 'adminCheckOrder'">
      <thead>
        <th style="width: 5%">STT</th>
        <th style="width: 15%">
          <p v-if="!isEnglish">Mã sản phẩm</p>
          <p v-else>Product code</p>
        </th>
        <th style="width: 15%">
          <p v-if="!isEnglish">Mã khách hàng</p>
          <p v-else>Customer's code</p>
        </th>
        <th style="width: 10%">
          <p v-if="!isEnglish">Giá tiền</p>
          <p v-else>Price</p>
        </th>
        <th style="width: 20%">
          <p v-if="!isEnglish">Thời gian đặt</p>
          <p v-else>Set time</p>
        </th>
        <th style="width: 15%">
          <p v-if="!isEnglish">Thanh toán</p>
          <p v-else>Payment</p>
        </th>
        <th style="width: 10%">
          <p v-if="!isEnglish">Hủy</p>
          <p v-else>Cancel</p>
        </th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartItemsOrder" :key="index">
          <td @click="openModalDetail(item.id)">{{ index + 1 }}</td>
          <td @click="openModalDetail(item.id)">{{ item.id }}</td>
          <td @click="openModalDetail(item.id)">{{ item.userId }}</td>
          <td @click="openModalDetail(item.id)">{{ item.totalAmount }}</td>
          <td @click="openModalDetail(item.id)">{{ item.orderDate }}</td>
          <td @click="openModalDetail(item.id)">{{ item.status }}</td>
          <td>
            <span @click="cancelOrder(item.id)" style="cursor: pointer; text-decoration: underline; color: red">
              <p v-if="!isEnglish">Hủy</p>
              <p v-else>Cancel</p>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <table cellspacing="0" v-show="type === 'adminCheckProduct'" style="margin-top: 150px">
      <thead>
        <th style="width: 5%">STT</th>
        <th style="width: 20%">
          <p v-if="!isEnglish">Mã sản phẩm</p>
          <p v-else>Product code</p>
        </th>
        <!-- <th style="width: 20%">Giá</th> -->
        <th style="width: 15%">
          <p v-if="!isEnglish">Số lượng</p>
          <p v-else>Quantity</p>
        </th>
        <th style="width: 15%">
          <p v-if="!isEnglish">Kích thước</p>
          <p v-else>Size</p>
        </th>
        <th style="width: 10%"></th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartItems" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.costumeId }}</td>
          <!-- <td>{{ item.id }}</td> -->
          <td>{{ item.quantity }}</td>
          <td>{{ item.size }}</td>
          <td>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"
              fill="none" class="icon-edit" @click="openModalEdit(item.costumeId, item.quantity, item.size)">
              <path fill="currentColor"
                d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z"
                class></path>
            </svg>
            <span @click="deleteItem(index)" style="cursor: pointer; text-decoration: underline; color: red">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"
                fill="none">
                <path fill="currentColor"
                  d="M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z"
                  class></path>
                <path fill="currentColor" fill-rule="evenodd"
                  d="M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z"
                  clip-rule="evenodd" class></path>
              </svg></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axiosInstance, { setBearerToken } from '@/helper/api.js'
import Toast from '@/components/Toast.vue'
import EthnicStore from '@/store/ethnic'

export default {
  name: 'Table',
  components: {
    Toast,
  },
  props: {
    type: String,
  },

  computed: {
    isEnglish() {
      return this.$store.state.isEnglish;
    },
  },

  data() {
    return {
      cartItems: [],
      cartItemsOrder: [],
      cartItemsUserOrder: [],
      hideModalEdit: false,
      hideModalDetail: false,
      costumeIdDetail: '',
      quantityDetail: '',
      priceDetail: '',
      sizeDetail: '',
      nameDetail: '',
      phoneNumberDetail: '',
      addressDetail: '',
      messageFail: '',
      visibleToastFail: false,
    }
  },
  mounted() {
    const jwt = require('jsonwebtoken')
    const token = localStorage.getItem('token')
    const decoded = jwt.decode(token)
    if (decoded) {
      this.sub = decoded.sub
      this.url = decoded.url
    }
    if (token && token.trim() !== '') {
      this.hide = true
    }
    if (token) {
      this.authority = jwt.decode(
        localStorage.getItem('token')
      ).role[0].authority
    }
    if (this.authority === 'admin') {
      this.fetchCartItems()
      this.loadAdminCheckOrder()
    }
    if (this.authority === 'user') {
      this.loadUserCheckOrder()
    }
  },
  methods: {
    fetchCartItems() {
      const token = localStorage.getItem('token')
      setBearerToken(token)
      axiosInstance
        .post('/api/get-all-inventories')
        .then((response) => {
          if (response.data) {
            this.cartItems = response.data
            this.populateCartTable()
          } else {
            console.error('Lỗi khi gọi API: Không nhận được dữ liệu JSON')
          }
        })
        .catch((error) => {
          console.error('Lỗi khi gọi API:', error)
        })
    },
    populateCartTable() {
      // const tableBody = document.querySelector('#userCheckCart tbody')
      // tableBody.innerHTML = ''
      // if (this.cartItems && Array.isArray(this.cartItems) && this.cartItems.length > 0) {
      //   this.cartItems.forEach((item, index) => {
      //     const newRow = document.createElement('tr')
      //     const sttCell = document.createElement('td')
      //     sttCell.textContent = index + 1
      //     const productCodeCell = document.createElement('td')
      //     productCodeCell.textContent = item.customerId
      //     const quantityCell = document.createElement('td')
      //     quantityCell.textContent = item.id
      //     const priceCell = document.createElement('td')
      //     priceCell.textContent = item.quantity
      //     const sizeCell = document.createElement('td')
      //     sizeCell.textContent = item.size
      //     const deleteCell = document.createElement('td')
      //     deleteCell.textContent = 'Xóa'
      //     deleteCell.addEventListener('click', () => this.deleteItem(item.customerId))
      //     newRow.appendChild(sttCell)
      //     newRow.appendChild(productCodeCell)
      //     newRow.appendChild(quantityCell)
      //     newRow.appendChild(priceCell)
      //     newRow.appendChild(sizeCell)
      //     newRow.appendChild(deleteCell)
      //     tableBody.appendChild(newRow)
      //   })
      // } else {
      //   console.error('Lỗi khi gọi API: Không có dữ liệu trong this.cartItems')
      // }
    },
    loadAdminCheckOrder() {
      const token = localStorage.getItem('token')
      setBearerToken(token)
      axiosInstance
        .get('/api/get-all-orders')
        .then((response) => {
          if (response.data) {
            this.cartItemsOrder = response.data
            this.populateCartTable()
          } else {
            console.error('Lỗi khi gọi API: Không nhận được dữ liệu JSON')
          }
        })
        .catch((error) => {
          console.error('Lỗi khi gọi API:', error)
        })
    },
    loadUserCheckOrder() {
      const token = localStorage.getItem('token')
      setBearerToken(token)
      axiosInstance
        .get('/api/get-order')
        .then((response) => {
          if (response.data) {
            this.cartItemsUserOrder = response.data
            this.populateCartTable()
          } else {
            console.error('Lỗi khi gọi API: Không nhận được dữ liệu JSON')
          }
        })
        .catch((error) => {
          console.error('Lỗi khi gọi API:', error)
        })
    },
    deleteItem(index) {
      const deleteItem = {
        id: this.cartItems[index].id,
      }
      const token = localStorage.getItem('token')
      setBearerToken(token)
      axiosInstance
        .post('/api/delete-inventory', deleteItem)
        .then((response) => {
          window.location.reload()
        })
        .catch((error) => {
          this.visibleToastFail = true
          if (!this.isEnglish) {
            this.messageFail = 'Thất bại'
          } else {
            this.messageFail = 'Failure'
          }
          setTimeout(() => {
            this.visibleToastFail = false
          }, 3000)
        })
    },
    openModalEdit(customerId, quantity, size) {
      this.$emit('hidemodaledit', customerId, quantity, size)
    },
    openModalDetail(index) {
      const id = index
      this.hideModalDetail = true
      const token = localStorage.getItem('token')
      setBearerToken(token)
      axiosInstance
        .get('/api/get-order/' + id)
        .then((response) => {
          if (response.data) {
            this.costumeIdDetail = response.data[0].costumeId.toString()
            this.quantityDetail = response.data[0].quantity.toString()
            this.priceDetail = response.data[0].price.toString()
            this.sizeDetail = response.data[0].size
            this.nameDetail = response.data[0].name
            this.phoneNumberDetail = response.data[0].phoneNumber
            this.addressDetail = response.data[0].address
          } else {
            console.error('Lỗi khi gọi API: Không nhận được dữ liệu JSON')
          }
        })
        .catch((error) => {
          console.error('Lỗi khi gọi API:', error)
        })
    },
    cancelOrder(index) {
      const id = index
      const token = localStorage.getItem('token')
      setBearerToken(token)
      axiosInstance
        .post('/api/cancel-order/' + id)
        .then((response) => {
          window.location.reload()
        })
        .catch((error) => {
          this.visibleToastFail = true
          if (!this.isEnglish) {
            this.messageFail = 'Thất bại'
          } else {
            this.messageFail = 'Failure'
          }
          setTimeout(() => {
            this.visibleToastFail = false
          }, 3000)
        })
    },
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Maitree:wght@200;300;400;500;600;700&display=swap');

.table {
  width: 100%;
}

table {
  width: 80%;
  padding: 0;
  border-collapse: collapse;
  margin: 50px auto;
  transform: translateX(150px);
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

.icon-edit {
  margin-top: 10px;
  cursor: pointer;
  margin-right: 5px;
}
</style>
