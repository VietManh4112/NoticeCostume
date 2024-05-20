<template>
    <div class="form">
        <div class="form-img">
            <img src="@/assets/img/img.png" width="540" height="540">
        </div>
        <div class="form-form">
            <h1 v-show="type === 'login'">{{ loginBtn }}</h1>
            <h1 v-show="type === 'register'">{{ registerBtn }}</h1>
            <ValidationObserver ref="observer">
                <form>
                    <ValidationProvider v-slot="{ errors }" name="Name" rules="required">
                        <div style="position: relative;">
                            <TextField type="form-text" :placeholder="Name" v-model="name"></TextField>
                            <span v-if="errors.length" class="validateInput">{{ errors[0] }}</span>
                            <p v-if="errorLogin" class="validateInput">Account or password is incorrect</p>
                            <p v-show="type === 'register'" class="validateInput">{{ errorRegister }}</p>
                        </div>
                    </ValidationProvider>

                    <ValidationProvider v-if="type === 'register'" v-slot="{ errors }" name="Email"
                        rules="required|email">
                        <div style="position: relative;">
                            <TextField type="form-text" :placeholder="Email" v-model="email"></TextField>
                            <span v-if="errors.length" class="validateInput">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>

                    <ValidationProvider v-slot="{ errors }" name="Password" rules="required|min:6">
                        <div style="position: relative;">
                            <TextField type="form-pass" :placeholder="Pass" v-model="pass"></TextField>
                            <span v-if="errors.length" class="validateInput">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>

                    <ValidationProvider v-if="type === 'register'" v-slot="{ errors }" name="Confirm Password" rules="required|min:6">
                        <div style="position: relative;">
                            <TextField type="form-pass" :placeholder="ConfirmPass" v-model="confirmpass"></TextField>
                            <span v-if="errors.length" class="validateInput">{{ errors[0] }}</span>
                            <p v-show="type === 'register'" class="validateInput">{{ validationMessage }}</p>
                        </div>
                    </ValidationProvider>

                    <Button v-show="type === 'login'" type="icon" @click="submitForm('login')">
                        <p>{{ loginBtn }}</p>
                    </Button>

                    <Button v-show="type === 'register'" type="icon" @click="submitForm('register')">
                        <p>{{ registerBtn }}</p>
                    </Button>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import Resource from '@/helper/resource.js'
import TextField from '@/components/TextField.vue';
import Button from '@/components/Button.vue'

export default {
    components: {
        ValidationObserver,
        ValidationProvider,
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

        isEnglish() {
            return this.$store.state.isEnglish;
        },
    },

    data() {
        return {
            Name: 'Username',
            Email: 'Email',
            Pass: 'Password',
            ConfirmPass: 'Confirm Password',
            name: '',
            email: '',
            pass: '',
            confirmpass: '',
            validationEmailVn1: 'Email không hợp lệ',
            validationEmailVn2: '',
            validationEmailEn1: 'Invalid email',
            validationEmailEn2: '',
            validationMessage:'',
            validateName: false,
            validatePass: false,
            errorLogin: false,
            errorRegister: ''
        };
    },

    methods: {
        submitForm(action) {
            if (this.$refs.observer) {
                this.$refs.observer.validate().then(success => {
                    if (success) {
                        if (action === 'login') {
                            this.login();
                        } else if (action === 'register') {
                            this.register();
                        }
                    }
                });
            }
        },

        login() {
            const userData = { username: this.name, password: this.pass };
            this.$store.dispatch('login', userData)
                .then(() => {
                    this.$router.push('/');
                    setTimeout(() => {
                        location.reload();
                    }, 10);
                })
                .catch((error) => {
                    this.errorLogin = true;
                });
        },

        register() {
            var errors = [];
            if (this.confirmpass !== this.pass) {
                this.validationMessage = 'Confirm Password is different!';
                errors.push('lỗi');
            }
            const userData = { username: this.name, email: this.email, password: this.pass };
            if (errors.length == 0) {
                this.$store.dispatch('register', userData)
                    .then(() => {
                        this.$router.push('/login');
                    })
                    .catch((error) => {
                        this.errorRegister = error.response.data.message;
                    });
            }
        }
    }
};
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Maitree:wght@200;300;400;500;600;700&display=swap');
@media (max-width: 1400px) {
    .form-form {
        margin-left: 100px !important;
    }
}

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