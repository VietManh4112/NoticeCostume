<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import lu1 from '@/assets/img/lu1.png'
import lu2 from '@/assets/img/lu2.png'
export default {

    data() {
        return {
            items: {left: lu1,right: lu2},
            index: 7,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>