<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import giay1 from '@/assets/img/giay1.png'
import giay2 from '@/assets/img/giay2.png'
export default {

    data() {
        return {
            items: {left: giay1,right: giay2},
            index: 13,
            
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>