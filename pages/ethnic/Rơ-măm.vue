<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import romam1 from '@/assets/img/romam1.png'
import romam2 from '@/assets/img/romam2.png'
export default {

    data() {
        return {
            items: {left: romam1,right: romam2},
            index: 44,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>