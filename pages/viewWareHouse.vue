<template>
  <div>
    <div class="button__add">
      <Button type="nav" @click="addInvetery" class="btn-add">
        <span v-if="!isEnglish">Thêm</span>
        <span v-else>Add</span>
      </Button>
    </div>
    <Table :type="adminCheckProduct" class="tbl" @hidemodaledit="openModalEdit">
    </Table>
    <Modal v-if="hideModalAdd" type="modal-add"></Modal>
    <Modal v-if="hideModalEdit" :quantityEdit="quantityEdit" :costumeIdEdit="costumeIdEdit" :sizeEdit="sizeEdit"
      type="modal-edit"></Modal>
  </div>
</template>
<script>
import Table from '@/components/Table.vue'
import Button from '@/components/Button.vue'

export default {
  components: {
    Table,
    Button,
  },

  computed: {
    isEnglish() {
      return this.$store.state.isEnglish;
    },
  },

  mounted() {
    const jwt = require('jsonwebtoken')
    const token = localStorage.getItem('token')
    if (token) {
      this.authority = jwt.decode(
        localStorage.getItem('token')
      ).role[0].authority
    }
    if (this.authority !== 'admin') {
      this.$router.push('/error')
    }
  },

  data() {
    return {
      //  adminCheckOrder: 'adminCheckOrder',

      // userCheckCart: 'userCheckCart',
      hideModalAdd: false,
      adminCheckProduct: 'adminCheckProduct',
      hideModalEdit: false,
      quantityEdit: 1,
      costumeIdEdit: 1,
      sizeEdit: '',
      authority: null,
    }
  },
  methods: {
    addInvetery() {
      this.hideModalAdd = true
    },
    openModalEdit(costumeId, quantity, size) {
      this.hideModalEdit = true
      this.quantityEdit = quantity
      this.costumeIdEdit = costumeId
      this.sizeEdit = size

    },
  },
}
</script>
<style>
.btn-add {
  border-radius: 5px;
  position: absolute;
  top: 50px;
  right: 300px;
}
</style>
