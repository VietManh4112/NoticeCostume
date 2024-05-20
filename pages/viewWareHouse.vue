<template>
  <div>
    <Toast type="toastFail" :messageFail="messageFail" v-if="visibleToastFail"></Toast>
    <div class="button__add">
      <Button type="nav" @click="addInvetery" class="btn-add">
        <span v-if="!isEnglish">Thêm</span>
        <span v-else>Add</span>
      </Button>
    </div>
    <Table :type="adminCheckProduct" class="tbl" @hidemodaledit="openModalEdit">
    </Table>
    <Modal v-if="hideModalAdd" type="modal-add" @toastStatus="toastStatus"></Modal>
    <Modal v-if="hideModalEdit" :quantityEdit="quantityEdit" :costumeIdEdit="costumeIdEdit" :sizeEdit="sizeEdit"
      type="modal-edit" @toastStatus="toastStatus"></Modal>
  </div>
</template>
<script>
import Table from '@/components/Table.vue'
import Button from '@/components/Button.vue'
import Toast from '@/components/Toast.vue'
export default {
  components: {
    Table,
    Button,
    Toast,
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
      messageFail: '',
      visibleToastFail: false,
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

    toastStatus(visibleToast, message) {
      this.visibleToastFail = visibleToast
      this.messageFail = message
      setTimeout(() => {
        this.visibleToastFail = false
      }, 3000)
    }
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Maitree:wght@200;300;400;500;600;700&display=swap');

.btn-add {
  border-radius: 5px;
  position: absolute;
  top: 50px;
  right: 300px;
}
</style>
