<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import khang1 from '@/assets/img/khang1.png'
import khang2 from '@/assets/img/khang2.png'
export default {

    data() {
        return {
            items: {left: khang1,right: khang2},
            index: 2,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>