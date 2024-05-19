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
