<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import cotu1 from '@/assets/img/cotu1.png'
import cotu2 from '@/assets/img/cotu2.png'
export default {

    data() {
        return {
            items: {left: cotu1,right: cotu2},
            index: 31,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>