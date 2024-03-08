<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import phula1 from '@/assets/img/phula1.png'
import phula2 from '@/assets/img/phula2.png'
export default {

    data() {
        return {
            items: {left: phula1,right: phula2},
            index: 15,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>