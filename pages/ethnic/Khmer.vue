<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import khmer1 from '@/assets/img/khmer1.png'
import khmer2 from '@/assets/img/khmer2.png'
export default {

    data() {
        return {
            items: {left: khmer1,right: khmer2},
            index: 13,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>