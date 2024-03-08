<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import nung1 from '@/assets/img/nung1.png'
import nung2 from '@/assets/img/nung2.png'
export default {

    data() {
        return {
            items: {left: nung1,right: nung2},
            index: 21,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>