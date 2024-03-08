<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import hre1 from '@/assets/img/hre1.png'
import hre2 from '@/assets/img/hre2.png'
export default {

    data() {
        return {
            items: {left: hre1,right: hre2},
            index: 48,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>