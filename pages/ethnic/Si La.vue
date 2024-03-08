<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import sila1 from '@/assets/img/sila1.png'
import sila2 from '@/assets/img/sila2.png'
export default {

    data() {
        return {
            items: {left: sila1,right: sila2},
            index: 9,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>