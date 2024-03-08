<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import cham1 from '@/assets/img/cham1.png'
import cham2 from '@/assets/img/cham2.png'
export default {

    data() {
        return {
            items: {left: cham1,right: cham2},
            index: 53,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>