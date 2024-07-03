<template>
   <div>
      <Table :type="adminCheckOrder" class="tbl"> </Table>
    </div>
</template>
<script>
import Table from '@/components/Table.vue'
import axiosInstance, { setBearerToken } from '@/helper/api.js'

export default {
  components: {
    Table,
  },

  data() {
    return {
        adminCheckOrder: 'adminCheckOrder',

      // userCheckCart: 'userCheckCart',

      // adminCheckProduct: 'adminCheckProduct',
    }
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Maitree:wght@200;300;400;500;600;700&display=swap');
</style>