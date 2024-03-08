<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import laha1 from '@/assets/img/laha1.png'
import laha2 from '@/assets/img/laha2.png'
export default {

    data() {
        return {
            items: {left: laha1,right: laha2},
            index: 4,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>