<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import xtieng1 from '@/assets/img/xtieng1.png'
import xtieng2 from '@/assets/img/xtieng2.png'
export default {

    data() {
        return {
            items: {left: xtieng1,right: xtieng2},
            index: 50,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>