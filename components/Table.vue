<template>
  <div class="table">
    <table cellspacing="0" v-show="type === 'userCheckCart'" id="userCheckCart">
      <thead>
        <th style="width: 5%">STT</th>
        <th style="width: 20%">Mã sản phẩm</th>
        <th style="width: 15%">Số lượng</th>
        <th style="width: 20%">Giá</th>
        <th style="width: 15%">Kích thước</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartItems" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.costumeId }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.size }}</td>
        </tr>
      </tbody>
    </table>
    <table cellspacing="0" v-show="type === 'adminCheckOrder'">
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
          <td>{{ item.costumeId }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.size }}</td>
          <td>
            <span
              style="cursor: pointer; text-decoration: underline; color: red"
              >Xóa</span
            >
          </td>
        </tr>
      </tbody>
    </table>
    <table
      cellspacing="0"
      v-show="type === 'adminCheckProduct'"
      style="margin-top: 150px"
    >
      <thead>
        <th style="width: 5%">STT</th>
        <th style="width: 20%">Mã sản phẩm</th>
        <!-- <th style="width: 20%">Giá</th> -->
        <th style="width: 15%">Số lượng</th>
        <th style="width: 15%">Kích thước</th>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              class="icon-edit"
              @click="openModalEdit(item.costumeId,item.quantity,item.size)"
            >
              <path
                fill="currentColor"
                d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z"
                class
              ></path>
            </svg>
            <span
              @click="deleteItem(index)"
              style="cursor: pointer; text-decoration: underline; color: red"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z"
                  class
                ></path>
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z"
                  clip-rule="evenodd"
                  class
                ></path></svg
            ></span>
          </td>
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
      hideModalEddit: false,
    }
  },
  mounted() {
    this.fetchCartItems()
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
            console.log('Data')
            console.log(response.data)
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
    deleteItem(index) {
      console.log(this.cartItems)
      console.log(this.cartItems[index].id)

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
          console.error('Error deleting data:', error)
        })
    },
    openModalEdit(customerId,quantity,size) {
      this.$emit('hidemodaledit',customerId, quantity,size)
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
