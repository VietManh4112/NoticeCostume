<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import bana1 from '@/assets/img/bana1.png'
import bana2 from '@/assets/img/bana2.png'
export default {
    data() {
        return {
            items: {left: bana1,right: bana2},
            index: 46,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>