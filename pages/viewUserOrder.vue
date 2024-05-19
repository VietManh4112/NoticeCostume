<template>
   <div>
      <Table :type="userCheckCart" class="tbl" > </Table>
      
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
        // adminCheckOrder: 'adminCheckOrder',

      userCheckCart: 'userCheckCart',
     

      // adminCheckProduct: 'adminCheckProduct',
    }
  },
  
}
</script>