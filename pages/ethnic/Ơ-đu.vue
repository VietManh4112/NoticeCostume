<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import odu1 from '@/assets/img/odu1.png'
import odu2 from '@/assets/img/odu2.png'
export default {

    data() {
        return {
            items: {left: odu1,right: odu2},
            index: 32,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>