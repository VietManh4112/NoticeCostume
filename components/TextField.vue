<template>
    <div v-if="type === 'textfield'" class="textfield">
        <img src="@/assets/img/search.png" width="15" height="15" class="textfield__img">
        <input type="text" placeholder="Tìm kiếm" class="textfield__search">
    </div>

    <div v-else-if="type === 'form-tk'">
        <input type="text" :placeholder="placeholder" class="textfield__form">
    </div>

    <div v-else-if="type === 'form-pass'">
        <input type="password" :placeholder="placeholder" class="textfield__form">
    </div>

</template>
<script>
export default {
    name: "TextField",

    props: {
        type: String,
        placeholder: String,
    }
}
</script>

<style>
.textfield {
    display: flex;
    align-items: center;
    width: 25vw;
    height: 7vh;
    border-radius: 30px;
    margin-bottom: 8vh;
    background-color: white;
}

.textfield:hover,.textfield:focus-within {
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
    height: 50px;
    padding: 5px 15px;
    border: 1px solid rgba(119, 118, 117, 30%);
    border-radius: 4px;
    margin-bottom: 24px;
}

</style>