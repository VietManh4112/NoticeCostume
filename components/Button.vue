<template>
    <button type="button" class="btn" :class="[ButtonType[type], {'btn-disabled' : disabled}]" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>
import Enum from '@/helper/enum.js'
export default {
    name: "Button",
    props: {
        type: {
            type: String,
            default: '',
        },
        disabled: {
            typeo: Boolean,
            default: false,
        }
    },
    data() {
        return {
            ButtonType: Enum.ButtonType,
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Maitree:wght@200;300;400;500;600;700&display=swap');
.btn {
    border-radius: 16px;
}

.btn-icon {
    width: 145px;
    height: 45px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    background-color: #EEB188;

}

.btn-icon:hover {
    border-radius: 10px;
    filter: brightness(1.1);
}

.btn-nav {
    width: 150px;
    height: 40px;
    color: #8f880b;
    background-color: #fdddc9;
    border: 1px solid white;
}

.btn-nav:hover {
    color: white;
    border: 1px solid #8b850a;
    background-color: #8b850a;
}

.btn-disabled {
    opacity: 0.5;
    color: white;
    background-color: rgb(162, 162, 162);
    border-radius: none !important;
    pointer-events: none;
    cursor: not-allowed;
}

.btn-login {
    border: none;
    font-weight: 500;
    width: 100px;
}

.btn-register {
    width: 100px;
    height: 36px;
    font-weight: 500;
    color: #fff;
    border-radius: 16px;
    background-color: #EEB188;
}

.btn-register:hover {
    animation: buttonUp 0.2s ease-in-out forwards;
}

@keyframes buttonUp {
    0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10%);
  }
}

.btn-normal {
    padding: 6px 16px;
    border: 1px solid rgba(0,0,0,9%);
    border-radius: 0px;
}

</style>