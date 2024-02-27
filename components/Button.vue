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
.btn-icon {
    width: 145px;
    height: 45px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    background-color: #EEB188;
    border-radius: 16px;
}

.btn-icon:hover {
    border-radius: 10px;
    filter: brightness(1.1);
}

.btn-nav {
    width: 150px;
    height: 40px;
    border-radius: 16px;
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

</style>