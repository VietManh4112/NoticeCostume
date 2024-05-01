<template>
  <div>
    <div class="leftbar" style="display: none">
      <div class="leftbar__title">
        <h1>Nhà kho tổng hợp</h1>
      </div>
      <div style="display: none">
        <p>
          Nếu bạn cần tiếp cận các thông tin của dự án một cách nhanh chóng mà
          không cần quan tâm đến hình thức trình bày, thì đây là chỗ dành cho
          bạn.
        </p>
      </div>
    </div>
    <div>
      <Table :type="userCheckCart" class="tbl"> </Table>
    </div>
    <div class="rightbar" style="display: none"></div>
  </div>
</template>
<script>
import Table from '@/components/Table.vue'
export default {
  components: {
    Table,
  },

  data() {
    return {
      //   adminCheckOrder: 'adminCheckOrder',

      userCheckCart: 'userCheckCart',

      // adminCheckProduct: 'adminCheckProduct',
    }
  },
}
</script>
<style>
.leftbar {
  width: 30vw;
}

.leftbar__title {
  padding-top: 83px;
  padding-left: 109px;
  padding-bottom: 30px;
  font-size: 36px;
  color: rgb(99, 99, 99);
  line-height: normal;
}
.tbl {
  margin-left: 10%;
}
</style>
