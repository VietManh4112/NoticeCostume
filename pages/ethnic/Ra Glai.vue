<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import raglai1 from '@/assets/img/raglai1.png'
import raglai2 from '@/assets/img/raglai2.png'
export default {

    data() {
        return {
            items: {left: raglai1,right: raglai2},
            index: 36,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>