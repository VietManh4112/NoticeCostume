<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import mnong1 from '@/assets/img/mnong1.png'
import mnong2 from '@/assets/img/mnong2.png'
export default {

    data() {
        return {
            items: {left: mnong1,right: mnong2},
            index: 43,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>