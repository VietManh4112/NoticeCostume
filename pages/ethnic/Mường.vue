<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import muong1 from '@/assets/img/muong1.png'
import muong2 from '@/assets/img/muong2.png'
export default {

    data() {
        return {
            items: {left: muong1,right: muong2},
            index: 15,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>