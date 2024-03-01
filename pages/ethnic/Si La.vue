<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import cong1 from '@/assets/img/cong1.png'
import cong2 from '@/assets/img/cong2.png'
export default {

    data() {
        return {
            items: {left: cong1,right: cong2},
            index: 9,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>