<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import thai1 from '@/assets/img/thai1.png'
import thai2 from '@/assets/img/thai2.png'
export default {

    data() {
        return {
            items: {left: thai1,right: thai2},
            index: 16,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>