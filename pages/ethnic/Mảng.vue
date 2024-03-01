<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import mang1 from '@/assets/img/mang1.png'
import mang2 from '@/assets/img/mang2.png'
export default {

    data() {
        return {
            items: {left: mang1,right: mang2},
            index: 8,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>