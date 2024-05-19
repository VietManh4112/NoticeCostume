<template>
    <div v-if="type === 'textfield'" class="textfield"
        :style="{ 'border-radius': value.length > 0 ? '30px 30px 0px 0px' : '' }">
        <img src="@/assets/img/search.png" width="15" height="15" class="textfield__img">
        <input type="text" :value="value" @input="$emit('input', $event.target.value)" :placeholder="search"
            class="textfield__search">
        <button v-if="value.length > 0" title="xóa" @click="deleteInputSearch">
            <svg width="8" height="9" viewBox="0 0 8 9" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8 1.057 7.293.35 4 3.643.707.35 0 1.057 3.293 4.35 0 7.643l.707.707L4 5.057 7.293 8.35 8 7.643 4.707 4.35 8 1.057Z"
                    fill="currentcolor"></path>
            </svg>
        </button>
    </div>

    <div v-else-if="type === 'form-text'">
        <input type="text" :placeholder="placeholder" @input="$emit('input', $event.target.value)"
            class="textfield__form" >
    </div>

    <div v-else-if="type === 'form-number'">
        <input type="number" :placeholder="placeholder" class="textfield__form">
    </div>

    <div v-else-if="type === 'form-pass'">
        <input type="password" :placeholder="placeholder" @input="$emit('input', $event.target.value)"
            class="textfield__form">
    </div>

</template>
<script>
export default {
    name: "TextField",

    props: {
        type: String,
        placeholder: String,
        value: String,
    },

    computed: {
        isEnglish() {
            return this.$store.state.isEnglish;
        },
    },

    mounted() {
        if (this.isEnglish) {
            this.search = "Search";
        } else {
            this.search = "Tìm kiếm";
        }
    },

    watch: {
        isEnglish(newValue) {
            if (this.isEnglish) {
                this.search = "Search";
            } else {
                this.search = "Tìm kiếm";
            }
        }
    },

    methods: {
        deleteInputSearch() {
            this.$emit('input', "");
        }
    },

    data() {
        return {
            search: '',
        }
    }
}
</script>

<style>
.textfield {
    display: flex;
    align-items: center;
    width: 380px;
    height: 50px;
    border-radius: 30px;
    background-color: white;
}

.textfield:hover,
.textfield:focus-within {
    background-color: rgb(255, 228, 236);
}

.textfield__img {
    filter: brightness(50%);
    opacity: 0.3;
    margin-left: 1vw;
    margin-right: 1vw;
}

.textfield__search {
    width: 20vw;
    height: 20px;
    outline: none;
    font-size: 16px;
}

.textfield__form {
    width: 380px;
    height: 45px;
    padding: 5px 15px;
    border: 1px solid rgba(119, 118, 117, 30%);
    border-radius: 4px;
    margin-bottom: 24px;
}
</style>