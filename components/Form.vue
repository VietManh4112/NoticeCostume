<template>
    <div class="form">
        <div class="form-img">
            <img src="@/assets/img/img.png" width="540" height="540">
        </div>
        <div class="form-form">
            <h1 v-show="type === 'login'">{{ loginBtn }}</h1>
            <h1 v-show="type === 'register'">{{ registerBtn }}</h1>
            <form>
                <div>
                    <ul>
                        <li class="google">
                            <img src="https://cfcdn.apowersoft.info/astro/picwish/_astro/google.61020c54.svg" width="20"
                                height="20" style="margin-right: 5px;">
                            {{ google }}
                        </li>
                        <li class="facebook">
                            <img src="https://cfcdn.apowersoft.info/astro/picwish/_astro/facebook.d531e827.svg">
                        </li>
                        <li class="apple">
                            <img src="https://cfcdn.apowersoft.info/astro/picwish/_astro/apple.650e301d.svg">
                        </li>
                    </ul>
                </div>
                <div class="display: absolute;">
                    <div class="border-line"></div>
                    <span class="text-line">Hoặc</span>
                </div>
                <div style="position: relative;">
                    <TextField type="form-text" :placeholder="Name" v-model="name"></TextField>
                    <p v-if="validateName" class="validateInput">{{ errorName }}</p>
                </div>
                <div style="position: relative;">
                    <TextField type="form-pass" :placeholder="Pass" v-model="pass"></TextField>
                    <p v-if="validatePass" class="validateInput">Mật khẩu không được bỏ trống!</p>
                </div>
                <div style="position: relative;">
                    <TextField v-show="type === 'register'" type="form-pass" :placeholder="ConfirmPass"
                        v-model="confirmpass"></TextField>
                    <p v-show="type === 'register'" class="validateInput">{{ validationMessage }}</p>
                </div>
                <div v-if="type === 'login'" style="display: flex;justify-content: flex-end;margin-bottom: 10px;">{{
                fogotpass }}</div>
                <Button v-show="type === 'login'" type="icon" @click="login">
                    <p>{{ loginBtn }}</p>
                </Button>

                <Button v-show="type === 'register'" type="icon">
                    <p>{{ registerBtn }}</p>
                </Button>

            </form>
        </div>
    </div>
</template>
<script>
import axiosInstance, { setBearerToken } from '@/helper/api.js'
import { mapState, mapMutations } from 'vuex';
import Resource from '@/helper/resource.js'
import TextField from '@/components/TextField.vue';
import Button from '@/components/Button.vue'
export default {
    name: "Form",

    components: {
        TextField,
        Button,
    },

    props: {
        type: String,
    },

    computed: {
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

        google() {
            if (this.isEnglish) {
                return Resource.google.en;
            } else {
                return Resource.google.vi;
            }
        },

        fogotpass() {
            if (this.isEnglish) {
                return Resource.fogotpass.en;
            } else {
                return Resource.fogotpass.vi;
            }
        },

        isEnglish() {
            return this.$store.state.isEnglish;
        },
    },

    data() {
        return {
            Name: 'Tên đăng nhập',
            Pass: 'Mật Khẩu',
            ConfirmPass: 'Xác nhận mật khẩu',
            name: '',
            pass: '',
            confirmpass: '',
            validateName: false,
            validatePass: false,
            validationMessage: '',
        };
    },

    methods: {
        login() {
            var error = [];
            if (this.name.trim() === '') {
                this.validateName = true;
                this.errorName = "Tên đăng nhập không được bỏ trống!"
                error.push('lỗi');
            } else {
                this.validateName = false;
            }

            if (this.pass.trim() === '') {
                this.validatePass = true;
                error.push('lỗi');
            } else {
                this.validatePass = false;
            }

            if (this.confirmpass.trim() === '') {
                this.validationMessage = 'Xác nhận mật khẩu không được bỏ trống!';
            } else if (this.confirmpass !== this.pass) {
                this.validationMessage = 'Mật khẩu không giống!';
            } else {
                this.validationMessage = '';
            }
            const userData = { username: this.name, password: this.pass };
            if (error.length == 0) {
                this.$store.dispatch('login', userData)
                    .then(() => {
                        this.$router.push('/');
                    })
                    .catch((error) => {
                        this.validateName = true;
                        this.errorName = 'Tài khoản hoặc mật khẩu không chính xác';
                    });
            }
        },
    },
}
</script>

<style>
.form {
    width: 100vw;
    height: 91vh;
    display: flex;
    align-items: center;
    background-image: radial-gradient(circle at 16.3021% 100%, rgba(229, 112, 34, 70%) 0%, rgba(229, 112, 34, 0%) 35%),
        radial-gradient(circle at 75.4264% 74.1960%, #F6CCB0 0%, rgba(246, 204, 176, 0%) 40%),
        radial-gradient(circle at 14.1699% 17.4837%, #F6CCB0 0%, rgba(246, 204, 176, 0%) 70%),
        radial-gradient(circle at 79.4987% 0%, rgba(229, 112, 34, 72%) 0%, rgba(229, 112, 34, 0%) 70%),
        radial-gradient(circle at 48.9014% 49.5215%, #FFF 0%, rgba(255, 255, 255, 0%) 100%);
}

.form-form {
    width: 450px;
    border-radius: 6px;
    padding: 40px 30px;
    text-align: center;
    margin-left: 200px;
    background-color: #fff;
}

.form-img {
    margin-left: 200px;
}

h1 {
    margin-bottom: 40px;
}

ul {
    display: flex;
    list-style: none;
    justify-content: center;
    align-items: center;
}

li {
    margin-right: 10px;
}

li:hover {
    cursor: pointer;
}

.google {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid rgba(119, 118, 117, 30%);
}

.facebook,
.apple {
    width: 32px;
    height: 32px;
}

.border-line {
    width: 100%;
    border-bottom: 1px solid rgba(153, 153, 153, 50%);
    margin-top: 40px;
    margin-bottom: 25px;
}

.text-line {
    position: relative;
    display: flex;
    justify-content: center;
    width: 60px;
    font-size: 16px;
    top: -39px;
    left: 42%;
    color: rgba(153, 153, 153, 100%);
    background-color: #FFF;
}

.validateInput {
    color: red;
    position: absolute;
    top: 50px;
    font-size: 12px;
    left: 8px;
}
</style>