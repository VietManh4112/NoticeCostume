<template>
  <div>
    <div class="modal">
      <div v-if="type === 'modal-buy'" class="modal-content__buy" ref="modalBuy">
        <ValidationObserver ref="observer">
          <ValidationProvider v-slot="{ errors }" name="Name" rules="required">
            <div class="flex">
              <p v-if="!isEnglish">Tên người nhận:</p>
              <p v-else>Recipient's name:</p>
              <TextField type="form-text" v-model="name"></TextField>
              <span v-if="errors.length" class="validateInput">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" name="Phone" rules="required">
            <div class="flex">
              <p v-if="!isEnglish">Số điện thoại:</p>
              <p v-else>Phone:</p>
              <TextField type="form-number" v-model="phone"></TextField>
              <span v-if="errors.length" class="validateInput">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" name="Address" rules="required">
            <div class="flex">
              <p v-if="!isEnglish">Địa chỉ:</p>
              <p v-else>Address:</p>
              <TextField type="form-text" v-model="adress"></TextField>
              <span v-if="errors.length" class="validateInput">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </ValidationObserver>

        <div class="flex">
          <p v-if="!isEnglish">Giá tiền:</p>
          <p v-else>Price:</p>
          <p>{{ priceCostume.toLocaleString('en-US') }} {{ currencyCostume }}</p>
        </div>
        <div class="flex">
          <p v-if="!isEnglish">Kích cỡ:</p>
          <p v-else>Size:</p>
          <span v-for="(size, index) in sizes" :key="index" style="margin-right: 20px">
            <Button type="normal" :class="{ active: selectedSize === size }" @click="selectSize(size)">{{ size
              }}</Button>
          </span>
        </div>
        <div class="flex">
          <p v-if="!isEnglish">Số lượng:</p>
          <p v-else>Amount:</p>
          <div style="margin: 24px 0">
            <Button type="normal" @click="subtraction" style="margin-right: -4.7px">-</Button>
            <input type="text" class="modal-input" v-model="amount" />
            <Button type="normal" @click="addition" style="margin-left: -5px">+</Button>
          </div>
        </div>
        <Button type="nav" @click="buyCostume">
          <span v-if="!isEnglish">Đặt mua</span>
          <span v-else>Order</span>
        </Button>
      </div>

      <div v-if="type === 'modal-detail'" class="modal-content__buy">
        <div class="flex">
          <p v-if="!isEnglish">Mã sản phẩm:</p>
          <p v-else>Product code:</p>
          <input type="text" class="modal-input input-detail" v-model="costumeIdDetail" />
        </div>
        <div class="flex">
          <p v-if="!isEnglish">Số lượng:</p>
          <p v-else>Amount:</p>
          <input type="text" class="modal-input input-detail" v-model="quantityDetail" />
        </div>
        <div class="flex">
          <p v-if="!isEnglish">Giá:</p>
          <p v-else>Price:</p>

          <input type="text" class="modal-input input-detail" v-model="priceDetail" />
        </div>
        <div class="flex">
          <p v-if="!isEnglish">Kích thước:</p>
          <p v-else>Size:</p>

          <input type="text" class="modal-input input-detail" v-model="sizeDetail" />
        </div>
        <div class="flex">
          <p v-if="!isEnglish">Tên khách hàng:</p>
          <p v-else>Recipient's name:</p>

          <input type="text" class="modal-input input-detail" v-model="nameDetail" />
        </div>
        <div class="flex">
          <p v-if="!isEnglish">Số điện thoại:</p>
          <p v-else>Phone:</p>
          <input type="text" class="modal-input input-detail" v-model="phoneNumberDetail" />
        </div>
        <div class="flex">
          <p v-if="!isEnglish">Địa chỉ</p>
          <p v-else>Address:</p>
          <input type="text" class="modal-input input-detail" v-model="addressDetail" style="margin-bottom: 10px" />
        </div>
        <Button type="nav" @click="closeModalDetail" style="margin: 20px 0">
          <span v-if="!isEnglish">Đóng</span>
          <span v-else>Close</span>
        </Button>
      </div>

      <div v-if="type === 'modal-add'" class="modal-content__buy">
        <ValidationObserver ref="observerAdd">
          <ValidationProvider v-slot="{ errors }" name="Product's name" rules="required">
            <div class="flex">
              <p v-if="!isEnglish">Mã sản phẩm</p>
              <p v-else>Product's name:</p>
              <TextField type="form-text" v-model="productId"></TextField>
              <span v-if="errors.length" class="validateInput">{{ errors[0] }}</span>
            </div>

          </ValidationProvider>
        </ValidationObserver>
        <div class="flex">
          <p v-if="!isEnglish">Kích cỡ:</p>
          <p v-else>Size:</p>
          <span v-for="(size, index) in sizes" :key="index" style="margin-right: 20px">
            <Button type="normal" :class="{ active: selectedSize === size }" @click="selectSize(size)">{{ size
              }}</Button>
          </span>
        </div>
        <div class="flex">
          <p v-if="!isEnglish">Số lượng:</p>
          <p v-else>Amount:</p>
          <div style="margin: 24px 0">
            <Button type="normal" @click="subtraction" style="margin-right: -4.7px">-</Button>
            <input type="text" class="modal-input" v-model="amount" />
            <Button type="normal" @click="addition" style="margin-left: -5px">+</Button>
          </div>
        </div>
        <Button type="nav" @click="addInvetery">
          <span v-if="!isEnglish">Xác nhận</span>
          <span v-else>Ok</span>
        </Button>
      </div>

      <div v-if="type === 'modal-edit'" class="modal-content__buy">
        <!-- <div class="flex">
            <p v-if="!isEnglish">Mã sản phẩm</p>
            <p v-else>Product's name:</p>
            <TextField type="form-text" v-model="productId"></TextField>
          </div>
  
          <div class="flex">
            <p v-if="!isEnglish">Kích cỡ:</p>
            <p v-else>Size:</p>
            <span
              v-for="(size, index) in sizes"
              :key="index"
              style="margin-right: 20px"
            >
              <Button
                type="normal"
                :class="{ active: selectedSize === size }"
                @click="selectSize(size)"
                >{{ size }}</Button
              >
            </span>
          </div> -->
        <div class="title-edit">Nhập số lượng bạn muốn bớt</div>
        <div class="flex">
          <p v-if="!isEnglish">Số lượng:</p>
          <p v-else>Amount:</p>
          <div style="margin: 24px 0">
            <Button type="normal" @click="subtractionEdit" style="margin-right: -4.7px">-</Button>
            <input type="text" class="modal-input" v-model="quantityEdit" />
            <Button type="normal" @click="additionEdit" style="margin-left: -5px">+</Button>
          </div>
        </div>
        <Button type="nav" @click="editInvetery">
          <span v-if="!isEnglish">Xác nhận</span>
          <span v-else>Ok</span>
        </Button>
      </div>

      <div v-else-if="type === 'modal-continue'" class="modal-content__continue" ref="modalContinue">
        <div class="flex" style="justify-content: center">
          <p v-if="!isEnglish">Bạn cần đăng nhập để tiếp tục!</p>
          <p v-if="isEnglish">You need to log in to continue!</p>
        </div>
        <div class="flex" style="justify-content: center">
          <Button type="register" @click="register">{{ registerBtn }}</Button>
          <Button type="login" @click="login">{{ loginBtn }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance, { setBearerToken } from '@/helper/api.js'
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import TextField from '@/components/TextField.vue'
import Button from '@/components/Button.vue'
import Resource from '@/helper/resource.js'
export default {
  name: 'Modal',

  components: {
    ValidationObserver,
    ValidationProvider,
    TextField,
    Button,
  },

  props: {
    type: String,
    hideModalBuy: Boolean,
    hideModalContinue: Boolean,
    quantityEdit: Number,
    costumeIdEdit: Number,
    sizeEdit: String,
    costumeId: Number,
    costumeIdDetail: String,
    quantityDetail: String,
    priceDetail: String,
    sizeDetail: String,
    nameDetail: String,
    phoneNumberDetail: String,
    addressDetail: String,
    priceCostume: Number,
    currencyCostume: String,
  },

  mounted() {
    if (!this.bodyClickListenerSet) {
      setTimeout(() => {
        document.body.addEventListener('click', this.handleBodyClick)
        this.bodyClickListenerSet = true
      }, 500)
    }
  },

  destroyed() {
    document.body.removeEventListener('click', this.handleBodyClick)
  },

  computed: {
    isEnglish() {
      return this.$store.state.isEnglish
    },

    loginBtn() {
      if (this.isEnglish) {
        return Resource.loginBtn.en
      } else {
        return Resource.loginBtn.vi
      }
    },

    registerBtn() {
      if (this.isEnglish) {
        return Resource.registerBtn.en
      } else {
        return Resource.registerBtn.vi
      }
    },
  },

  data() {
    return {
      sizes: ['M', 'L', 'XL', 'XXL'],
      selectedSize: 'M',
      amount: 1,
      price: 20,
      bodyClickListenerSet: false,
      productId: '',
      phone: '',
      name: '',
      adress: '',
      price: '',
      hideModalDetail: true,
      toastSuccess: 'toastSuccess',
      toastFail: 'toastFail',
      message: '',
      visibleToastSuccess: true,
      visibleToastFail: false,
      statusToast: false,
    }
  },

  methods: {
    selectSize(size) {
      this.selectedSize = size
    },

    buyCostume() {
      if (this.$refs.observer) {
        this.$refs.observer.validate().then(success => {
          if (success) {
            const data = {
              costumeId: this.costumeId,
              size: this.selectedSize,
              quantity: this.amount,
              price: this.price,
              name: this.name,
              phoneNumber: this.phone.toString(),
              address: this.adress,
            }
            const token = localStorage.getItem('token')
            setBearerToken(token)
            axiosInstance.post('/api/create-order', data)
              .then((response) => {
                this.visibleToastSuccess = true
                if (!this.isEnglish) {
                  this.message = 'Bạn đã đặt hàng thành công'
                } else {
                  this.message = 'You have placed your order successfully'
                }
                this.statusToast = true
                this.$emit('hide-modal__buy', false, this.visibleToastSuccess, this.message, this.statusToast)
              })
              .catch((error) => {
                this.visibleToastFail = true
                this.statusToast = false
                if (error.response.status === 500 && error.response.data.message === 'Inventory costume not found.') {
                  if (!this.isEnglish) {
                    this.message = 'Đặt hàng k thành công : Kho đã hết hàng'
                  } else {
                    this.message = 'Order not successful: Warehouse is out of stock'
                  }
                  this.$emit('hide-modal__buy', false, this.visibleToastFail, this.message, this.statusToast)
                } else {
                  if (!this.isEnglish) {
                    this.message = 'Đặt hàng k thành công : Không tìm thấy sản phẩm'
                  } else {
                    this.message = 'Order not successful: Product not found'
                  }
                  this.$emit('hide-modal__buy', false, this.visibleToastFail, this.message, this.statusToast)
                }
              })
          }
        });
      }
    },

    subtraction() {
      if (this.amount > 1) {
        this.amount--
      }
    },

    subtractionEdit() {
      if (this.quantityEdit > 1) {
        this.quantityEdit--
      }
    },

    addition() {
      this.amount++
    },
    additionEdit() {
      this.quantityEdit++
    },

    login() {
      this.$router.push(`/login`)
    },

    register() {
      this.$router.push(`/register`)
    },

    handleBodyClick(event) {
      if (this.hideModalContinue) {
        const modal = this.$refs.modalContinue
        if (!modal.contains(event.target)) {
          this.$emit('hide-modal__continue', false)
        }
      }

      if (this.hideModalBuy) {
        const modal = this.$refs.modalBuy
        if (!modal.contains(event.target)) {
          this.$emit('hide-modal__buy', false)
        }
      }
    },

    addInvetery() {
      if (this.$refs.observerAdd) {
        this.$refs.observerAdd.validate().then(success => {
          if (success) {
            const data = {
              costumeId: this.productId,
              size: this.selectedSize,
              quantity: this.amount,
            }
            const token = localStorage.getItem('token')
            setBearerToken(token)
            axiosInstance.post('/api/add-inventory', data)
              .then((response) => {
                window.location.reload()
              })
              .catch((error) => {
                console.error(error)
              })
          }
        })
      }
    },

    closeModalDetail() {
      window.location.reload()
    },

    editInvetery() {
      const data = {
        costumeId: this.costumeIdEdit,
        size: this.sizeEdit,
        quantity: Number(this.quantityEdit),
      }
      const token = localStorage.getItem('token')
      setBearerToken(token)
      axiosInstance.post('/api/remove-inventory', data)
        .then((response) => {
          window.location.reload()
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 50%);
}

.modal-content__buy,
.modal-content__continue {
  margin: 8% auto;
  padding: 20px;
  width: 50%;
  color: black;
  background-color: #f9f2e0;
  box-shadow: 9px 9px 16px rgba(0, 0, 0, 44%);
  text-align: center;
  border-radius: 20px;
  transform-origin: center center;
  transform: scale(1);
  transition: transform 1s;
  position: relative;
}

.modal-content__continue {
  width: 25%;
  margin: 15% auto;
}

.modal-input {
  width: 55px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 9%);
  text-align: center;
}

.flex {
  display: flex;
  align-items: center;
  position: relative;
}

.modal p {
  margin-bottom: 24px;
}

.modal a,
.modal p {
  width: 250px;
}

.input-detail {
  width: 300px;
}

.active {
  color: red;
  border: 1px solid red;
}

.validateInput {
  color: red;
  position: absolute;
  top: 50px;
  font-size: 12px;
  left: 250px;
}
</style>
