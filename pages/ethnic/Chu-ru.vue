<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import churu1 from '@/assets/img/churu1.png'
import churu2 from '@/assets/img/churu2.png'
export default {

    data() {
        return {
            items: {left: churu1,right: churu2},
            index: 38,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>