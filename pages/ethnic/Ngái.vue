<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import ngai1 from '@/assets/img/ngai1.png'
import ngai2 from '@/assets/img/ngai2.png'
export default {

    data() {
        return {
            items: {left: ngai1,right: ngai2},
            index: 12,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>