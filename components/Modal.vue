<template>
    <div>
        <div class="modal">
            <div v-if="type === 'modal-buy'" class="modal-content__buy" ref="modalBuy">
                <div class="flex">
                    <p v-if="!isEnglish">Tên người nhận:</p>
                    <p v-else>Recipient's name:</p>
                    <TextField type="form-text"></TextField>
                </div>
                <div class="flex">
                    <p v-if="!isEnglish">Số điện thoại:</p>
                    <p v-else>Phone:</p>
                    <TextField type="form-number"></TextField>
                </div>
                <div class="flex">
                    <p v-if="!isEnglish">Địa chỉ:</p>
                    <p v-else>Address:</p>
                    <TextField type="form-text"></TextField>
                </div>
                <div class="flex">
                    <p v-if="!isEnglish">Kích cỡ:</p>
                    <p v-else>Size:</p>
                    <span v-for="(size, index) in sizes" :key="index" style="margin-right: 20px;">
                        <Button type="normal" :class="{ active: selectedSize === size }" @click="selectSize(size)">{{
                size }}</Button>
                    </span>
                </div>
                <div class="flex">
                    <p v-if="!isEnglish">Số lượng:</p>
                    <p v-else>Amount:</p>
                    <div style="margin: 24px 0;">
                        <Button type="normal" @click="subtraction" style="margin-right: -4.7px;">-</Button>
                        <input type="text" class="modal-input" v-model="amount">
                        <Button type="normal" @click="addition" style="margin-left: -5px;">+</Button>
                    </div>
                </div>
                <Button type="nav" @click="buyCostume">
                    <span v-if="!isEnglish">Đặt mua</span>
                    <span v-else>Order</span>
                </Button>
            </div>

            <div v-else-if="type === 'modal-continue'" class="modal-content__continue" ref="modalContinue">
                <div class="flex" style="justify-content: center;">
                    <p v-if="!isEnglish">Bạn cần đăng nhập để tiếp tục!</p>
                    <p v-if="isEnglish">You need to log in to continue!</p>
                </div>
                <div class="flex" style="justify-content: center;">
                    <Button type="register" @click="register">{{ registerBtn }}</Button>
                    <Button type="login" @click="login">{{ loginBtn }}</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TextField from '@/components/TextField.vue';
import Button from '@/components/Button.vue'
import Resource from '@/helper/resource.js'
export default {
    name: "Modal",

    components: {
        TextField,
        Button,
    },

    props: {
        type: String,
        hideModalBuy: Boolean,
        hideModalContinue: Boolean,
    },

    mounted() {
        if (!this.bodyClickListenerSet) {
            setTimeout(() => {
                document.body.addEventListener('click', this.handleBodyClick);
                this.bodyClickListenerSet = true;
            }, 500);
        }
    },

    destroyed() {
        document.body.removeEventListener('click', this.handleBodyClick);
    },

    computed: {
        isEnglish() {
            return this.$store.state.isEnglish;
        },

        loginBtn() {
            if (this.isEnglish) {
                return Resource.loginBtn.en;
            } else {
                return Resource.loginBtn.vi;
            }
        },

        registerBtn() {
            if (this.isEnglish) {
                return Resource.registerBtn.en;
            } else {
                return Resource.registerBtn.vi;
            }
        },
    },

    data() {
        return {
            sizes: ['M', 'L', 'XL', 'XXL'],
            selectedSize: null,
            amount: 1,
            bodyClickListenerSet: false
        }
    },

    methods: {
        selectSize(size) {
            this.selectedSize = size;
        },

        buyCostume() {
            this.$emit('hide-modal__buy', false);
        },

        subtraction() {
            if (this.amount > 1) {
                this.amount--;
            }
        },

        addition() {
            this.amount++;
        },

        login() {
            this.$router.push(`/login`);
        },

        register() {
            this.$router.push(`/register`);
        },

        handleBodyClick(event) {
            if (this.hideModalContinue) {
                const modal = this.$refs.modalContinue;
                if (!modal.contains(event.target)) {
                    this.$emit('hide-modal__continue', false)
                }
            }

            if (this.hideModalBuy) {
                const modal = this.$refs.modalBuy;
                if (!modal.contains(event.target)) {
                    this.$emit('hide-modal__buy', false)
                }
            }
        }
    },
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

.modal-content__buy,
.modal-content__continue {
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
}

.modal p {
    margin-bottom: 24px;
}

.modal a,
.modal p {
    width: 250px;
}

.active {
    color: red;
    border: 1px solid red;
}
</style>