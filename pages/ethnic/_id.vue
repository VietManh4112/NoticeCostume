<template>
  <CostumeInfomation :imgleft="require(`@/assets/img/${productId}1.png`)"
    :imgright="require(`@/assets/img/${productId}2.png`)" :count="count"></CostumeInfomation>
</template>

<script>
import CostumeInfomation from '@/components/CostumeInfomation.vue'
import EthnicStore from "@/store/ethnic"
export default {

  data() {
    return {
      ethnics: {
        index: '',
        role: ''
      },
      items: [],
      count: 0,
    }
  },

  components: {
    CostumeInfomation,
  },

  computed: {
    productId() {
      const id = this.$route.params.id.toLowerCase();
      const strippedId = id.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const cleanedId = strippedId.replace(/[-`]/g, "");
      const trimmedId = cleanedId.replace(/\s+/g, "");
      return trimmedId;
    }
  },

  mounted() {
    EthnicStore.get('/api/get-ethnics')
      .then(response => {
        response.data.forEach(item => {
          const newItem = { ...this.ethnic }
          newItem.index = item.id
          newItem.role = item.name
          this.items.push(newItem)
          if (item.name.toLowerCase().includes(this.$route.params.id.toLowerCase())) {
            this.count = Number(item.id);
          }
        })
      }
      ).catch(error => {
        console.error(error);
      });
  }
}
</script>