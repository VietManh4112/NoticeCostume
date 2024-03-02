<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import lolo1 from '@/assets/img/lolo1.png'
import lolo2 from '@/assets/img/lolo2.png'
export default {

    data() {
        return {
            items: {left: lolo1,right: lolo2},
            index: 2,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>