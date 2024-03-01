<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import giarai1 from '@/assets/img/giarai1.png'
import giarai2 from '@/assets/img/giarai2.png'
export default {

    data() {
        return {
            items: {left: giarai1,right: giarai2},
            index: 41,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>