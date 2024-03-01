<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import khomu1 from '@/assets/img/khomu1.png'
import khomu2 from '@/assets/img/khomu2.png'
export default {

    data() {
        return {
            items: {left: khomu1,right: khomu2},
            index: 3,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>