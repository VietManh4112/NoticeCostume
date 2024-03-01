<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import boy1 from '@/assets/img/boy1.png'
import boy2 from '@/assets/img/boy2.png'
export default {
    data() {
        return {
            items: {left: boy1,right: boy2},
            index: 11,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>