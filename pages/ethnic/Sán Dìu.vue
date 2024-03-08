<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import sandiu1 from '@/assets/img/sandiu1.png'
import sandiu2 from '@/assets/img/sandiu2.png'
export default {

    data() {
        return {
            items: {left: sandiu1,right: sandiu2},
            index: 25,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>