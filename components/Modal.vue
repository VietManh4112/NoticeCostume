<template>
    <div>
        <div class="modal">
            <div class="modal-content">
                <div class="flex">
                    <p>Tên người nhận:</p>
                    <TextField type="form-text" :placeholder="name"></TextField>
                </div>
                <div class="flex">
                    <p>Số điện thoại:</p>
                    <TextField type="form-number" :placeholder="sdt"></TextField>
                </div>
                <div class="flex">
                    <p>Địa chỉ:</p>
                    <TextField type="form-text" :placeholder="address"></TextField>
                </div>
                <div class="flex">
                    <a>Kích cỡ:</a>
                    <span v-for="(size, index) in sizes" :key="index" style="margin-right: 20px;">
                        <Button type="normal" :class="{ active: selectedSize === size }" @click="selectSize(size)">{{ size }}</Button>
                    </span>
                </div>
                <div class="flex">
                    <a>Số lượng:</a>
                    <div style="margin: 24px 0;">
                        <Button type="normal" @click="subtraction" style="margin-right: -4.7px;">-</Button>
                        <input type="text" class="modal-input" v-model="amount">
                        <Button type="normal" @click="addition" style="margin-left: -5px;">+</Button>
                    </div>
                </div>
                <Button type="nav" @click="buyCostume">Đặt mua</Button>
            </div>
        </div>
    </div>
</template>

<script>
import TextField from '@/components/TextField.vue';
import Button from '@/components/Button.vue'
    export default {
        name: "Modal",

        components: {
            TextField ,
            Button,
        },

        data() {
            return {
                name: 'Tên người nhận',
                sdt: 'Số điện thoại',
                address: 'Địa chỉ',
                sizes: ['M', 'L', 'XL', 'XXL'],
                selectedSize: null,
                amount: 1,
            }
        },

        methods: {
            selectSize(size) {
                this.selectedSize = size;
            },

            buyCostume() {
                this.$emit('hide-modal', false);
            },

            subtraction() {
                if (this.amount > 1) {
                    this.amount--;
                }
            },

            addition() {
                this.amount++;
            }
        }
    }
</script>

<style>
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

.modal-content {
    margin: 8% auto;
    padding: 20px;
    width: 50%;
    color: black;
    background-color: #F9F2E0;
    box-shadow: 9px 9px 16px rgba(0, 0, 0, 44%);
    text-align: center;
    border-radius: 20px;
    transform-origin: center center;
    transform: scale(1);
    transition: transform 1s;
    position: relative;
}

.modal-input {
    width: 55px;
    height: 40px;
    border: 1px solid rgba(0,0,0,9%);
    text-align: center;
}

.flex {
    display: flex;
    align-items: center;
}

.modal p {
    margin-bottom: 24px;
}

.modal a, .modal p {
    width: 250px;
}

.active {
  color: red;
  border: 1px solid red;
}

</style>