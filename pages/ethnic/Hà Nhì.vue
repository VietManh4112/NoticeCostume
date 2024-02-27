<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import hanhi1 from '@/assets/img/hanhi1.png'
import hanhi2 from '@/assets/img/hanhi2.png'
export default {
    name: "Hà Nhì",

    data() {
        return {
            items: {left: hanhi1,right: hanhi2},
            index: 1,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>