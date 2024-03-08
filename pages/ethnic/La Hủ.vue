<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import lahu1 from '@/assets/img/lahu1.png'
import lahu2 from '@/assets/img/lahu2.png'
export default {

    data() {
        return {
            items: {left: lahu1,right: lahu2},
            index: 5,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>