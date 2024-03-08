<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import xodang1 from '@/assets/img/xodang1.png'
import xodang2 from '@/assets/img/xodang2.png'
export default {

    data() {
        return {
            items: {left: xodang1,right: xodang2},
            index: 45,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>