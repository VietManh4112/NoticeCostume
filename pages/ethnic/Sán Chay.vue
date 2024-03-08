<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import sanchay1 from '@/assets/img/sanchay1.png'
import sanchay2 from '@/assets/img/sanchay2.png'
export default {

    data() {
        return {
            items: {left: sanchay1,right: sanchay2},
            index: 24,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>