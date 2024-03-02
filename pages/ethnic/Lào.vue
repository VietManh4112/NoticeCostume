<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import lao1 from '@/assets/img/lao1.png'
import lao2 from '@/assets/img/lao2.png'
export default {

    data() {
        return {
            items: {left: lao1,right: lao2},
            index: 34,
            
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>