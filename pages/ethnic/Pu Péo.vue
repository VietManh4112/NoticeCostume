<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import pupeo1 from '@/assets/img/pupeo1.png'
import pupeo2 from '@/assets/img/pupeo2.png'
export default {

    data() {
        return {
            items: {left: pupeo1,right: pupeo2},
            index: 23,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>