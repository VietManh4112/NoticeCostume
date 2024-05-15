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
          if (item.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(this.$route.params.id.toLowerCase()) && this.$route.params.id.toLowerCase() !== "lao" && this.$route.params.id.toLowerCase() !== "ma") {
            this.count = Number(item.id);
          } else if(this.$route.params.id.toLowerCase() === "lao") {
            this.count = 7;
          } else if(this.$route.params.id.toLowerCase() === "ma") {
            this.count = 43;
          } else if(this.$route.params.id.toLowerCase() === "co") {
            this.count = 36;
          }
        })
      }
      ).catch(error => {
        console.error(error);
      });
  }
}
</script>