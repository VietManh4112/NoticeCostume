<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import chut1 from '@/assets/img/chut1.png'
import chut2 from '@/assets/img/chut2.png'
export default {

    data() {
        return {
            items: {left: chut1,right: chut2},
            index: 30,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>