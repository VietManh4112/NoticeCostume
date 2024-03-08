<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import pathen1 from '@/assets/img/pathen1.png'
import pathen2 from '@/assets/img/pathen2.png'
export default {

    data() {
        return {
            items: {left: pathen1,right: pathen2},
            index: 22,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>