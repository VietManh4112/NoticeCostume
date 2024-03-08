<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import ede1 from '@/assets/img/ede1.png'
import ede2 from '@/assets/img/ede2.png'
export default {

    data() {
        return {
            items: {left: ede1,right: ede2},
            index: 40,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>