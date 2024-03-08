<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import lachi1 from '@/assets/img/lachi1.png'
import lachi2 from '@/assets/img/lachi2.png'
export default {

    data() {
        return {
            items: {left: lachi1,right: lachi2},
            index: 18,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>