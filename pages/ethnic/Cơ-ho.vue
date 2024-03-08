<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import coho1 from '@/assets/img/coho1.png'
import coho2 from '@/assets/img/coho2.png'
export default {

    data() {
        return {
            items: {left: coho1,right: coho2},
            index: 39,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>