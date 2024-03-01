<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import colao1 from '@/assets/img/colao1.png'
import colao2 from '@/assets/img/colao2.png'
export default {

    data() {
        return {
            items: {left: colao1,right: colao2},
            index: 17,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>