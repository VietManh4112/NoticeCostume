<template>
  <div>
    <Table :type="userCheckCart" class="tbl"> </Table>

  </div>
</template>
<script>
import Table from '@/components/Table.vue'
import Toast from '@/components/Toast.vue'
import axiosInstance, { setBearerToken } from '@/helper/api.js'

export default {
  components: {
    Table,
    Toast,
  },

  data() {
    return {
      // adminCheckOrder: 'adminCheckOrder',

      userCheckCart: 'userCheckCart',
      // toastSuccess: 'toastSuccess',
      // toastFail: 'toastFail',

      // adminCheckProduct: 'adminCheckProduct',
    }
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Maitree:wght@200;300;400;500;600;700&display=swap');
</style>
