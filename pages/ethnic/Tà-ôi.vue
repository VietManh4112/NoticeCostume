<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import taoi1 from '@/assets/img/taoi1.png'
import taoi2 from '@/assets/img/taoi2.png'
export default {

    data() {
        return {
            items: {left: taoi1,right: taoi2},
            index: 33,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>