<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import hoa1 from '@/assets/img/hoa1.png'
import hoa2 from '@/assets/img/hoa2.png'
export default {

    data() {
        return {
            items: {left: hoa1,right: hoa2},
            index: 9,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>