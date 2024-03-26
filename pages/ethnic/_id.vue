<template>
    <CostumeInfomation :imgleft="require(`@/assets/img/${productId}1.png`)" :imgright="require(`@/assets/img/${productId}2.png`)" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
export default {

    data() {
        return {
            index: '',
        }
    },

    components: {
        CostumeInfomation,
    },

    computed: {
        productId() {
            const id = this.$route.params.id.toLowerCase();
            const strippedId = id.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const cleanedId = strippedId.replace(/[-`]/g, "");
            const trimmedId = cleanedId.replace(/\s+/g, "");
            return trimmedId;
        }
    },
}
</script>