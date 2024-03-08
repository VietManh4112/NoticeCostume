<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import bru1 from '@/assets/img/bru1.png'
import bru2 from '@/assets/img/bru2.png'
export default {
    data() {
        return {
            items: {left: bru1,right: bru2},
            index: 29,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>