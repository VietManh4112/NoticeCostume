<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import viet1 from '@/assets/img/viet1.png'
import viet2 from '@/assets/img/viet2.png'
export default {

    data() {
        return {
            items: {left: viet1,right: viet2},
            index: 28,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>