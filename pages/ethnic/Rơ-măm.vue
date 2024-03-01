<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import tay1 from '@/assets/img/tay1.png'
import tay2 from '@/assets/img/tay2.png'
export default {

    data() {
        return {
            items: {left: tay1,right: tay2},
            index: 44,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>