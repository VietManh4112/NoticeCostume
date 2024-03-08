<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import dao1 from '@/assets/img/dao1.png'
import dao2 from '@/assets/img/dao2.png'
export default {

    data() {
        return {
            items: {left: dao1,right: dao2},
            index: 12,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>