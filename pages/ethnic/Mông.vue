<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import mong1 from '@/assets/img/mong1.png'
import mong2 from '@/assets/img/mong2.png'
export default {

    data() {
        return {
            items: {left: mong1,right: mong2},
            index: 14,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>