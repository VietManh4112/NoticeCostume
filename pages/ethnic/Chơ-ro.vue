<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import choro1 from '@/assets/img/choro1.png'
import choro2 from '@/assets/img/choro2.png'
export default {
    data() {
        return {
            items: {left: choro1,right: choro2},
            index: 49,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>