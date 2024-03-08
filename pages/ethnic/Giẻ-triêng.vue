<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import gietrieng1 from '@/assets/img/gietrieng1.png'
import gietrieng2 from '@/assets/img/gietrieng2.png'
export default {

    data() {
        return {
            items: {left: gietrieng1,right: gietrieng2},
            index: 47,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>