<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import ma1 from '@/assets/img/ma1.png'
import ma2 from '@/assets/img/ma2.png'
export default {

    data() {
        return {
            items: {left: ma1,right: ma2},
            index: 42,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>