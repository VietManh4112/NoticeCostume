<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import co1 from '@/assets/img/co1.png'
import co2 from '@/assets/img/co2.png'
export default {

    data() {
        return {
            items: {left: co1,right: co2},
            index: 35,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>