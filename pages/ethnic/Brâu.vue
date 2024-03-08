<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import brau1 from '@/assets/img/brau1.png'
import brau2 from '@/assets/img/brau2.png'
export default {
    data() {
        return {
            items: {left: brau1,right: brau2},
            index: 37,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>