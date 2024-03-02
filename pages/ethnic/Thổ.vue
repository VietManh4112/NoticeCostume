<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import tho1 from '@/assets/img/tho1.png'
import tho2 from '@/assets/img/tho2.png'
export default {

    data() {
        return {
            items: {left: tho1,right: tho2},
            index: 6,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>