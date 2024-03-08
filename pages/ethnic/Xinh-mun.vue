<template>
    <CostumeInfomation :imgleft="items.left" :imgright="items.right" :index="index"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import xinhmun1 from '@/assets/img/xinhmun1.png'
import xinhmun2 from '@/assets/img/xinhmun2.png'
export default {

    data() {
        return {
            items: {left: xinhmun1,right: xinhmun2},
            index: 10,
        }
    },

    components: {
        CostumeInfomation
    },
}
</script>